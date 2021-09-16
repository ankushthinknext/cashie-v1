import {
	AppBar,
	Container,
	Grid,
	Paper,
	Tab,
	Tabs,
	Box,
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	CardActions,
	Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, useContext } from "react";
import axios from "../config/axiosConfig";
import Cart from "./Cart";
import { CartContext } from "../App";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}
const useStyles = makeStyles({
	tabsArea: {
		display: "flex",
		justifyContent: "space-evenly",
		flexWrap: "wrap",
		width: "100%",
	},
	card: {
		width: "30%",
	},
});

function Transactions() {
	const classes = useStyles();
	let cartData = useContext(CartContext);
	const [allProducts, setAllProducts] = useState(null);
	const [productsByCategory, setProductsByCategory] = useState(null);
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	useEffect(() => {
		axios("product/transaction").then((result) => {
			setAllProducts(result.data.data.all);
			setProductsByCategory(result.data.data.categories);
		});
	}, []);
	console.log(allProducts);
	console.log(productsByCategory);
	return (
		<div>
			<h3>Transactions</h3>

			<Grid container>
				<Grid item lg={8} xs={12}>
					<Paper>
						<AppBar position="static" color="default">
							<Tabs
								value={value}
								onChange={handleChange}
								indicatorColor="primary"
								textColor="primary"
								variant="scrollable"
								scrollButtons="auto"
								aria-label="scrollable auto tabs example">
								<Tab label="All " {...a11yProps(0)} />

								{productsByCategory &&
									productsByCategory.map((category, index) => (
										<Tab
											key={category._id}
											label={category.name}
											{...a11yProps(index + 1)}
										/>
									))}
							</Tabs>
						</AppBar>

						<TabPanel value={value} index={0}>
							<div className={classes.tabsArea}>
								{allProducts &&
									allProducts.map((item) => (
										<Card
											className={classes.card}
											onClick={() => cartData.addItem(item)}>
											<CardActionArea>
												<CardMedia
													component="img"
													height="140"
													image={item.image}
													title={item.name}
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="h2">
														{item.name}
													</Typography>
													<Typography
														variant="body2"
														color="textSecondary"
														component="p">
														Lizards are a widespread group of squamate reptiles,
														with over 6,000 species, ranging across all
														continents except Antarctica
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<Button size="small" color="primary">
													{item.price}
												</Button>
												<Button size="small" color="primary">
													Add To Cart
												</Button>
											</CardActions>
										</Card>
									))}
							</div>
						</TabPanel>

						{productsByCategory &&
							productsByCategory.map((category, index) => (
								<TabPanel value={value} index={index + 1}>
									<div className={classes.tabsArea}>
										{category.items &&
											category.items.map((item) => (
												<Card
													className={classes.card}
													onClick={() => cartData.addItem(item)}>
													<CardActionArea>
														<CardMedia
															component="img"
															height="140"
															image={item.image}
															title={item.name}
														/>
														<CardContent>
															<Typography
																gutterBottom
																variant="h5"
																component="h2">
																{item.name}
															</Typography>
															<Typography
																variant="body2"
																color="textSecondary"
																component="p">
																Lizards are a widespread group of squamate
																reptiles, with over 6,000 species, ranging
																across all continents except Antarctica
															</Typography>
														</CardContent>
													</CardActionArea>
													<CardActions>
														<Button size="small" color="primary">
															{item.price}
														</Button>
														<Button size="small" color="primary">
															Add To Cart
														</Button>
													</CardActions>
												</Card>
											))}
									</div>
								</TabPanel>
							))}
					</Paper>
				</Grid>
				<Grid item lg={4} xs={12}>
					<Paper>
						<Cart />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Transactions;
