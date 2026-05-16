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

    ChartJS.register(ArcElement, Tooltip, Legend);

    // TODO: Add limit -> current can't be higher than goal?
    function handleSavedChange (index:number, e:React.ChangeEvent<HTMLInputElement>) {
        const valueStr:string = e.target.value;
        const valueNr:number = Number(valueStr);
        const valueIsNr:boolean = !Number.isNaN(valueNr);
        setSaved(saved.map(
            (item, i) =>
                i == index && valueIsNr
                    ? valueStr
                    : item
        ));
    };

    function handleTargetChange (index:number, e:React.ChangeEvent<HTMLInputElement>) {
        const valueStr:string = e.target.value;
        const valueNr:number = Number(valueStr);
        const typeNr:boolean = !Number.isNaN(valueNr);
        setTarget(target.map(
            (item, i) =>
                i == index && typeNr
                    ? valueStr
                    : item
        ));
    };

    function handleDescChange(index:number, e:React.ChangeEvent<HTMLInputElement>) {
        const value:string = e.target.value;
        setDescription(description.map(
            (item, i) =>
                i == index
                    ? value
                    : item
        ));
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


    const goalList = goals.map((_, i) =>
            <div className={"goalDiv"}>
                <div className="goalDoughnutDiv">
                    <Doughnut key={i} data={getDoughnutData(i)}/>
                </div>
                <div>
                    <button className={"goal_action goalBtn"}>Edit </button>
                    <button className={"goal_action goalBtn deleteBtn"}>Delete</button>
                </div>
                <div className={"goalInputDiv"}>
                    <input className={"goal_action"} value={(saved[i])} onChange={event => handleSavedChange(i, event)}/> /
                    {/*<h3> {(saved[i])} / {target[i]} € </h3>*/}
                    <input className={"goal_action"} value={target[i]} onChange={event => handleTargetChange(i, event)} /> €
                </div>
            </div>


);

    // const goalList = goals.map((_, i) =>
    //     <h2 key={i}>
    //         Goal:
    //         <input value={description[i]} onChange={event => handleDescChange(i, event)}/>
    //         <br/>
    //         <input value={(saved[i])} onChange={event => handleSavedChange(i, event)}/> /
    //         <input value={target[i]} onChange={event => handleTargetChange(i, event)} /> €
    //     </h2>)

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