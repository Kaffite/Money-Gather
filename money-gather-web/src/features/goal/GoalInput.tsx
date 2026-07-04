import style from "@/features/goal/goal.module.css";
import type {GoalItem} from "@/features/goal/types/GoalItem.tsx";


type props = {
    buffer:GoalItem
    updatecurrentAmount: (e:React.ChangeEvent<HTMLInputElement>) => void
    updateTarget: (e:React.ChangeEvent<HTMLInputElement>) => void
    updateDescription: (e:React.ChangeEvent<HTMLInputElement>) => void

};

function GoalInput({buffer, updatecurrentAmount, updateTarget, updateDescription}:props){
    //TODO: Fix horizontal Div resizing Goal container
    return (
        <div id={style.input_div}>
            <div id={style.currentAmountDiv} className={"horizontalDiv"}>
                <p>Current Amount: </p>
                <input
                    id={style.currentAmountSlider}
                    type="range"
                    min="0"
                    max={buffer.target}
                    value={(buffer.currentAmount)}
                    onChange={event => updatecurrentAmount(event)}>
                </input>
                <p>{buffer.currentAmount}</p>
            </div>
            <div className={"horizontalDiv"}>
                <p>Target Amount: </p>
                <input
                    className={style.small_action}
                    value={buffer.target}
                    placeholder={"Target Amount"}
                    onChange={event => updateTarget(event)}>
                </input>
                <p>€</p>
            </div>
            <div className={"horizontalDiv"}>
                <p>Description:</p>
                <input
                    className={style.big_action}
                    value={buffer.description}
                    placeholder={`Name / Description`}
                    onChange={event => updateDescription(event)}>
                </input>
            </div>
        </div>
    );
}

export default GoalInput;