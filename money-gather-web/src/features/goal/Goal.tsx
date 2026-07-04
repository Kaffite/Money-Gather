import GoalChart from "./GoalChart.tsx";
import type {GoalItem} from "./types/GoalItem.tsx";
import {useState} from "react";
import style from "./goal.module.css"
import GoalInfo from "@/features/goal/GoalInfo.tsx";
import GoalInput from "@/features/goal/GoalInput.tsx";

type props = {
    goal:GoalItem
    onDelete: (goal:GoalItem) => void
    onUpdate: (index:number, goal:GoalItem) => void
    index: number
}

function Goal ({goal, onDelete, onUpdate, index}: props) {
    const [editModeActive, setEditModeActive] = useState<boolean>(false);
    const [buffer, setBuffer] = useState<GoalItem>(goal);

    const updateEditMode = () => {
        // If we exit edit mode, we want to save changes globally:
        if (editModeActive)
            onUpdate(index, buffer)
        setEditModeActive(!editModeActive)
    }

    function updateDescription(e:React.ChangeEvent<HTMLInputElement>):void {
        setBuffer(prevState => ({
            ...prevState,
            description: e.target.value
        }))
    }

    function updatecurrentAmount(e:React.ChangeEvent<HTMLInputElement>):void {
        let value:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(value);
        if (value < 0)
            value = 0
        if (typeIsNr) {
            setBuffer(prevState => ({
                ...prevState,
                currentAmount: value
            }))
        }
    }

    function updateTarget (e:React.ChangeEvent<HTMLInputElement>):void {
        const value:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(value);
        if (typeIsNr) {
            setBuffer(prevState => ({
                ...prevState,
                target: value,
            }))
        }
    }

    // In edit mode we use buffer values
    // These values are saved after exiting edit mode
    return(
        <div key={goal.id} className={style.goal_container}>
            <div className={style.vertical_div + " " + style.dougnut_div}>
                <GoalChart
                    currentAmount={String(buffer.currentAmount)}
                    target={String(buffer.target)}
                    description={buffer.description}
                    id={goal.id}>
                </GoalChart>
                {editModeActive
                    ? <GoalInput
                        buffer={buffer}
                        updatecurrentAmount={(e) => updatecurrentAmount(e)}
                        updateTarget={(e) => updateTarget(e)}
                        updateDescription={(e) => updateDescription(e)}>
                      </GoalInput>
                    : <GoalInfo
                        currentAmount={goal.currentAmount}
                        target={goal.target}>
                      </GoalInfo>
                }
            </div>

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
        </div>);
}

export default Goal;