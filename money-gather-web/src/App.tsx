import GoalController from "./features/goal/GoalController.tsx";
import "./index.css"
import {
    type RouteConfig,
    route,
    index,
} from "@react-router/dev/routes";

function App(){
   return(
       <GoalController/>
   )
}

export default App ;