import { Button, message } from "antd";
import { GlobalContext, UserData } from "../../contexts/GlobalContext";
import { logout } from "../../services/authService";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";

const LoginUser = (user: UserData) => {
	const { setUser } = useContext(GlobalContext);
	const { trans } = useContext(LangContext);
	const [, contextHolder] = message.useMessage();
	const handleLogout = () => {
		logout(setUser);
		message.info("Đăng xuất thành công");
	};
	return (
		<>
			{contextHolder}
			<div className="mx-2 sticky z-20 max-w-screen-md p-2 px-4 md:mx-auto  mt-8 bg-white border rounded-lg top-[4.2rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60">
				<div className="flex items-center justify-between">
					<span>
						👋 {trans({ en: "Hello", vi: "Xin chào" })}, <b>{user.name}</b>
					</span>
					<div>
						<Button type="text" onClick={handleLogout}>
							<span className="underline" >{trans({ en: "Logout", vi: "Đăng xuất" })}</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginUser;
