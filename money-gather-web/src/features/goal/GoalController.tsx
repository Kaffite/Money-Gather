import {useEffect, useState, createContext, type Context} from "react";

import GoalLayout from "./GoalLayout.tsx";
import {fetchGoals, editGoal, addNewGoal, deleteGoal} from "./api/GoalAPI.tsx";
import type {GoalItem} from "./types/GoalItem.tsx";

export const GoalContext:Context<GoalItem[]> = createContext();

function BudgetController(){
    const [goals, setGoals] = useState<GoalItem[]>([]);

    useEffect(() => {
        fetchGoals().then(goals => setGoals(goals))
    }, []);

    async function addGoal (){
        const newGoal:GoalItem = await addNewGoal();
        const updated:GoalItem[] = [...goals];
        updated.push(newGoal);
        setGoals(updated);
    }

    function onDelete(goal:GoalItem){
        deleteGoal(goal.id);
        const updated:GoalItem[] = [...goals];
        updated.splice(goals.indexOf(goal), 1);
        setGoals(updated);
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

    return (
        <>
            <GoalContext value={goals}>
                <GoalLayout  onDelete={onDelete} onUpdate={onUpdate} addNewGoal={addGoal}/>
           </GoalContext>
        </>
    );
}

export default BudgetController;
