import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import Students from "./pages/Students"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"
import NotFound from "./pages/not-found"


function App() {

  return (
 <>
 
 <BrowserRouter>

 <Routes>

{/* <Route path="/signin" element={}/>
<Route path="/signup" element={}/> */}

<Route path="/" element={<Layout/>}>

<Route path="/" element={<Dashboard/>}/>
      <Route path="/courses" element={<Courses/>} />
      <Route path="/students" element={<Students/>} />
      <Route path="/analytics" element={<Analytics/>} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="*" element={<NotFound/>} />

</Route>


 </Routes>
 

 
 </BrowserRouter>

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
