import { useContext, useState } from "react";
import { LangContext } from "../../contexts/LangContext";
import type { FormProps } from "antd";
import { Button, message } from "antd";
import { login, register } from "../../services/authService";
import { GlobalContext } from "../../contexts/GlobalContext";
import LoginUser from "./LoginUser";
import LocalStorageHandler from "../../util/LocalStorageHandler";
import LoginModal from "./LoginModal";
import { IAccount } from "../../models/DataModel";
import SignUpModal from "./SignUpModal";
import { AxiosError } from "axios";
type FieldType = {
	username: string;
	password: string;
};

const AccountBar = () => {
	const { trans } = useContext(LangContext);
	const { user, setUser } = useContext(GlobalContext);
	const [isLoginOpen, setLoginOpen] = useState<boolean>(false);
	const [isSignupOpen, setSignupOpen] = useState<boolean>(false);
	const [, contextHolder] = message.useMessage();

	// Login Logic
	const showLoginModal = () => {
		setLoginOpen(true);
	};

	const handleLoginCancel = () => {
		setLoginOpen(false);
	};

	const handleLoginFinish: FormProps<FieldType>["onFinish"] = async (
		values
	) => {
		try {
			const data = await login(values, setUser);
			if (data) {
				message.success(
					trans({ en: "Login successfully", vi: "Đăng nhập thành công" })
				);
				LocalStorageHandler.setItem("LOGIN_FORM", values);
			}
			setLoginOpen(false);
		} catch (err) {
			console.log((err as AxiosError).response?.status);
			switch ((err as AxiosError).response?.status) {
				case 401:
					message.error(
						trans({
							en: "Please check your username & password",
							vi: "Hãy kiểm tra lại tên đăng nhập & mật khẩu của bạn",
						})
					);
					break;
				default:
					message.error(
						trans({ en: "Login failed", vi: "Đăng nhập thất bại" })
					);
			}
		}
	};

	// Sign up Logic
	const showSignupModal = () => {
		setSignupOpen(true);
	};
	const handleSignupCancel = () => {
		setSignupOpen(false);
	};
	const handleSignupFinish: FormProps<FieldType>["onFinish"] = async (
		values
	) => {
		try {
			const inputs = values as IAccount;
			await register(inputs);
			message.success(
				trans({ en: "Sign up successfully", vi: "Đăng ký thành công" })
			);
			setSignupOpen(false);
			setLoginOpen(true);
		} catch (err) {
			switch ((err as AxiosError).response?.status) {
				case 500:
					message.warning(
						trans({
							en: "Username is already taken",
							vi: "Tên tài khoản đã tồn tại",
						})
					);
					break;
				case 400:
					message.warning(
						trans({
							en: "Please fill all required fields",
							vi: "Hãy điền đầy đủ thông tin",
						})
					);
					break;
				default:
					message.error(
						trans({ en: "Sign up failed", vi: "Đăng ký thất bại" })
					);
			}
		}
	};

	if (!user)
		return (
			<>
				{contextHolder}
				<div className="mx-2 sticky z-20 max-w-screen-md p-2 px-4 md:mx-auto mt-8 bg-white border rounded-lg top-[4.2rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60">
					<div className="flex flex-col items-center gap-2 md:justify-between md:flex-row">
						<i className="text-xs md:text-sm">
							{trans({
								en: "To be able to place an order, you need to create an account!",
								vi: "Để có thể đặt mua hàng, bạn phải tạo một tài khoản nhé!",
							})}
						</i>
						<div className="flex gap-2">
							<Button
								type="primary"
								className="bg-primary"
								onClick={showLoginModal}
							>
								{trans({ en: "Login", vi: "Đăng nhập" })}
							</Button>
							<Button onClick={showSignupModal}>
								{trans({ en: "Sign up", vi: "Đăng ký" })}
							</Button>
						</div>
					</div>
				</div>

				{/* Login modal */}
				<LoginModal
					isOpen={isLoginOpen}
					onCancle={handleLoginCancel}
					onSubmit={handleLoginFinish}
				/>

				<SignUpModal
					isOpen={isSignupOpen}
					onCancle={handleSignupCancel}
					onSubmit={handleSignupFinish}
				/>
			</>
		);

	return <LoginUser {...user} />;
};

export default AccountBar;
