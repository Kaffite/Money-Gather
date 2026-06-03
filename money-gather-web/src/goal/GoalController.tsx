import {useEffect, useState} from "react";

import GoalLayout from "./GoalLayout.tsx";
import {fetchGoals, editGoal, addNewGoal, deleteGoal} from "./api/GoalAPI.tsx";
import type {GoalItem} from "./types/GoalItem.tsx";

function BudgetController(){
    const [goals, setGoals] = useState<GoalItem[]>([]);

    useEffect(() => {
        fetchGoals().then(goals => setGoals(goals))
    }, []);

    const addGoal = () => addNewGoal();

    //TODO: Implement correctly
    function onDelete(index:number){
    }

    function onUpdate(index:number, goal:GoalItem){
        const updated = [...goals];
        // So ID can't be overwritten
        const oldID = updated[index].id;
        updated[index] = {
            ...goal,
            id: oldID
        }
        setGoals(updated)
        editGoal(updated[index])
    }

    if (goals.length < 1)
        return <h1>Loading...</h1>

    return (<GoalLayout goals={goals} onDelete={onDelete} onUpdate={onUpdate} addNewGoal={addGoal}/>);
}

export default BudgetController;
