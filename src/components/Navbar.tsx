import {  useNavigate } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";



import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { useFirebase } from "@/context/Firebase";


export default function Navbar() {
    const navigate = useNavigate();

      const {isloggedIn,logoutUser } = useFirebase()

  return (
    <div className="sticky top-0 z-50 w-full border-b border-neutral-600  backdrop-blur supports-[backdrop-filter]:bg-background/60 ">

      <div className=" flex items-center justify-between   h-15  mx-5 ">

<SidebarTrigger/>




<div className="space-x-3 flex-shrink-0 ">

      <ModeToggle />

       {  isloggedIn ? <Button
        onClick={() => {
        logoutUser()
        navigate("/signin")
      }}
        className=" py-2 px-3 rounded-md text-md text-black bg-white cursor-pointer text-sm">
          Logout
        </Button> :   
        
        <Button 
        onClick={() => navigate("/signin")}
        className="py-2 px-3 rounded-md text-md text-black bg-white cursor-pointer text-sm">
          Sign In
        </Button>}

</div>
  

  
      </div>
    </div>
  );
}