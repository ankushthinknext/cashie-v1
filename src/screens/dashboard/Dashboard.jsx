import React from "react";
import "./dashboard.css";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
	return (
		<div class="m-dashboard">
			<div className="sidebar-wrapper">
				<Sidebar />
			</div>
			<div className="main-area"></div>
		</div>
	);
}

export default Dashboard;
