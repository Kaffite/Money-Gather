import GoalChart from "./GoalChart.tsx";
import type {GoalItem} from "./types/GoalItem.tsx";
import {useState} from "react";
import style from "./goal.module.css"

type props = {
    goal:GoalItem
    onDelete: (goal:GoalItem) => void
    onUpdate: (index:number, goal:GoalItem) => void
    index: number
}

function Goal ({goal, onDelete, onUpdate, index}: props) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [buffer, setBuffer] = useState<GoalItem>(goal);
    const descLimit:number = 10;

    const updateEditMode = () => {
        // If we exit edit mode, we want to save changes globally:
        if (editMode)
            onUpdate(index, buffer)
        setEditMode(!editMode)
    }

    // TODO: Tell Users that max size is 10 characters
    function updateDescription(e:React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > descLimit) return;
        setBuffer(prevState => ({
            ...prevState,
            description: e.target.value
        }))
    }

    // TODO: Notify the users about the limit
    function updatecurrentAmount(e:React.ChangeEvent<HTMLInputElement>) {
        let value:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(value);
        if (value > Number(buffer.target)) {
            value = buffer.target;
        }
        if (value < 0)
            value = 0
        if (typeIsNr) {
            setBuffer(prevState => ({
                ...prevState,
                currentAmount: value
            }))
        }
    }

    function updateTarget (e:React.ChangeEvent<HTMLInputElement>) {
        const value:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(value);
        if (typeIsNr) {
            setBuffer(prevState => ({
                ...prevState,
                target: value
            }))
        }
    }

    // In edit mode we use buffer values
    // These values are saved after exiting edit mode
    return(
        <div key={goal.id} className={style.goal_div}>
            <GoalChart currentAmount={String(buffer.currentAmount)} target={String(buffer.target)} description={buffer.description} id={goal.id}/>
            <div className={style.goal_btn_div}>
                <button className={style.goal_small_action + " " + style.goal_btn + " " + style.goal_action_btn}
                    style={ editMode ?{backgroundColor: "green"} : {} }
                    onClick={() => updateEditMode()}>
                        {editMode ? "Confirm" : "Edit"}
                </button>
                <button className={style.goal_small_action + " " + style.goal_btn + " " + style.delete_btn}
                        onClick={() => onDelete(goal)}>Delete
                </button>
            </div>
            {editMode
                ?
                (<div className={style.goal_input_div}>
                    <div>
                        <input className={style.goal_small_action}
                               value={(buffer.currentAmount)}
                               placeholder={"Saved Amount"}
                               onChange={event => updatecurrentAmount(event)}>
                        </input>
                        /
                        <input className={style.goal_small_action}
                               value={buffer.target}
                               placeholder={"Target Amount"}
                               onChange={event => updateTarget(event)}>
                        </input>
                        €
                    </div>
                    <input
                        className={style.goal_big_action}
                        value={buffer.description}
                        placeholder={`Name (max ${descLimit} symbols)`}
                        onChange={event => updateDescription(event)}
                    ></input>
                </div>)

                :
                (<div className={style.goal_input_div + " " + style.horizontal_div}>
                    <h3> {(goal.currentAmount)} / {goal.target}€  </h3>
                    <h3> ({Math.round(Number(goal.currentAmount) / Number(goal.target) * 100)}%)</h3>
                </div>)}
        </div>);
}

export default Goal;