import { Link, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
// import { UseLogin } from "../Context/LoginContext";

import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";


export default function Navbar() {
    const navigate = useNavigate();

    //   const { isLoggedIn, logout } = UseLogin();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-neutral-600  backdrop-blur supports-[backdrop-filter]:bg-background/60 ">

      <div className=" flex items-center justify-between   h-15  mx-5 ">

<SidebarTrigger/>




<div className="space-x-3 flex-shrink-0 ">

      <ModeToggle />

        <Button 
        onClick={() => navigate("/add-content")}
        className="bg-white text-black py-2 px-3 rounded-md text-sm cursor-pointer">
          Sign In
        </Button>


 {/* {  isLoggedIn ? <Button
        onClick={() => {
        logout()
        navigate("/")
      }}
        className="bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3 rounded-md text-md text-white cursor-pointer">
          Logout
        </Button> :     <Button
        onClick={() => navigate("/signin")}
        className="bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3 rounded-md text-md text-white cursor-pointer">
          Sign In
        </Button>} */}

</div>
  
      </div>
    </div>
  );
}