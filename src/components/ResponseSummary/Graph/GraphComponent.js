import React from 'react';
import './Graph.css';
import {
	PieChart,
	Pie,
	Tooltip,
	BarChart,
	XAxis,
	YAxis,
	Legend,
	CartesianGrid,
	Bar,
	Cell,
	ResponsiveContainer,
} from 'recharts';

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

const GraphComponent = (props) => {
	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill='white'
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline='central'
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};
	return (
		<div style={{ textAlign: 'center', marginTop: '70px' }}>
			<h4 style={{ textAlign: 'left' }}>
				<span style={{ fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>
					{'Question ' + props.questionId}:{' '}
				</span>
				<span>{props.question}</span>
			</h4>
			<div className='GraphComponent' style={{ marginTop: '30px' }}>
				<PieChart width={400} height={400}>
					<Pie
						data={props.data}
						cx={200}
						cy={200}
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={150}
						fill='#8884d8'
						dataKey='value'
					>
						{props.data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={getRandomColor()} />
						))}
					</Pie>
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
					<XAxis dataKey='name' scale='point' padding={{ left: 25.5, right: 0 }} />
					<YAxis />
					<Tooltip />
					<Legend />
					<CartesianGrid strokeDasharray='3 3' />
					<Bar dataKey='value' fill={getRandomColor()} background={{ fill: '#eee' }} />
				</BarChart>
			</div>
		</div>
	);
};
export default GraphComponent;
