
import {type GoalItem} from "../types/GoalItem.tsx";

async function fetchGoals(): Promise<GoalItem[]>{
    const response = await fetch("http://localhost:8080/goals");
    if (!response.ok){
        throw new Error("Fetching budget data failed!")
    }
    return  await response.json();
}

async function editGoal(goal:GoalItem): Promise<GoalItem>{
    const response = await fetch(`http://localhost:8080/goals/${goal.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            description: goal.description,
            currentAmount: goal.currentAmount,
            target: goal.target
            })
    });
    if (!response.ok){
        throw new Error("Editing goal failed!")
    }
    return await response.json();
}

async function addNewGoal(): Promise<GoalItem>{
    const response = await fetch ("http://localhost:8080/goals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            description: "",
            currentAmount: 0,
            target: 100
        })
    });
    if (!response.ok){
        throw new Error("Editing goal failed!")
    }
    return await response.json();
}

async function deleteGoal(id:number): Promise<GoalItem>{
    const response = await fetch (`http://localhost:8080/goals/${id}`, {
        method: "Delete"
    });
    if (!response.ok){
        throw new Error("Editing goal failed!")
    }
    return await response.json();
}

export {fetchGoals, editGoal, addNewGoal, deleteGoal};