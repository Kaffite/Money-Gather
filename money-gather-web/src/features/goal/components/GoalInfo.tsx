import style from "@/features/goal/goal.module.css";

function GoalInfo({currentAmount, target}: {currentAmount:number, target:number}){
    return (
        <div className={style.input_div}>
            <h2>Current Amount: {(currentAmount)}€ </h2>
            <h2>Target Amount: {target}€ </h2>
        </div>)
}
export default GoalInfo;