import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { Typography } from "@material-ui/core";
import axios from "../config/axiosConfig";

function Cart() {
	let cartData = useContext(CartContext);
	const [storeSettings, setStoreSettings] = useState(null);
	useEffect(() => {
		axios("setting").then((response) => setStoreSettings(response.data.data));
	}, []);
	const subTotal = cartData.cartItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0,
	);
	const discount = storeSettings
		? (Number(storeSettings.discount) / 100) * Number(subTotal)
		: 0;

	let grandTotal = storeSettings ? Number(subTotal) - discount : 0;
	const tax = storeSettings
		? (Number(storeSettings.tax) / 100) * grandTotal
		: 0;
	grandTotal = storeSettings ? grandTotal + tax : 0;
	const handleTransaction = () => {
		axios.post("transaction", {
			items: cartData.cartItems,
			discount,
			grandtotal: grandTotal,
			subtotal: subTotal,
		});
	};

	return (
		<div>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Actions</TableCell>

							<TableCell>Total</TableCell>
						</TableRow>
					</TableHead>
					{cartData.cartItems.map((item) => (
						<TableRow>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.price}</TableCell>
							<TableCell>
								<RemoveCircleOutlineIcon
									onClick={() => cartData.decrement(item._id)}
									color="secondary"
								/>
								{item.qty}
								<AddCircleOutlineIcon
									onClick={() => cartData.increment(item._id)}
									color="secondary"
								/>
							</TableCell>

							<TableCell>{(item.price * item.qty).toFixed(2)}</TableCell>
						</TableRow>
					))}
				</Table>
				<Table style={{ marginTop: "30px" }}>
					<TableRow>
						<TableCell>Subtotal</TableCell>

						<TableCell align="right">{subTotal.toFixed(2)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Tax</TableCell>

						<TableCell align="right">{tax.toFixed(2)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Discount</TableCell>

						<TableCell align="right">{discount.toFixed(2)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>GrandTotal</TableCell>

						<TableCell align="right">{grandTotal.toFixed(2)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Button variant="contained">Cancel</Button>
						</TableCell>

						<TableCell align="right">
							<Button
								onClick={handleTransaction}
								size="large"
								variant="contained"
								className="c-btn">
								Pay
							</Button>
						</TableCell>
					</TableRow>
				</Table>
			</TableContainer>
		</div>
	);
}

export default Cart;
