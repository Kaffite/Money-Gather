import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {type GoalItem} from "./types/GoalItem.tsx";
import {useState} from "react";
import {Doughnut} from "react-chartjs-2";

type GoalProps = {
    goals: GoalItem[]
}

function Goal({goals}:GoalProps) {
    const [saved, setSaved] = useState<string[]>(goals.map(goal => String(goal.saved)));
    const [target, setTarget] = useState<string[]>(goals.map(goal => String(goal.target)));
    const [description, setDescription] = useState<string[]>(goals.map(goal => goal.description));
    const [editMode, setEditMode] = useState<boolean[]>(Array(goals.length).fill(false));


    ChartJS.register(ArcElement, Tooltip, Legend);

    // TODO: Make limiting max value more user-friendly
    function handleSavedChange (index:number, e:React.ChangeEvent<HTMLInputElement>) {
        const value:string = e.target.value;
        const valueNr:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(valueNr);
        if (typeIsNr && valueNr <= Number(target[index])) {
            const updated = [...saved];
            updated[index] = value;
            setSaved(updated);
        }
    };

    function handleTargetChange (index:number, e:React.ChangeEvent<HTMLInputElement>) {
        const value:string = e.target.value;
        const valueNr:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(valueNr);
        if (typeIsNr) {
            const updated = [...target];
            updated[index] = value;
            setTarget(updated);
        }
    };

    function handleDescChange(index:number, e:React.ChangeEvent<HTMLInputElement>) {
        const updated = [...description];
        updated[index] = e.target.value;
        setDescription(updated);
    }

    const getDoughnutData = (i:number) => {
        const currentlySaved = Number(saved[i]);
        const remaining = Number(target[i]) - currentlySaved;
        return {
            labels: ["Saved        amount", "Remaining amount"],
                datasets: [{
            data: [currentlySaved, remaining],
            backgroundColor: ['#45e63a' , '#ffffff'],
            borderColor: '#1e1e1e'
            }]
        };
    }

    const changeEditMode = (i:number) => {
        const updated = [...editMode];
        updated[i] = !updated[i];
        setEditMode(updated);
    }


    const goalList = goals.map((_, i) =>
            <div className={"goalDiv"}>
                <div className="goalDoughnutDiv">
                    <Doughnut key={i} data={getDoughnutData(i)}/>
                </div>

                <div className={"goalBtnDiv"}>
                    <button className={"goal_action goalBtn"} onClick={(e) => changeEditMode(i)}>
                        {editMode[i] ? "Save changes" : "Edit"}
                    </button>
                    <button className={"goal_action goalBtn deleteBtn"}>Delete</button>
                </div>
                <div className={"goalInputDiv"}>
                    {editMode[i]
                        ? (<>
                                <input className={"goal_action"} value={(saved[i])} onChange={event => handleSavedChange(i, event)}/> /
                                <input className={"goal_action"} value={target[i]} onChange={event => handleTargetChange(i, event)} /> €)
                            </>)
                        : (<h3> {(saved[i])} / {target[i]} € </h3>)
                    }
                    {/*<input className={"goal_action"} value={(saved[i])} onChange={event => handleSavedChange(i, event)}/> /*/}
                    {/*<h3> {(saved[i])} / {target[i]} € </h3>*/}
                    {/*<input className={"goal_action"} value={target[i]} onChange={event => handleTargetChange(i, event)} /> €*/}
                </div>

            </div>


);

    return(
        <>
            <h1>Your Goals</h1>
            <div className={"goalGroupDiv"}>
            {goalList}
            {/*<button>Add a new goal </button>*/}
            </div>
        </>
    );

}

export default Goal;