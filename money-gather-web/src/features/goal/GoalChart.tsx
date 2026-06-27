import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip} from 'chart.js';
import Annotation from "chartjs-plugin-annotation";

type ChartProps = {
    currentAmount: string,
    target: string,
    description: string
    id: number
}

function GoalChart({currentAmount, target, description, id}: ChartProps) {
    // Global Chart plugins
    ChartJS.register(ArcElement, Tooltip, Annotation);

    // Data of Doughnut Charts
    function getDoughnutData () {
        const currentAsNr= Number(currentAmount);
        const remaining = Number(target) - currentAsNr;
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
        return percentage.toFixed(2);
    }

    return(<Doughnut
            key={id}
            data={getDoughnutData()}
            options={{
                plugins: {
                    annotation: {
                        annotations: {
                            innerlabel: {
                                type: 'doughnutLabel',
                                display: true,
                                drawTime: 'afterDraw',
                                font: [{size: 22}, {size: 16, weight: 'bold'}],
                                // TODO: Click -> Change inner text or sth
                                click(context) {
                                    console.log("click", context);
                                },
                                color: ['blue', 'black'],
                                content: ({chart}) => [description, getGoalProgressionPercentage() +  '%'],
                            }
                        }
                    }
                }
            }}
        />
    )
}

export default GoalChart;