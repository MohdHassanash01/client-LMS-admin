// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
// import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"



// // Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ]

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   )
// }


import { ChevronUp, Home,  Settings, User2,Youtube , Twitter,Link2,Group, LayoutDashboard, BookOpen, Users, BarChart3, FolderOpen } from "lucide-react"

import {Link, useNavigate} from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "../components/ui/sidebar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useState } from "react"
// import { UseLogin } from "../Context/LoginContext"




export function AppSidebar() {

  const navigate = useNavigate()
  //  const {  logout } = UseLogin();
   
        const [currentTab, setCurrentTab] = useState("Home")

        // Menu items.
const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookOpen,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
    {
    title: "Detail",
    url: "/CourseDetail",
    icon: FolderOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
 
  return (
    <Sidebar className="overflow-hidden">
    <SidebarHeader className="py-3.5">
    <SidebarMenu>
  <SidebarMenuItem className="flex">

    <SidebarMenuButton asChild>

  <Link to="/">
    <h3 className="text-2xl font-bold ">LMS Admin</h3>
    </Link>

    </SidebarMenuButton>

        <SidebarTrigger className="md:hidden "/>


  </SidebarMenuItem>
</SidebarMenu>
      </SidebarHeader>


<SidebarSeparator className="border border-neutral-600" />

      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}  >
                  <SidebarMenuButton className={`my-2 text-md ${currentTab === item.title ? "bg:black/30" : "bg-transparent"}`} asChild>
                    <Link to={item.url} className="flex items-center gap-2 py-2 px-3 w-full">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>


       <SidebarFooter>
<SidebarMenu>
  <SidebarMenuItem>

<DropdownMenu>
  <DropdownMenuTrigger asChild>

    <SidebarMenuButton>
      <User2/> Profile <ChevronUp className="ml-auto"/>
    </SidebarMenuButton>

  </DropdownMenuTrigger>

<DropdownMenuContent align="end">
  <DropdownMenuItem 
   onClick={() => navigate("/profile")}>
    Account
  </DropdownMenuItem>

  <DropdownMenuItem 
  onClick={() => navigate("/settings")}>
    Sitting
  </DropdownMenuItem>


    <DropdownMenuItem 
     onClick={() => {
        logout()
        navigate("/")
      }}
    >
    Sign out
  </DropdownMenuItem>

</DropdownMenuContent>

</DropdownMenu>

  </SidebarMenuItem>
</SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}