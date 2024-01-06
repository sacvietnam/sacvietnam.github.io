import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToTopButton from "../components/ToTopButton";
import ScrollProgressBar from "../components/ScrollProgressBar";

const MainLayout = ({ children }: { children: React.ReactElement }) => {
	// Scroll to top
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [children]);

	return (
		<div className="text-text">
			<Header />
			<main className="container mx-auto min-h-lvh">{children}</main>
			<Footer />
			<ToTopButton />
			<ScrollProgressBar/>
		</div>
	);
};

export default MainLayout;
