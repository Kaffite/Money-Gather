import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip} from 'chart.js';
import Annotation, {type PartialEventContext} from "chartjs-plugin-annotation";
import {useState} from "react";

type ChartProps = {
    currentAmount: string,
    target: string,
    description: string
    id: number
}

function GoalChart({currentAmount, target, description, id}: ChartProps) {

    const [showPercentage, setShowPercentage] = useState<boolean>(true);
    // Global Chart plugins
    ChartJS.register(ArcElement, Tooltip, Annotation);

    // Data of Doughnut Charts
    function getDoughnutData () {
        const currentAsNr:number= Number(currentAmount);
        const targetAsNr:number = Number(target);
        const remaining:number =
            targetAsNr >= currentAsNr
            ? targetAsNr - currentAsNr
            : 0
        return {
            labels: ["Saved amount", "Remaining amount"],
            datasets: [{
                data: [currentAsNr, remaining],
                backgroundColor: ['#0790e8' , '#D2E3FC'],
                borderColor: '#0A0C1F'
            }],
        }
    }

    function getGoalProgressionPercentage(): string {
        const percentage = Number(currentAmount) / Number(target) * 100;
        return percentage.toFixed(2) + "%";
    }

    function getGoalProgressionNumbers(): string {
        return currentAmount + " / " + target + " €";
    }

    return(
        <Doughnut
            key={id}
            data={getDoughnutData()}
            options={{
                aspectRatio: 1.1,
                plugins: {
                    annotation: {
                        annotations: {
                            innerlabel: {
                                type: 'doughnutLabel',
                                display: true,
                                drawTime: 'afterDraw',
                                font: [{size: 22}, {size: 18, weight: 'bold'}],
                                // TODO: Click -> Change inner text
                                click(context) {
                                    setShowPercentage(!showPercentage);
                                },
                                color: ['#0160c9', 'black'],
                                content: ({chart}):string[] => [description,
                                    showPercentage
                                        ? getGoalProgressionPercentage()
                                        : getGoalProgressionNumbers()
                                    ],
                            }
                        }
                    }
                }
            }}
        />
    )
}

export default GoalChart;