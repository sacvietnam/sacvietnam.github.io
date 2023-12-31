import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }: { children: React.ReactElement }) => {
	return (
		<div>
			<Header />
			<main className="container mx-auto">{children}</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
