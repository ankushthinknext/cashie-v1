import React, { useContext } from "react";
import { CartContext } from "../App";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { Typography } from "@material-ui/core";

function Cart() {
	let cartData = useContext(CartContext);
	console.log(cartData);
	return (
		<div>
			<TableContainer>
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

						<TableCell>{item.price * item.qty}</TableCell>
					</TableRow>
				))}
			</TableContainer>
		</div>
	);
}

export default Cart;
