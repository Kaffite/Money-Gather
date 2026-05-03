import {useEffect, useState} from "react";

import Goal from "./Goal.tsx";
import {fetchGoals} from "./api/GoalAPI.tsx";
import type {GoalItem} from "./types/GoalItem.tsx";

function BudgetController(){
    const [goals, setGoals] = useState<GoalItem[]>([]);

    useEffect(() => {
        fetchGoals().then(goals => setGoals(goals))
    }, []);

    if (goals.length < 1) return <h1>Loading...</h1>

    return (
        <>
            <h1>Goals</h1>
            <Goal goals={goals}/>
        </>
    );
}

export default BudgetController;
