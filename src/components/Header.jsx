import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	navbar: {
		backgroundColor: "grey",
		height: "70px",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 10px",
	},
}));

function Header() {
	const classes = useStyles();

	return (
		<header className={classes.navbar}>
			<Avatar>SK</Avatar>
		</header>
	);
}

export default Header;
