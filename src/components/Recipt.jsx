import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	DialogContentText,
	Typography,
	Table,
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import moment from "moment";

function Recipt({ isOpen, onClickOpen, onClose, receiptData }) {
	return (
		<div>
			<Dialog
				open={isOpen}
				onClose={onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					<Typography variant="h4" align="center" gutterBottom>
						Receipt
					</Typography>
					<Typography
						variant="caption"
						align="center"
						display="block"
						gutterBottom>
						{moment(receiptData && receiptData.createdAt).format("llll")}
					</Typography>
					<Typography
						variant="caption"
						align="center"
						display="block"
						gutterBottom>
						{receiptData && receiptData._id}
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Product</TableCell>
										<TableCell>Qty</TableCell>
										<TableCell>Unit Price</TableCell>

										<TableCell>Total</TableCell>
									</TableRow>
								</TableHead>
								{receiptData &&
									receiptData.products.map((item) => (
										<TableRow>
											<TableCell>{item.name}</TableCell>
											<TableCell>{item.price}</TableCell>
											<TableCell>{item.qty}</TableCell>

											<TableCell>
												{(item.price * item.qty).toFixed(2)}
											</TableCell>
										</TableRow>
									))}
							</Table>
							{receiptData && (
								<Table style={{ marginTop: "30px" }}>
									<TableRow>
										<TableCell>Subtotal</TableCell>

										<TableCell align="right">
											{receiptData.subtotal.toFixed(2)}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Tax</TableCell>

										<TableCell align="right">
											{receiptData.discount.toFixed(2)}
										</TableCell>
									</TableRow>

									<TableRow>
										<TableCell>GrandTotal</TableCell>

										<TableCell align="right">
											{receiptData.grandtotal.toFixed(2)}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="right">
											<Button
												size="large"
												variant="contained"
												className="c-btn">
												Print
											</Button>
										</TableCell>
									</TableRow>
								</Table>
							)}
						</TableContainer>
					</DialogContentText>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>
		</div>
	);
}

export default Recipt;
