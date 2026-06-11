import {type GoalItem} from "./types/GoalItem.tsx";
import Goal from "./Goal.tsx";
import style from "./goal.module.css"

type GoalProps = {
    goals: GoalItem[]
    onDelete: (goal:GoalItem) => void
    onUpdate: (index:number, goal:GoalItem) => void
    addNewGoal: () => void
}

function GoalLayout({goals, onDelete, onUpdate, addNewGoal}:GoalProps) {

    const goalList = goals.map((goal, i) =>
            <Goal key={goal.id} goal={goal} onDelete={onDelete} onUpdate={onUpdate} index={i}/>)


    return(
        <div>
            <div className={style.horizontal_div + " " + style.goal_container}>
                {goalList}
            </div>
            <button onClick={addNewGoal} className={"goal_btn goal_action_btn"}> Add a new goal</button>
        </div>
    );
}

export default GoalLayout;