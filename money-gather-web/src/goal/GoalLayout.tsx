import {type GoalItem} from "./types/GoalItem.tsx";
import Goal from "./Goal.tsx";

type GoalProps = {
    goals: GoalItem[]
    onDelete: (index:number) => void
    onUpdate: (index:number, goal:GoalItem) => void
}

function GoalLayout({goals, onDelete, onUpdate}:GoalProps) {

    const goalList = goals.map((goal, i) =>
        <Goal key={goal.id} goal={goal} onDelete={onDelete} onUpdate={onUpdate} index={i}/>)


    return(
        <div>
            <h1>Your Goals</h1>
            <div className={"horizontalDiv"}>
                {goalList}
            </div>
        </div>
    );
}

export default GoalLayout;