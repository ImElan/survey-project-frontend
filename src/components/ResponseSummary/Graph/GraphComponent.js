import React from "react"
import './Graph.css';
import {PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar,Cell, ResponsiveContainer} from "recharts";

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const GraphComponent = (props) => {
 
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
};
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
          width={700}
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
          <YAxis
          />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill={getRandomColor()} background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};
export default GraphComponent;




