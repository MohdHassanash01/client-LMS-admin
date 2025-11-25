import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useFirebase } from "@/context/Firebase";
import humanizeDuration from "humanize-duration";
import { assets } from "../assets/assets.js";
import { Card } from "@/components/ui/card.js";

import Loading from "../components/Loading"

const ViewCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { firestore } = useFirebase();

  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState<string | null>(null);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // fetch course from firebase
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRef = doc(firestore, "courses", courseId as string);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          setCourse({ id: courseSnap.id, ...courseSnap.data() });
        }
      } catch (error) {
        console.error("Course fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  console.log(course);
  

  if (loading) return <div className="text-center py-10">
    <Loading/>
  </div>;
  if (!course) return <div className="text-center py-10">Course not found.</div>;

  return (
    <div className="flex flex-col md:flex-row gap-10 md:px-24 px-5 py-10 min-h-screen">

      {/* LEFT SECTION */}
      <Card className="flex-1 text-gray-700 p-10">

        <h1 className="text-3xl md:text-4xl font-bold text-neutral-400">{course?.courseTitle}</h1>

<div className="rounded-lg p-4  border-stone-600 border-2">
    <img 
    className="rounded-lg"
    src={course.courseThumbnail} alt="" />
</div>

        <p
          className="pt-4 leading-relaxed text-neutral-300"
          dangerouslySetInnerHTML={{ __html: course?.courseDescription.slice(0, 200) }}
        ></p>

        <p className="text-sm pt-3 text-stone-500">Course by <span className="text-blue-600 underline">Hassan Ashraf</span></p>

        <h2 className="text-2xl font-semibold text-neutral-500 pt-8">Course Structure</h2>

        <div className="pt-5 space-y-4">

 {/* If no section/chapters added */}
  {(!course?.courseContent || course.courseContent.length === 0) && (
    <p className="text-center py-6 text-red-500 font-medium bg-red-50 border border-red-200 rounded-lg">
      You have not added any section or chapter to this course yet ❗
    </p>
  )}

          {course?.courseContent?.map((chapter, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-sm">

              {/* CHAPTER HEADER */}
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 rounded-lg"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={assets.down_arrow_icon}
                    className={`w-4 transition-transform ${openSections[index] ? "rotate-180" : ""}`}
                  />
                  <p className="font-medium">{chapter.chapterTitle}</p>
                </div>
                <p className="text-sm opacity-70">{chapter.chapterContent.length} Lectures</p>
              </div>

              {/* LECTURES */}
              <div
                className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96" : "max-h-0"}`}
              >
                <ul className="border-t px-5 py-3 space-y-2">
                  {chapter.chapterContent.map((lecture, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
  let url = lecture.lectureUrl;
  if (!url.includes("alt=media")) {
    url += (url.includes("?") ? "&" : "?") + "alt=media";
  }
  setPlayerData(url);
}}
                    >
                      <div className="flex items-center gap-2">
                        <img src={assets.play_icon} className="w-4 mt-1" />
                        <p className="text-sm font-medium text-gray-800">{lecture.lectureTitle}</p>
                      </div>
                      <p className="text-xs opacity-60">
                        {humanizeDuration(lecture.lectureDuration * 60000, { units: ["h", "m"] })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="py-16">
          <h3 className="text-xl font-semibold text-neutral-400">Course Description</h3>
          <p
            className="pt-3 leading-relaxed rich-text text-neutral-300"
            dangerouslySetInnerHTML={{ __html: course?.courseDescription }}
          ></p>
        </div>
      </Card>

      {/* RIGHT VIDEO PLAYER */}

     
<div className="flex flex-col">


   <Card className="md:w-[430px] w-full sticky top-24 shadow-xl rounded-xl h-fit p-4">
  {(!course?.courseContent || course.courseContent.length === 0) ? (
    <div className="flex flex-col gap-4 items-center justify-center h-60 text-red-500 font-medium">
      <img src={assets.play_icon} className="w-8 opacity-60" />
      <p>You have not added any lecture yet 🎬</p>
    </div>
  ) : playerData ? ( <iframe src={playerData} className="w-full aspect-video rounded-lg" allowFullScreen ></iframe> ) : (
    <div className="flex flex-col gap-4 items-center justify-center h-60 text-gray-500">
      <img src={assets.play_icon} className="w-10 opacity-60" />
      <p>Select a lecture to start watching</p>
    </div>
  )}
</Card>

<div className="sticky top-95">
    {course?.liveLectures && course.liveLectures.length > 0 && (
  <div className="mt-6">
    <h3 className="text-xl font-semibold text-neutral-400 mb-3">Live Lectures</h3>

    <Card className="md:w-[430px] w-full shadow-xl rounded-xl h-fit p-4 space-y-3">
      {course.liveLectures.map((live, i) => (
        <div
          key={i}
          className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-100 transition cursor-pointer"
        >
          <div className="font-medium">
            <p className="font-semibold text-blue-500">📍 Zoom Meeting</p>
            <p className="text-sm text-gray-500 mt-1">
              📅 {live.date} — ⏰ {live.time}
            </p>
          </div>

          <a href={live.link} target="_blank" rel="noopener noreferrer">
            <button className="bg-blue-600 text-white px-6 font-medium py-1.5 rounded-md text-sm hover:bg-blue-700 transition">
              Join
            </button>
          </a>
        </div>
      ))}
    </Card>
  </div>
)}
</div>

</div>




    </div>
  );
};

export default ViewCourse;


