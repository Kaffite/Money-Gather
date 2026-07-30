import style from "@/features/goal/goal.module.css";
import type {GoalItem} from "@/features/goal/types/GoalItem.tsx";

type props = {
    editModeActive: boolean,
    updateEditMode: () => void,
    goal:GoalItem
    onDelete: (goal:GoalItem) => void
}

function GoalControls({editModeActive, updateEditMode, goal, onDelete}: props){
    return(
        <div className={style.btn_div + " " + style.vertical_div}>
            <button className={style.small_action + " " + style.blue_btn + " " + style.action_btn}
                    style={ editModeActive ?{backgroundColor: "green"} : {} }
                    onClick={() => updateEditMode()}>
                {editModeActive ? "Confirm" : "Edit"}
            </button>
            <button className={style.small_action + " " + style.action_btn + " delete_btn"}
                    onClick={() => onDelete(goal)}>Delete
            </button>
        </div>
    )
}



export default GoalControls;