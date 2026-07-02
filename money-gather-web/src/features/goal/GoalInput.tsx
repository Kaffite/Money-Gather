// import style from "@/features/goal/goal.module.css";
//
// function GoalInput({editModeActive}:boolean){
//
//     if (editModeActive) {
//         return (
//             (<div className={style.input_div}>
//                 <div>
//                     <input className={style.small_action}
//                            value={(buffer.currentAmount)}
//                            placeholder={"Saved Amount"}
//                            onChange={event => updatecurrentAmount(event)}>
//                     </input>
//                     /
//                     <input className={style.small_action}
//                            value={buffer.target}
//                            placeholder={"Target Amount"}
//                            onChange={event => updateTarget(event)}>
//                     </input>
//                     €
//                 </div>
//                 <input
//                     className={style.big_action}
//                     value={buffer.description}
//                     placeholder={`Name / Description`}
//                     onChange={event => updateDescription(event)}>
//                 </input>
//             </div>)
//         );
//
//     else
//         return (
//             <div className={style.input_div}>
//                 <h3>Current Amount: {(goal.currentAmount)}€ </h3>
//                 <h3>Target Amount: {goal.target}€ </h3>
//             </div>)
//         )
//     }
// }
//
// export default GoalInput;