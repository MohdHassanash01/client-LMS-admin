import { useParams } from 'react-router-dom';
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useFirebase } from '@/context/Firebase';

import { useEffect, useState } from 'react';

const AddLectures = () => {
  const { courseId } = useParams();
  const { firestore, storage } = useFirebase();

  // ---------- states ----------
  const [chapters, setChapters] = useState([]);
  const [chapterTitle, setChapterTitle] = useState('');
  const [showLectureForm, setShowLectureForm] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [activeChapterTitle, setActiveChapterTitle] = useState('');

  const [lectTitle, setLectTitle] = useState('');
  const [lectDuration, setLectDuration] = useState('');
  const [lectVideo, setLectVideo] = useState(null);
  const [lectPreview, setLectPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ---------- real-time course ----------
  useEffect(() => {
    if (!courseId) return;
    const unsub = onSnapshot(doc(firestore, 'courses', courseId), (snap) => {
      if (snap.exists()) {
        setChapters(snap.data().courseContent || []);
      }
    });
    return () => unsub();
  }, [firestore, courseId]);

  // ---------- add chapter ----------
  const handleAddChapter = async () => {
    if (!chapterTitle.trim()) {
      alert('Please enter a chapter title');
      return;
    }

    try {
      const courseRef = doc(firestore, 'courses', courseId);
      const snap = await getDoc(courseRef);

      if (!snap.exists()) {
        alert('Course not found');
        return;
      }

      const course = snap.data();
      const newChapter = {
        chapterId: `ch_${Date.now()}`,
        chapterOrder: (course.courseContent?.length || 0) + 1,
        chapterTitle: chapterTitle.trim(),
        chapterContent: [],
      };

      const updatedContent = [...(course.courseContent || []), newChapter];
      await updateDoc(courseRef, { courseContent: updatedContent });
      setChapterTitle('');
    } catch (error) {
      console.error('Error adding chapter:', error);
      alert('Failed to add chapter');
    }
  };

  // ---------- open lecture form ----------
  const openLectureForm = (chapterId, chapterTitle) => {
    setActiveChapterId(chapterId);
    setActiveChapterTitle(chapterTitle);
    setShowLectureForm(true);
    setLectTitle('');
    setLectDuration('');
    setLectVideo(null);
    setLectPreview(false);
    setUploadProgress(0);
  };

  // ---------- submit lecture (+video) ----------
  const handleSubmitLecture = async (e) => {
    e.preventDefault();
    if (!lectVideo) {
      alert('Please select a video file');
      return;
    }

    if (!lectTitle.trim()) {
      alert('Please enter a lecture title');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `courses/${courseId}/${activeChapterId}/${Date.now()}_${lectVideo.name}`);
    const task = uploadBytesResumable(storageRef, lectVideo);

    task.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (err) => {
        console.error('Upload error:', err);
        alert('Upload failed. Please try again.');
        setUploading(false);
        setUploadProgress(0);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(task.snapshot.ref);
          const courseRef = doc(firestore, 'courses', courseId);
          const snap = await getDoc(courseRef);

          if (!snap.exists()) {
            alert('Course not found');
            return;
          }

          const course = snap.data();
          const updatedContent = course.courseContent.map((ch) => {
            if (ch.chapterId !== activeChapterId) return ch;

            const maxOrder = ch.chapterContent.length > 0 
              ? Math.max(...ch.chapterContent.map((l) => l.lectureOrder))
              : 0;

            const newLecture = {
              lectureId: `lect_${Date.now()}`,
              lectureTitle: lectTitle.trim(),
              lectureDuration: parseInt(lectDuration) || 0,
              lectureUrl: downloadURL,
              isPreviewFree: lectPreview,
              lectureOrder: maxOrder + 1,
            };

            return {
              ...ch,
              chapterContent: [...ch.chapterContent, newLecture]
            };
          });

          await updateDoc(courseRef, { courseContent: updatedContent });
          setUploading(false);
          setShowLectureForm(false);
          setUploadProgress(0);
        } catch (error) {
          console.error('Error saving lecture:', error);
          alert('Failed to save lecture');
          setUploading(false);
          setUploadProgress(0);
        }
      }
    );
  };

  if (!courseId) {
    return (
      <div className="max-w-3xl mx-auto p-6 font-sans">
        <div className="text-red-600 bg-red-50 p-4 rounded-md border border-red-100">Course ID not found in URL</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 font-sans">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-200">Manage Course Content</h2>
        
      </div>

      {/* Add Chapter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Chapter</h3>
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <input
            type="text"
            placeholder="Enter chapter title"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg text-black focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddChapter()}
          />
          <button
            onClick={handleAddChapter}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${chapterTitle.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            disabled={!chapterTitle.trim()}
          >
            Add Chapter
          </button>
        </div>
      </div>

      {/* Chapters List */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-stone-400 mb-4">Section ({chapters.length})</h3>

        {chapters.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm text-gray-600">
            <p>No chapters yet. Add your first chapter above.</p>
          </div>
        ) : (
          chapters.map((chapter) => (
            <div key={chapter.chapterId} className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-b border-gray-100 gap-4">
                <div className="flex-1">
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Chapter {chapter.chapterOrder}</span>
                  <h4 className="mt-2 text-lg font-semibold text-gray-900">{chapter.chapterTitle}</h4>
                </div>
                <div>
                  <button
                    onClick={() => openLectureForm(chapter.chapterId, chapter.chapterTitle)}
                    className="px-3 py-2 rounded-md bg-gray-600 text-white text-sm hover:bg-gray-700"
                  >
                    + Add Lecture
                  </button>
                </div>
              </div>

              {/* Lectures List */}
              <div className="p-5">
                {chapter.chapterContent.length === 0 ? (
                  <p className="text-center italic text-gray-600 py-4">No lectures in this chapter yet</p>
                ) : (
                  chapter.chapterContent
                    .slice() // copy before sort
                    .sort((a, b) => a.lectureOrder - b.lectureOrder)
                    .map((lecture) => (
                      <div key={lecture.lectureId} className="py-3 border-b last:border-b-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-gray-700 font-semibold min-w-[24px]">{lecture.lectureOrder}.</span>
                          <span className="flex-1 text-gray-900">{lecture.lectureTitle}</span>
                          <span className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded-full">{lecture.lectureDuration} min</span>
                          {lecture.isPreviewFree && (
                            <span className="text-white bg-green-600 px-2 py-1 rounded-full text-sm font-semibold">Free Preview</span>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lecture Modal */}
      {showLectureForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Add Lecture to: {activeChapterTitle}</h3>
              <button
                onClick={() => setShowLectureForm(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
                disabled={uploading}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitLecture} className="p-6">
              <div className="mb-4">
                <label htmlFor="lectureTitle" className="block text-sm font-medium text-gray-700 mb-2">Lecture Title *</label>
                <input
                  id="lectureTitle"
                  type="text"
                  placeholder="Enter lecture title"
                  value={lectTitle}
                  onChange={(e) => setLectTitle(e.target.value)}
                  required
                  disabled={uploading}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-black"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lectureDuration" className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes) *</label>
                <input
                  id="lectureDuration"
                  type="number"
                  placeholder="Enter duration in minutes"
                  value={lectDuration}
                  onChange={(e) => setLectDuration(e.target.value)}
                  min="1"
                  required
                  disabled={uploading}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-black"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lectureVideo" className="block text-sm font-medium text-gray-700 mb-2">Video File *</label>
                <input
                  id="lectureVideo"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setLectVideo(e.target.files[0])}
                  required
                  disabled={uploading}
                  className="w-full text-black"
                />
                {lectVideo && (
                  <p className="mt-2 text-sm text-gray-600">Selected: {lectVideo.name}</p>
                )}
              </div>

              <div className="mb-4 flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={lectPreview}
                    onChange={(e) => setLectPreview(e.target.checked)}
                    disabled={uploading}
                    className="w-4 h-4"
                  />
                  <span className='text-black'>Mark as free preview</span>
                </label>
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mb-2">
                    <div className="h-full bg-blue-600 transition-width duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 block text-center">{uploadProgress}%</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setShowLectureForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${uploading || !lectVideo || !lectTitle.trim() ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  disabled={uploading || !lectVideo || !lectTitle.trim()}
                >
                  {uploading ? 'Uploading...' : 'Save Lecture'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLectures;
