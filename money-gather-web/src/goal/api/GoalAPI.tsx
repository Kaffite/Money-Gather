
import {type GoalItem} from "../types/GoalItem.tsx";

async function fetchGoals(): Promise<GoalItem[]>{
    const response = await fetch("http://localhost:8080/goals");
    if (!response.ok){
        throw new Error("Fetching budget data failed!!")
    }
    const data: Promise<GoalItem[]> = await response.json();
    return data;
}

export {fetchGoals};