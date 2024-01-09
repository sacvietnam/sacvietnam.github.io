import MainLayout from "../../layouts/MainLayout";
import ErrorSVG from "./error.svg?react";
import TCButton from "../../components/TCButton";
import { useNavigate } from "react-router-dom";

const Error = () => {
	const navigate = useNavigate();

	const handleBackToHome = () => {
		navigate("/");
	};

	return (
		<MainLayout>
			<div className="flex flex-col items-center justify-center w-full h-full max-w-screen-xl max-h-screen gap-8 p-6 mx-auto">
				<ErrorSVG width={250} height={300} />
				<div className="flex flex-col items-center gap-4">
					<p className="text-xl text-primary md:text-3xl">Page not found</p>
					<TCButton label="Back to Home" onPress={handleBackToHome} />
				</div>
			</div>
		</MainLayout>
	);
};

export default Error;
