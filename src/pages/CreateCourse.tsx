import { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


import {  addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useFirebase } from "@/context/Firebase";
import { useNavigate } from "react-router-dom";


const CreateCourse = () => {

    const navigate = useNavigate()

  const { user, firestore,
        storage } = useFirebase();

        console.log("firestore : ", firestore); 

         console.log("storage : ", storage); 

         const fileRef = useRef(null);

    const [course, setCourse] = useState({
    courseTitle: "",
    courseDescription: "",
    price: "",
    discount: "",
    courseThumbnail: null,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {

    const { name, value, files } = e.target;

    if (name === "courseThumbnail") {
      setCourse({ ...course, courseThumbnail: files[0] });
    } else {
      setCourse({ ...course, [name]: value });
    }
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload Thumbnail to Firebase Storage
      let imageUrl = "";

      if (course.courseThumbnail) {
        const imgRef = ref(storage, `courseThumbnails/${Date.now()}-${course.courseThumbnail.name}`);

        await uploadBytes(imgRef, course.courseThumbnail);

        imageUrl = await getDownloadURL(imgRef);
      }

      console.log(imageUrl);
    

      const payload = {
        courseTitle: course.courseTitle,
        courseDescription: course.courseDescription,
        price: Number(course.price),
        discount: Number(course.discount || 0),
        educatorId: user?.uid || "unknown",
        courseThumbnail: imageUrl,
        createdAt: serverTimestamp(),
      };

    //   await setDoc(doc(firestore, "courses", docId), payload);

   await addDoc(collection(firestore, "courses"), payload);


      toast.success("Course Created Successfully!")

      navigate("/courses")

      setCourse({
        courseTitle: "",
        courseDescription: "",
        price: "",
        discount: "",
        courseThumbnail: null,
      });

      // Clear file input manually
if (fileRef.current) {
  fileRef.current.value = "";
}

    } catch (err) {
      console.error(err);
      alert("Error creating course");
    }

    setLoading(false);
  }

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-2xl shadow-lg border rounded-2xl sm:mt-5 md:mt-0 ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create New Course
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Course Title */}
            <div>
              <Label>Course Title *</Label>
              <Input
              required
                className="mt-2"
                name="courseTitle"
                placeholder="Enter course title"
                value={course.courseTitle}
                onChange={handleChange}
              />
            </div>

            {/* Course Description */}
            <div>
              <Label>Course Description *</Label>
              <Textarea
              required
                className="mt-2"
                name="courseDescription"
                rows={3}
                placeholder="Write course description"
                value={course.courseDescription}
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div>
              <Label>Price *</Label>
              <Input
              required
                className="mt-2"
                name="price"
                type="number"
                placeholder="Course Price"
                value={course.price}
                onChange={handleChange}
              />
            </div>

            {/* Discount */}
            <div>
              <Label>Discount (%) (optional)</Label>
              <Input
                className="mt-2"
                name="discount"
                type="number"
                placeholder="Discount %"
                value={course.discount}
                onChange={handleChange}
              />
            </div>

            {/* Thumbnail */}
         <div>
  <Label>Course Thumbnail *</Label>
  <Input
  required
    className="mt-2"
    name="courseThumbnail"
    type="file"
    accept="image/*"
    onChange={handleChange}
    ref={fileRef}
  />
</div>


            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-xl text-lg"
            >
              {loading ? "Creating..." : "Create Course"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCourse;
