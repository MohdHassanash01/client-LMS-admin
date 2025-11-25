import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useFirebase } from "@/context/Firebase";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddLiveLecture() {


  const { courseId } = useParams();
  const navigate = useNavigate();
  const { firestore } = useFirebase();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    link: "",
    status: "upcoming",
    date: "",
    time: "",
  });


 const save = async () => {
  if (!data.link || !data.date || !data.hour || !data.minute || !data.zone) {
    toast.error("Please fill all fields");
    return;
  }

  const formattedTime = `${data.hour}:${data.minute} ${data.zone}`;

  setLoading(true);

  await updateDoc(doc(firestore, "courses", courseId), {
    liveLectures: arrayUnion({
      link: data.link,
      status: "upcoming",
      date: data.date,
      time: formattedTime,
    }),
  });

  toast.success("Live lecture added!");

  setLoading(false);
  navigate(`/courses`);
};


  return (
    <div className="w-full min-h-screen">
      <Card className="p-6 max-w-lg mx-auto space-y-5 mt-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Live Zoom Lecture</h2>

        <Input
          placeholder="Zoom Link"
          onChange={(e) => setData({ ...data, link: e.target.value })}
        />
        <Input
          type="date"
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />
        
   
        <div className="flex gap-3">
  {/* Hour */}
  <Select onValueChange={(v) => setData({ ...data, hour: v })}>
    <SelectTrigger className="w-24">
      <SelectValue placeholder="Hour" />
    </SelectTrigger>
    <SelectContent>
      {[...Array(12)].map((_, i) => (
        <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
      ))}
    </SelectContent>
  </Select>

  {/* Minute */}
  <Select onValueChange={(v) => setData({ ...data, minute: v })}>
    <SelectTrigger className="w-24">
      <SelectValue placeholder="Min" />
    </SelectTrigger>
    <SelectContent>
      {[...Array(60)].map((_, i) => (
        <SelectItem key={i} value={`${String(i).padStart(2, "0")}`}>
          {String(i).padStart(2, "0")}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  {/* AM / PM */}
  <Select onValueChange={(v) => setData({ ...data, zone: v })}>
    <SelectTrigger className="w-24">
      <SelectValue placeholder="AM / PM" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="AM">AM</SelectItem>
      <SelectItem value="PM">PM</SelectItem>
    </SelectContent>
  </Select>
</div>



        <Button className="w-full" onClick={save} disabled={loading}>
          {loading ? "Uploading..." : "Add Live Lecture"}
        </Button>
      </Card>
    </div>
  );
}
