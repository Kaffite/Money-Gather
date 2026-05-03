
import {type GoalItem} from "./types/GoalItem.tsx";

type GoalProps = {
    goals: GoalItem[]
}
function Goal({goals}: GoalProps) {

    const goalList = goals.map((goal, i) =>
            <h1 key={i}>{goal.description}: {goal.saved} / {goal.target}€</h1>)

    return(goalList);

}

export default Goal;