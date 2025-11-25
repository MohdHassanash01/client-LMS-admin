import {  Outlet, Route, Routes } from "react-router-dom"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import Students from "./pages/Students"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"
import NotFound from "./pages/not-found"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import { ToastContainer } from "react-toastify"
import CreateCourse from "./pages/CreateCourse"
import AddLectures from "./pages/AddLectures"
import ViewCourse from "./pages/ViewCourse"
import ScrollHandler from "./components/ScrollHandler"

import AddLiveLecture from "./pages/AddLivePage"
import CourseDetail from "./pages/CourseDetail"


function App() {

  return (
 <>
 
 <ScrollHandler/>

 <Routes>

 <Route path="/signin" element={<Signin/>}/>
<Route path="/signup" element={<Signup/>}/> 

<Route path="/" element={<Layout/>}>

<Route path="/" element={<Dashboard/>}/>

      <Route path="/courses" element={<Courses/>} />
      <Route path="/students" element={<Students/>} />
      <Route path="/analytics" element={<Analytics/>} />
      <Route path="/settings" element={<Settings/>} />

<Route path="/createcourse" element={<CreateCourse/>} />

<Route path="/addLecture/:courseId" element={<AddLectures/>} />

<Route path="/course/:courseId" element={<ViewCourse/>} />

<Route path="/course/:courseId/live-lectures/add" element={<AddLiveLecture/>}/>

<Route path="/CourseDetail" element={<CourseDetail/>}/>

</Route>

 <Route path="*" element={<NotFound/>} />


 </Routes>

     <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

 </>
  )
}



function Layout(){
    const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <SidebarProvider style={style as React.CSSProperties}>
   <AppSidebar />

    <main className="w-full">

    <Navbar/>

<div className="px-4">
  <Outlet/>
</div>

    </main>

    </SidebarProvider>
</ThemeProvider>
    </>
  )
}

export default App
