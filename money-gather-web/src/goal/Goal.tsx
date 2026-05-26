import {useState} from "react";
import {type GoalItem} from "./types/GoalItem.tsx";
import GoalChart from "./GoalChart.tsx";

type GoalProps = {
    goals: GoalItem[]
}

function Goal({goals}:GoalProps) {
    const [saved, setSaved] = useState<string[]>(goals.map(goal => String(goal.saved)));
    const [targets, setTargets] = useState<string[]>(goals.map(goal => String(goal.target)));
    const [descriptions, setDescriptions] = useState<string[]>(goals.map(goal => goal.description));
    const [editMode, setEditMode] = useState<boolean[]>(Array(goals.length).fill(false));
    const descLimit:number = 10;


    // TODO: Notify the users about the limit
    function handleSavedChange (index:number, e:React.ChangeEvent<HTMLInputElement>) {
        let value:string = e.target.value;

        const valueNr:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(valueNr);

        if (valueNr > Number(targets[index])) value = targets[index];
        if (typeIsNr) {
            const updated = [...saved];
            updated[index] = value;
            setSaved(updated);
        }
    }

    function handleTargetChange (index:number, e:React.ChangeEvent<HTMLInputElement>) {
        const value:string = e.target.value;
        const valueNr:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(valueNr);
        if (typeIsNr) {
            const updated = [...targets];
            updated[index] = value;
            setTargets(updated);
        }
    }

    // TODO: Tell Users that max size is 10 characters
    function handleDescChange(index:number, e:React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > descLimit) return;
        const updated = [...descriptions];
        updated[index] = e.target.value;
        setDescriptions(updated);
    }

    function changeEditMode (i:number) {
        const updated = [...editMode];
        updated[i] = !updated[i];
        setEditMode(updated);
    }


    //  TODO: Remove goal from DB
    function deleteGoal(index:number){
        // Remove i-th element from array
        setSaved(saved.filter((_, i) => i != index))
        setTargets(targets.filter((_, i) => i != index))
        setDescriptions(descriptions.filter((_, i) => i != index))
        setEditMode(editMode.filter((_, i) => i != index))
        // Remove visual elements of the goal
        document.getElementById(`goalDiv${index}`)?.remove()
    }

    const goalList = goals.map((_, i) =>
        <div className={"goalDiv"} id={`goalDiv${i}`}>
            <GoalChart saved={saved[i]} target={targets[i]} description={descriptions[i]} index={i}/>
                <div className={"goalBtnDiv"}>
                    <button className={"goal_small_action goalBtn"} onClick={event => changeEditMode(i)}>
                        {editMode[i] ? "Save changes" : "Edit"}
                    </button>
                    <button className={"goal_small_action goalBtn deleteBtn"} onClick={event => deleteGoal(i)}>Delete</button>
                </div>
                <div className={"goalInputDiv"}>
                    {editMode[i]
                        ?   (<div>
                                <input className={"goal_small_action"} value={(saved[i])} placeholder={"Saved"} onChange={event => handleSavedChange(i, event)}/> /
                                <input className={"goal_small_action"} value={targets[i]} placeholder={"Target"} onChange={event => handleTargetChange(i, event)} /> €
                                <input className={"goal_big_action"} value={descriptions[i]} placeholder={`Name (max ${descLimit} symbols)`} onChange={event => handleDescChange(i, event)} ></input>
                            </div>)
                        :   (<>
                            <h3> {(saved[i])} / {targets[i]}€  </h3>
                            <h3> ({Math.round(Number(saved[i]) / Number(targets[i]) * 100)}%)</h3>
                            </>)
                    }
                </div>
            </div>


);

    return(
        <>
            <h1>Your Goals</h1>
            <div className={"goalGroupDiv"}>
                {goalList}
            </div>
        </>
    );

}

export default Goal;