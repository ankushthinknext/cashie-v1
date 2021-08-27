import React from "react";
import HomeIcon from "@material-ui/icons/Home";

function Sidebar() {
	const links = [
		{
			id: 1,
			label: "Dashboard",
			icon: <HomeIcon />,
			class: "sidebar-link",
			path: "/dashboard",
			permission: ["admin"],
		},
		{
			id: 1,
			label: "Users",
			icon: <HomeIcon />,
			class: "sidebar-link",
			path: "/dashboard",
			permission: ["admin"],
		},
		{
			id: 1,
			label: "Categories",
			icon: <HomeIcon />,
			class: "sidebar-link",
			path: "/dashboard",
			permission: ["admin"],
		},
		{
			id: 1,
			label: "Products",
			icon: <HomeIcon />,
			class: "sidebar-link",
			path: "/dashboard",
			permission: ["admin"],
		},
		{
			id: 1,
			label: "Transactions",
			icon: <HomeIcon />,
			class: "sidebar-link",
			path: "/dashboard",
			permission: ["admin"],
		},
		{
			id: 1,
			label: "Reports",
			icon: <HomeIcon />,
			class: "sidebar-link",
			path: "/dashboard",
			permission: ["admin"],
		},
	];
	return (
		<div className="sidebar">
			{links.map((link) => (
				<div className={link.class}>
					{link.icon}
					<h5>{link.label}</h5>
				</div>
			))}
		</div>
	);
}

export default Sidebar;
