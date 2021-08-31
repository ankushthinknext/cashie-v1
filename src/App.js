import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./screens/dashboard/Dashboard";
import { Route } from "react-router-dom";

function App() {
	return (
		<div>
			<Route path="/dashboard" component={Dashboard} />
		</div>
	);
}

export default App;
