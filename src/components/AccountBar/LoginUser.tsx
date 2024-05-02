import { Button, message } from "antd";
import { GlobalContext, UserData } from "../../contexts/GlobalContext";
import { logout } from "../../services/authService";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
			<div className="mx-4 sticky z-20 max-w-screen-md p-2 px-4 lg:mx-auto mt-8 bg-white border rounded-lg top-[4.2rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60">
				<div className="flex flex-col items-center justify-between gap-2 md:flex-row">
					<span>
						👋 {trans({ en: "Hello", vi: "Xin chào" })}, <b>{user.name}</b>
					</span>
					<div>
						<Link to={"/order/cart"}>
							<Button
								type="primary"
								shape="round"
								className="bg-primary"
								icon={<ShoppingCartOutlined />}
							>
								{trans({ en: "Cart", vi: "Giỏ hàng" })}
							</Button>
						</Link>
						<Button type="text" onClick={handleLogout}>
							<span className="underline">
								{trans({ en: "Logout", vi: "Đăng xuất" })}
							</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginUser;
