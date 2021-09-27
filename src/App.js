import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import Dashboard from "./screens/dashboard/Dashboard";
import { Route } from "react-router-dom";
import TestPersons from "./components/TestPersons";
export const CartContext = React.createContext();

function App() {
	const [cartItems, setCartItems] = useState([]);

	const addItem = (item) => {
		let index = cartItems.findIndex((el) => item._id == el._id);
		if (index >= 0) {
			setCartItems([...cartItems.filter((el, i) => i !== index)]);
		} else {
			item.qty = 1;
			setCartItems([...cartItems, item]);
		}
	};

	const increment = (id) => {
		let index = cartItems.findIndex((el) => id == el._id);
		let newItems = [...cartItems];
		newItems[index].qty++;
		setCartItems(newItems);
	};

	const decrement = (id) => {
		let index = cartItems.findIndex((el) => id == el._id);
		let newItems = [...cartItems];
		if (newItems[index].qty == 1) {
			newItems.splice(index, 1);
		} else {
			newItems[index].qty--;
		}
		setCartItems(newItems);
	};

	const removeItem = (id) => {};

	return (
		<CartContext.Provider
			value={{ cartItems, addItem, removeItem, increment, decrement }}>
			<Route path="/test" component={TestPersons} />
			<Route path="/dashboard" component={Dashboard} />
		</CartContext.Provider>
	);
}

export default App;
