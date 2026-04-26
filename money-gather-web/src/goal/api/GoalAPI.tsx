
import {type GoalItem} from "../types/GoalItem.tsx";

async function fetchBudget(): Promise<GoalItem[]>{
    const response = await fetch("/data/budget.json");
    if (!response.ok){
        throw new Error("Fetching budget data failed!!")
    }
    const data: Promise<GoalItem[]> = await response.json();
    return data;
}

export {fetchBudget};