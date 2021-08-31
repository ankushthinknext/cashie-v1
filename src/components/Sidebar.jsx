import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import CategoryIcon from "@material-ui/icons/Category";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import ReceiptIcon from "@material-ui/icons/Receipt";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
	let path = useLocation().pathname;
	path = `/${path.split("/")[2]}`;

	const links = [
		{
			id: 1,
			label: "Dashboard",
			icon: <HomeIcon />,
			class: "sidebar-link ",
			path: "/main",
			permission: ["admin"],
		},
		{
			id: 2,
			label: "Users",
			icon: <GroupIcon />,
			class: "sidebar-link ",
			path: "/users",
			permission: ["admin"],
		},
		{
			id: 3,
			label: "Categories",
			icon: <CategoryIcon />,
			class: "sidebar-link",
			path: "/categories",
			permission: ["admin"],
		},
		{
			id: 4,
			label: "Products",
			icon: <ViewQuiltIcon />,
			class: "sidebar-link",
			path: "/products",
			permission: ["admin"],
		},
		{
			id: 5,
			label: "Transactions",
			icon: <ReceiptIcon />,
			class: "sidebar-link",
			path: "/transactions",
			permission: ["admin"],
		},
		{
			id: 6,
			label: "Reports",
			icon: <EqualizerIcon />,
			class: "sidebar-link",
			path: "/reports",
			permission: ["admin"],
		},
	];
	return (
		<div className="sidebar">
			{links.map((link) => (
				<Link key={link.id} to={`/dashboard${link.path}`}>
					<div
						className={`${link.class} ${link.path === path ? "active" : ""}`}>
						{link.icon}
						<h5>{link.label}</h5>
					</div>
				</Link>
			))}
		</div>
	);
}

export default Sidebar;
