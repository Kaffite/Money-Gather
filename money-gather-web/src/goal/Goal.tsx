import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {useState} from "react";
import {Doughnut} from "react-chartjs-2";
import {type GoalItem} from "./types/GoalItem.tsx";

type GoalProps = {
    goals: GoalItem[]
}

function Goal({goals}:GoalProps) {
    const [saved, setSaved] = useState<string[]>(goals.map(goal => String(goal.saved)));
    const [targets, setTargets] = useState<string[]>(goals.map(goal => String(goal.target)));
    const [descriptions, setDescriptions] = useState<string[]>(goals.map(goal => goal.description));
    const [editMode, setEditMode] = useState<boolean[]>(Array(goals.length).fill(false));
    const descLimit:number = 10;


    // TODO: Notify the users about the limit
    function handleSavedChange (index:number, e:React.ChangeEvent<HTMLInputElement>) {
        let value:string = e.target.value;

        const valueNr:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(valueNr);

        if (valueNr > Number(targets[index])) value = targets[index];
        if (typeIsNr) {
            const updated = [...saved];
            updated[index] = value;
            setSaved(updated);
        }
    };

    function handleTargetChange (index:number, e:React.ChangeEvent<HTMLInputElement>) {
        const value:string = e.target.value;
        const valueNr:number = Number(e.target.value);
        const typeIsNr:boolean = !Number.isNaN(valueNr);
        if (typeIsNr) {
            const updated = [...targets];
            updated[index] = value;
            setTargets(updated);
        }
    };

    // TODO: Tell Users that max size is 10 characters
    function handleDescChange(index:number, e:React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > descLimit) return;
        const updated = [...descriptions];
        updated[index] = e.target.value;
        setDescriptions(updated);
    }

    function changeEditMode (i:number) {
        const updated = [...editMode];
        updated[i] = !updated[i];
        setEditMode(updated);
    }



    //  TODO: Remove goal from DB
    function deleteGoal(index:number){
        // Remove i-th element from array
        setSaved(saved.filter((_, i) => i != index))
        setTargets(targets.filter((_, i) => i != index))
        setDescriptions(descriptions.filter((_, i) => i != index))
        setEditMode(editMode.filter((_, i) => i != index))
        // Remove visual elements of the goal
        document.getElementById(`goalDiv${index}`)?.remove()
    }

    // Global Chart plugins
    ChartJS.register(ArcElement, Tooltip, Legend);

    const centerTextPlugin = {
        id: "centerTextPlugin",
        beforeDraw: function (chart:ChartJS, _args, options) {
            const width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            const fontSize = (height / 230).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            const text = options.text,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 1.75;
            ctx.fillText(text, textX, textY);
            ctx.save();
       }
    }

    // Data of Doughnut Charts
    function getDoughnutData (i:number) {
        const currentlySaved = Number(saved[i]);
        const remaining = Number(targets[i]) - currentlySaved;
        return {
            labels: ["Saved amount", "Remaining amount"],
            datasets: [{
                data: [currentlySaved, remaining],
                backgroundColor: ['#63e4e1' , '#ffffff'],
                borderColor: '#1e1e1e'
            }],
        }
    }

    const doughnut = ((i:number) => {
        return(<Doughnut
            key={i}
            data={getDoughnutData(i)}
            options={{
                plugins: {
                    centerTextPlugin: {
                        text: descriptions[i]
                    }
                }
            }}
            plugins={[centerTextPlugin]}
            />
        )
    })


    const goalList = goals.map((_, i) =>
        <div className={"goalDiv"} id={`goalDiv${i}`}>
                <div className="goalDoughnutDiv">
                    {doughnut(i)}
                </div>
                <div className={"goalBtnDiv"}>
                    <button className={"goal_small_action goalBtn"} onClick={event => changeEditMode(i)}>
                        {editMode[i] ? "Save changes" : "Edit"}
                    </button>
                    <button className={"goal_small_action goalBtn deleteBtn"} onClick={event => deleteGoal(i)}>Delete</button>
                </div>
                <div className={"goalInputDiv"}>
                    {editMode[i]
                        ?   (<div>
                                <input className={"goal_small_action"} value={(saved[i])} placeholder={"Saved"} onChange={event => handleSavedChange(i, event)}/> /
                                <input className={"goal_small_action"} value={targets[i]} placeholder={"Target"} onChange={event => handleTargetChange(i, event)} /> €
                                <input className={"goal_big_action"} value={descriptions[i]} placeholder={`Name (max ${descLimit} symbols)`} onChange={event => handleDescChange(i, event)} ></input>
                            </div>)
                        :   (<>
                            <h3> {(saved[i])} / {targets[i]}€  </h3>
                            <h3> ({Math.round(Number(saved[i]) / Number(targets[i]) * 100)}%)</h3>
                            </>)
                    }
                </div>

            </div>


);

    return(
        <>
            <h1>Your Goals</h1>
            <div className={"goalGroupDiv"}>
                {goalList}
            </div>
        </>
    );

}

export default Goal;