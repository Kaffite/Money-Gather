import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css"
import Home from "@/features/home/Home.tsx";
import GoalController from "@/features/goal/GoalController.tsx";
    
function App(){
   return(
       <BrowserRouter>
          <Routes>
             <Route index element={<Home/>}/>
             <Route path="goals" element={<GoalController/>}/>
          </Routes>
       </BrowserRouter>
   )
}

export default App ;