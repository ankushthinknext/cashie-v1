import React, { useEffect, useState } from "react";

import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../config/axiosConfig";
import { Line, Bar } from "react-chartjs-2";
import moment from "moment";

import qs from "query-string";

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
		axios(`transaction/dashboard?${qs.stringify(query)}`).then((response) =>
			setDashboardData(response.data.data),
		);
	}, []);
	console.log(dashboardData);
	const dataset = {
		labels: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wenesday",
			"Thruday",
			"Friday",
			"Saturday",
		],
		datasets: [
			{
				label: "# of Votes",
				data: dashboardData && [
					dashboardData.items[0] && dashboardData.items[0].grandtotal,
					dashboardData.items[1] && dashboardData.items[1].grandtotal,
					dashboardData.items[2] && dashboardData.items[2].grandtotal,
					dashboardData.items[3] && dashboardData.items[3].grandtotal,
					dashboardData.items[4] && dashboardData.items[4].grandtotal,
					dashboardData.items[5] && dashboardData.items[5].grandtotal,
					dashboardData.items[6] && dashboardData.items[6].grandtotal,
				],
				fill: true,
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgba(255, 99, 132, 0.2)",
			},
		],
	};
	console.log(dataset);

	return (
		<div>
			<Grid container>
				<Grid item xs={12} lg={4}>
					<Paper className={classes.paper}>
						Transaction- {dashboardData && dashboardData.count}
					</Paper>
				</Grid>
				<Grid item xs={12} lg={4}>
					<Paper className={classes.paper}>
						Income- {dashboardData && dashboardData.total}
					</Paper>
				</Grid>
				<Grid item xs={12} lg={4}>
					<Paper className={classes.paper}>
						Transaction- {dashboardData && dashboardData.qty}
					</Paper>
				</Grid>
			</Grid>

			<Grid container>
				<Grid item xs={12} lg={6}>
					<Paper>
						<Line data={dataset} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Main;
