import { useEffect, useState } from "react";
const useMobile = (): boolean => {
	const [isMobile, setMobile] = useState(() => {
		return window.innerWidth <= 768;
	});

	useEffect(() => {
		window.addEventListener("resize", () => {
			setMobile(window.innerWidth <= 768);
		});
	}, []);

	return isMobile;
};

export default useMobile;
