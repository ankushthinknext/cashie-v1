import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import moment from "moment";
import qs from "query-string";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: "5px",
		padding: theme.spacing(2),
		textAlign: "center",
	},
}));

function Main() {
	const classes = useStyles();
	const [query, setQuery] = useState({
		start: moment().startOf("week").format("llll"),
		end: moment().endOf("week").format("llll"),
		limit: 7,
	});

	const [dashboardData, setDashboardData] = useState(null);
	const [recentTransactions, setRecentTransactions] = useState(null);

	useEffect(() => {
		getDashboardData();
	}, []);
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

	function getDashboardData() {
		axios(`transaction/dashboard?${qs.stringify(query)}`).then((response) =>
			setDashboardData(response.data.data),
		);

		axios(`transaction?${qs.stringify(query)}`).then((response) =>
			setRecentTransactions(response.data.data.transactions),
		);
	}
	console.log(dashboardData);
	console.log(recentTransactions);
	return (
		<div>
			<h3>Dashboard</h3>
			<Grid container>
				<Grid item xs={12} lg={4}>
					<Paper className={classes.paper}>
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
					<Paper className={classes.paper}>
						<Bar data={data} />
					</Paper>
				</Grid>
				<Grid item sm={12} lg={6}>
					<Paper className={classes.paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Reciept No</TableCell>
									<TableCell align="left">Date</TableCell>
									<TableCell align="right">Qty</TableCell>
									<TableCell align="right">Total</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{recentTransactions &&
									recentTransactions.map((transaction) => (
										<TableRow key={transaction._id}>
											<TableCell>{transaction._id}</TableCell>
											<TableCell>
												{moment(transaction.createdAt).format("llll")}
											</TableCell>
											<TableCell>{transaction.items.length}</TableCell>
											<TableCell>{transaction.grandtotal}</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Main;
