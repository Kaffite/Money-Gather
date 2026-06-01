import {useState} from "react";
import {type GoalItem} from "./types/GoalItem.tsx";
import GoalChart from "./GoalChart.tsx";

type GoalProps = {
    goals: GoalItem[]
}

function GoalLayout({goals}:GoalProps) {
    const [currentAmount, setCurrentAmount] = useState<string[]>(goals.map(goal => String(goal.currentAmount)));
    const [targets, setTargets] = useState<string[]>(goals.map(goal => String(goal.target)));
    const [descriptions, setDescriptions] = useState<string[]>(goals.map(goal => goal.description));
    const [editMode, setEditMode] = useState<boolean[]>(Array(goals.length).fill(false));
    const descLimit:number = 10;


    // TODO: Notify the users about the limit
    function updatecurrentAmount (index:number, e:React.ChangeEvent<HTMLInputElement>) {
        let value:string = e.target.value;

        const valueNr:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(valueNr);

        if (valueNr > Number(targets[index])) value = targets[index];
        if (typeIsNr) {
            const updated = [...currentAmount];
            updated[index] = value;
            setCurrentAmount(updated);
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
    function updateDescription(index:number, e:React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > descLimit) return;
        const updated = [...descriptions];
        updated[index] = e.target.value;
        setDescriptions(updated);
    }

    function updateEditMode (i:number) {
        const updated = [...editMode];
        updated[i] = !updated[i];
        setEditMode(updated);
    }


    // Removes deleted goal from UI
    //  TODO: Notifies GoalController about deletion (So the goal is deleted permanenetly)
    function deleteGoal(index:number){
        // Remove i-th element from array
        setCurrentAmount(currentAmount.filter((_, i) => i != index))
        setTargets(targets.filter((_, i) => i != index))
        setDescriptions(descriptions.filter((_, i) => i != index))
        setEditMode(editMode.filter((_, i) => i != index))
        document.getElementById(`goalDiv${index}`)?.remove()
    }

    const goalList = goals.map((_, i) =>
        <div className={"verticalDiv"} id={`goalDiv${i}`}>
            <GoalChart currentAmount={currentAmount[i]} target={targets[i]} description={descriptions[i]} index={i}/>
                <div className={"goalBtnDiv"}>
                    <button className={"goal_small_action goalBtn"} onClick={event => updateEditMode(i)}>
                        {editMode[i] ? "Save changes" : "Edit"}
                    </button>
                    <button className={"goal_small_action goalBtn deleteBtn"} onClick={event => deleteGoal(i)}>Delete</button>
                </div>
                {editMode[i]
                ? (<div className={"goalInputDiv"}>
                        <div>
                            <input className={"goal_small_action"} value={(currentAmount[i])} placeholder={"Saved Amount"} onChange={event => updatecurrentAmount(i, event)}/> /
                            <input className={"goal_small_action"} value={targets[i]} placeholder={"Target Amount"} onChange={event => handleTargetChange(i, event)} /> €
                        </div>
                        <input className={"goal_big_action"} value={descriptions[i]} placeholder={`Name (max ${descLimit} symbols)`} onChange={event => updateDescription(i, event)} ></input>
                  </div>)

                : (<div className={"goalInputDiv horizontalDiv"}>
                        <h3> {(currentAmount[i])} / {targets[i]}€  </h3>
                        <h3> ({Math.round(Number(currentAmount[i]) / Number(targets[i]) * 100)}%)</h3>
                  </div>)}
        </div>


);

    return(
        <>
            <h1>Your Goals</h1>
            <div className={"horizontalDiv"}>
                {goalList}
            </div>
        </>
    );

}

export default GoalLayout;