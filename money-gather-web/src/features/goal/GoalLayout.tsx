import {useContext} from "react";
import {GoalContext} from "@/features/goal/GoalController.tsx";

import {type GoalItem} from "./types/GoalItem.tsx";
import Goal from "./Goal.tsx";
import style from "./goal.module.css"
import Footer from "@/components/Footer.tsx";
import Header from "@/components/Header.tsx";

type GoalProps = {
    onDelete: (goal:GoalItem) => void
    onUpdate: (index:number, goal:GoalItem) => void
    addNewGoal: () => void
}

function GoalLayout({onDelete, onUpdate, addNewGoal}:GoalProps) {
    const goals:GoalItem[] = useContext(GoalContext)

    const goalList = goals.map((goal, i) =>
            <Goal key={goal.id} goal={goal} onDelete={onDelete} onUpdate={onUpdate} index={i}/>)


    return(
        <>
            <Header/>
            <div className={style.container}>
                {goalList}
                <button
                    onClick={addNewGoal}
                    id={style.new_goal_btn}
                    className={style.action_btn + " " + style.blue_btn}>
                    Add a new goal
                </button>
            </div>
            <Footer/>
        </>

);
}

export default GoalLayout;