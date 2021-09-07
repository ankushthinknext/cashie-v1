import React, { useState, useEffect } from "react";
import axios from "../config/axiosConfig";
import moment from "moment";
import qs from "query-string";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";

function Users() {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		axios(`user?limit=100`).then((response) =>
			setUsers(response.data.data.users),
		);
	}, []);

	return (
		<div>
			<h3>Users</h3>
			<Grid container>
				<Grid items xs={12}>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Full Name</TableCell>
									<TableCell align="left">Username</TableCell>
									<TableCell align="left">Role</TableCell>
									<TableCell align="left">Last Active</TableCell>
									<TableCell align="left">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users &&
									users.map((user) => (
										<TableRow key={user._id}>
											<TableCell>{user.fullname}</TableCell>
											<TableCell>{user.username}</TableCell>
											<TableCell>
												{user.role === "Admin" ? (
													<Chip
														label={user.role}
														color="secondary"
														variant="outlined"
													/>
												) : (
													<Chip
														label={user.role}
														color="primary"
														variant="outlined"
													/>
												)}
											</TableCell>
											<TableCell>
												{moment(user.lastActive).format("llll")}
											</TableCell>
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

export default Users;
