import style from "@/features/goal/goal.module.css";

function GoalInfo({currentAmount, target}: {currentAmount:number, target:number}){
    return (
        <div className={style.input_div}>
            <h3>Current Amount: {(currentAmount)}€ </h3>
            <h3>Target Amount: {target}€ </h3>
        </div>)
}
export default GoalInfo;