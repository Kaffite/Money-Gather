
import {type BudgetItem} from "../types/GoalItem.tsx";

function Goal(props: BudgetItem) {
    return(
        <h1>Currently: {props.saved} /  {props.goal} </h1>
    );
}

export default Goal;