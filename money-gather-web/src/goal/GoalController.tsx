import {useEffect} from "react";

import Goal from "./Goal.tsx";
import {fetchBudget} from "./api/Budget.tsx";

function BudgetController(){

    useEffect(() => {
        // VAR = fetchbudget
        fetchBudget()
    });
    return (
        <>
            <Goal saved={30} goal={100}/>
        </>
    );
}

export default BudgetController;
