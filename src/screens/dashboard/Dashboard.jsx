import React from "react";
import "./dashboard.css";
import Sidebar from "../../components/Sidebar";
import { Route, Switch, useLocation } from "react-router-dom";
import Main from "../../components/Main";
import Users from "../../components/Users";
import UserForm from "../../components/UserForm";
import Categories from "../../components/Categories";
import Products from "../../components/Products";
import Transactions from "../../components/Transactions";
import Reports from "../../components/Reports";
import Header from "../../components/Header";
import { Container, Button } from "@material-ui/core";

function Dashboard(props) {
	let basePath = props.match.path;

	return (
		<div class="m-dashboard">
			<div className="sidebar-wrapper">
				<Sidebar />
			</div>
			<div className="main-area">
				<Header />
				<div className="inner-main-area">
					<Container>
						<Switch>
							<Route path={`${basePath}/main`} component={Main} />
							<Route exact path={`${basePath}/users`} component={Users} />
							<Route
								exact
								path={`${basePath}/users/new`}
								component={UserForm}
							/>
							<Route path={`${basePath}/categories`} component={Categories} />
							<Route path={`${basePath}/products`} component={Products} />
							<Route
								path={`${basePath}/transactions`}
								component={Transactions}
							/>
							<Route path={`${basePath}/reports`} component={Reports} />
						</Switch>
					</Container>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
