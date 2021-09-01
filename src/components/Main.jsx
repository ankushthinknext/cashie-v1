import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import moment from "moment";
import qs from "query-string";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
const data = {
	labels: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thrusday",
		"Friday",
		"Saturday",
	],
	datasets: [
		{
			label: "# of Votes",
			data: [120, 19, 3, 5, 2, 3],
			fill: true,
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgba(255, 99, 132, 0.2)",
		},
	],
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: "5px",
		padding: theme.spacing(2),
		textAlign: "center",
		height: "100px",
	},
}));

function Main() {
	const classes = useStyles();
	const [query, setQuery] = useState({
		start: moment().startOf("week").format("llll"),
		end: moment().endOf("week").format("llll"),
	});

	const [dashboardData, setDashboardData] = useState(null);

	useEffect(() => {
		getDashboardData();
	}, []);

	function getDashboardData() {
		axios(`transaction/dashboard?${qs.stringify(query)}`).then((response) =>
			setDashboardData(response.data.data),
		);
	}
	return (
		<div>
			<h3>Dashboard</h3>
			<Grid container>
				<Grid item xs={12} lg={4}>
					<Paper className={classes.paper}>
						{" "}
						Transaction - {dashboardData && dashboardData.count}
					</Paper>
				</Grid>
				<Grid item xs={12} lg={4}>
					<Paper className={classes.paper}>
						Income - {dashboardData && dashboardData.total.toFixed(2)}
					</Paper>
				</Grid>
				<Grid item xs={12} lg={4}>
					<Paper className={classes.paper}>
						Quantity - {dashboardData && dashboardData.qty}
					</Paper>
				</Grid>
			</Grid>

			<Grid container>
				<Grid item sm={12} lg={6}>
					<Paper>
						<Bar data={data} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Main;
