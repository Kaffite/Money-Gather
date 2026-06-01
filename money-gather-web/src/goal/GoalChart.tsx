import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

type ChartProps = {
    currentAmount: string,
    target: string,
    description: string
    index: number
}

function GoalChart({currentAmount, target, description, index}: ChartProps) {
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
    function getDoughnutData () {
        const remaining = Number(target) - Number(currentAmount);
        return {
            labels: ["Saved amount", "Remaining amount"],
            datasets: [{
                data: [Number(currentAmount), remaining],
                backgroundColor: ['#63e4e1' , '#ffffff'],
                borderColor: '#1e1e1e'
            }],
        }
    }

    const doughnut = () => {
        return(<Doughnut
                key={index}
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