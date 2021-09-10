import {
	Grid,
	Paper,
	TextField,
	Select,
	FormControl,
	InputLabel,
	Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	p10: {
		padding: "10px",
	},
}));

function UserForm() {
	const classes = useStyles();

	const [formData, setFormData] = useState({});

	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	console.log(formData);
	return (
		<div>
			<h3>User Form</h3>
			<Paper>
				<form onChange={handleFormChange}>
					<Grid container style={{ padding: "20px" }}>
						<Grid item xs={12} lg={6} className={classes.p10}>
							<TextField
								fullWidth
								variant="outlined"
								label="Full Name"
								name="fullname"></TextField>
						</Grid>
						<Grid item xs={12} lg={6} className={classes.p10}>
							<TextField
								fullWidth
								variant="outlined"
								label="Username"
								name="username"></TextField>
						</Grid>
						<Grid item xs={12} lg={6} className={classes.p10}>
							<TextField
								fullWidth
								variant="outlined"
								name="email"
								label="email"></TextField>
						</Grid>
						<Grid item xs={12} lg={6} className={classes.p10}>
							<TextField
								fullWidth
								variant="outlined"
								type="password"
								label="Password"
								name="password"></TextField>
						</Grid>
						<Grid item xs={12} lg={6} className={classes.p10}>
							<FormControl
								variant="outlined"
								fullWidth
								className={classes.formControl}>
								<InputLabel htmlFor="outlined-age-native-simple">
									Role
								</InputLabel>
								<Select
									native
									label="Role"
									inputProps={{
										name: "role",
										id: "outlined-age-native-simple",
									}}>
									<option aria-label="None" value="" />
									<option value="Admin">Admin</option>
									<option value="Cashier">Cashier</option>
								</Select>
							</FormControl>
						</Grid>
						<Grid container justifyContent="flex-end">
							<Grid item xs="12" lg={3}>
								<Button
									fullWidth
									variant="contained"
									className="c-btn c-btn-rounded">
									Submit
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</div>
	);
}

export default UserForm;
