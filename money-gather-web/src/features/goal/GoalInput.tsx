import style from "@/features/goal/goal.module.css";
import type {GoalItem} from "@/features/goal/types/GoalItem.tsx";


type props = {
    buffer:GoalItem
    updatecurrentAmount: (e:React.ChangeEvent<HTMLInputElement>) => void
    updateTarget: (e:React.ChangeEvent<HTMLInputElement>) => void
    updateDescription: (e:React.ChangeEvent<HTMLInputElement>) => void

};

function GoalInput({buffer, updatecurrentAmount, updateTarget, updateDescription}:props){
    return (
        <div id={style.input_div}>
            
            <p>Current Amount: </p>
            <div id={style.currentAmountDiv} className={"horizontalDiv"}>
                <input
                    id={style.currentAmountSlider}
                    type="range"
                    min="0"
                    max={buffer.target}
                    value={buffer.currentAmount}
                    onChange={event => updatecurrentAmount(event)}>
                </input>
                <input
                    className={style.small_action}
                    value={buffer.currentAmount}
                    onChange={event => updatecurrentAmount(event)}>
                </input>
            </div>

            <p>Target Amount: </p>
            <div className={"horizontalDiv"}>
                <input
                    className={style.big_action}
                    value={buffer.target}
                    onChange={event => updateTarget(event)}>
                </input>
                <p>€</p>
            </div>

            <p>Description:</p>
            <div className={"horizontalDiv"}>
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