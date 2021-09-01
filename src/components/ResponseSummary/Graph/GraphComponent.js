import React from "react"
import './Graph.css';
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, } from "recharts";

const GraphComponent = (props) => {


    return (
        <div style={{ textAlign: "center" }}>
            <h3>{props.question}</h3>
            <div className="GraphComponent">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={props.data}
                        cx={200}
                        cy={200}
                        outerRadius={150}
                        fill="#8884d8"
                    // label
                    />
                    <Tooltip />
                </PieChart>
                <BarChart
                    width={500}
                    height={400}
                    data={props.data}
                    margin={{
                        top: 30,
                        right: 30,
                        left: 80,
                        bottom: 5,
                    }}
                    barSize={50}
                >
                    <XAxis
                        dataKey="name"
                        scale="point"
                        padding={{ left: 25.5, right: 0 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
                </BarChart>
            </div>
        </div>
    );
};
export default GraphComponent;