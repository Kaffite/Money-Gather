import GoalChart from "./GoalChart.tsx";
import type {GoalItem} from "./types/GoalItem.tsx";
import {useState} from "react";

type props = {
    goal:GoalItem
    onDelete: (index:number) => void
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
        <div key={goal.id} className={"verticalDiv"}>
            <GoalChart currentAmount={String(buffer.currentAmount)} target={String(buffer.target)} description={buffer.description} id={goal.id}/>
            <div className={"goalBtnDiv"}>
                <button className={"goal_small_action goalBtn"} onClick={() => updateEditMode()}>
                    {editMode ? "Save changes" : "Edit"}
                </button>
                <button className={"goal_small_action goalBtn deleteBtn"} onClick={() => onDelete(index)}>Delete</button>
            </div>
            {editMode
                ? (<div className={"goalInputDiv"}>
                    <div>
                        <input className={"goal_small_action"} value={(buffer.currentAmount)} placeholder={"Saved Amount"} onChange={event => updatecurrentAmount(event)}/> /
                        <input className={"goal_small_action"} value={buffer.target} placeholder={"Target Amount"} onChange={event => updateTarget(event)} /> €
                    </div>
                    <input className={"goal_big_action"} value={buffer.description} placeholder={`Name (max ${descLimit} symbols)`} onChange={event => updateDescription(event)} ></input>
                </div>)

                : (<div className={"goalInputDiv horizontalDiv"}>
                    <h3> {(goal.currentAmount)} / {goal.target}€  </h3>
                    <h3> ({Math.round(Number(goal.currentAmount) / Number(goal.target) * 100)}%)</h3>
                </div>)}
        </div>);
}

export default Goal;