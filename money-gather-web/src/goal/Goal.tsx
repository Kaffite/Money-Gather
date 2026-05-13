
import {type GoalItem} from "./types/GoalItem.tsx";
import {useState} from "react";


type GoalProps = {
    goals: GoalItem[]
}
function Goal({goals}: GoalProps) {
    const [saved, setSaved] = useState<string[]>(goals.map(goal => String(goal.saved)));
    const [target, setTarget] = useState<string[]>(goals.map(goal => String(goal.target)));
    const [description, setDescription] = useState<string[]>(goals.map(goal => goal.description));

    // TODO: Add limit -> current can't be higher than goal?
    function handleSavedChange (index:number, e) {
        const valueStr:string = e.target.value;
        const valueNr:number = Number(valueStr);
        const typeNr:boolean = !Number.isNaN(valueNr);
        setSaved(saved.map(
            (item, i) =>
                i == index && typeNr
                    ? valueStr
                    : item
        ));
    };

    function handleTargetChange (index:number, e) {
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

    function handleDescChange(index:number, e) {
        const value:string = e.target.value;
        setDescription(description.map(
            (item, i) =>
                i == index
                    ? value
                    : item
        ));
    }

    const goalList = goals.map((_, i) =>
        <h2 key={i}>
            Goal:
            <input value={description[i]} onChange={event => handleDescChange(i, event)}/>
            <br/>
            <input value={(saved[i])} onChange={event => handleSavedChange(i, event)}/> /
            <input value={target[i]} onChange={event => handleTargetChange(i, event)} /> €

            </h2>)
    return(
        <>
            <h1>goals</h1>
            {goalList}
        </>
    );

}

export default Goal;