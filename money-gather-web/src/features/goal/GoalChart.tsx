import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

type ChartProps = {
    currentAmount: string,
    target: string,
    description: string
    id: number
}

function GoalChart({currentAmount, target, description, id}: ChartProps) {
    // Global Chart plugins
    ChartJS.register(ArcElement, Tooltip, Legend);

    // Custom plugin that allows placing
    // text to the center of the doughnut
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
    function getDoughnutData () {
        const remaining = Number(target) - Number(currentAmount);
        return {
            labels: ["Saved amount", "Remaining amount"],
            datasets: [{
                data: [Number(currentAmount), remaining],
                backgroundColor: ['#0790e8' , '#F1F3F4'],
                borderColor: '#0A0C1F'
            }],
        }
    }

    const doughnut = () => {
        return(<Doughnut
                key={id}
                data={getDoughnutData()}
                options={{
                    plugins: {
                        centerTextPlugin: {
                            text: description
                        }
                    }
                }}
                plugins={[centerTextPlugin]}
            />
        )
    }

    return(
        <div className="goalDoughnutDiv">
            {doughnut()}
        </div>
    )
}

export default GoalChart;