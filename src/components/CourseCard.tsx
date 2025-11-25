import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: string;
  courseTitle: string;
  courseDescription: string;
  price: number;
  discount: number;
  educatorId: string;
  courseThumbnail: string;
  createdAt: string;
}

export default function CourseCard({
  id,
  courseTitle,
  courseDescription,
  price,
  discount,
  courseThumbnail,
  createdAt
}: CourseCardProps) {

  const navigate = useNavigate()
  const finalPrice = price - (price * (discount / 100));

  const readableDate = createdAt?.seconds
  ? new Date(createdAt.seconds * 1000).toLocaleDateString()
  : "N/A";

  // console.log(id);
  

  return (
    <Card className="overflow-hidden hover-elevate">
      {/* Thumbnail */}
      <div className="aspect-video bg-muted overflow-hidden">
        <img
          src={courseThumbnail}
          alt={courseTitle}
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader>
        <h3 className="font-semibold text-lg line-clamp-2">
          {courseTitle}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {courseDescription}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center  text-sm gap-3">
          <span className="font-medium">Price : </span>
          <span className="font-bold"> ₹ {finalPrice}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center  text-sm text-muted-foreground">
            <span>Original : </span>
            <span className="line-through ml-3"> ₹{" "}{price}</span>

          </div>
        )}


        <div className="text-xs text-muted-foreground">
          Created At : {readableDate}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-4">

         <Button 
         onClick={() => navigate(`/addLecture/${id}`)}
         className="w-fit">
          Add lecture
        </Button>


        <Button 
        onClick={() => navigate(`/course/${id}/live-lectures/add`)}
        className="w-fit">
          Add Live class
        </Button>

      </CardFooter>

        <Button 
        onClick={() => navigate(`/course/${id}`)}
        className="mx-6">
          View Course
        </Button>
    </Card>
  );
}
