import { useContext, useRef } from "react";
import { LangContext } from "../../contexts/LangContext";
import type { FormProps } from "antd";
import { Button, Modal, Form, Input } from "antd";
import LocalStorageHandler from "../../util/localStorage/LocalStorageHandler";
type FieldType = {
	username: string;
	password: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

type LoginModalProps = {
	isOpen: boolean;
	onCancle: () => void;
	onSubmit: (values: FieldType) => void;
};

const LoginModal = ({ onCancle, onSubmit, isOpen }: LoginModalProps) => {
	const { trans } = useContext(LangContext);
	const localLoginForm = useRef(
		LocalStorageHandler.getItem<FieldType>("LOGIN_FORM")
	)?.current;

	return (
		<Modal
			title={trans({ en: "Login", vi: "Đăng nhập" })}
			open={isOpen}
			footer={null}
			onCancel={onCancle}
		>
			<Form
				name="login"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onSubmit}
				onFinishFailed={onFinishFailed}
				autoComplete="on"
			>
				<Form.Item<FieldType>
					label={trans({ en: "Username", vi: "Tên tài khoản" })}
					name="username"
					initialValue={localLoginForm?.username}
					rules={[
						{
							required: true,
							message: trans({
								en: "Please input your username",
								vi: "Hãy nhập tên tài khoản của bạn",
							}),
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label={trans({ en: "Password", vi: "Mật khẩu" })}
					initialValue={localLoginForm?.password}
					name="password"
					rules={[
						{
							required: true,
							message: trans({
								en: "Please input your password",
								vi: "Hãy nhập mật khẩu của bạn",
							}),
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 4, span: 24 }}>
					<div className="flex items-end justify-end gap-2 mr-16 md:mr-0">
						<Button
							type="primary"
							className="mt-2 bg-primary"
							htmlType="submit"
						>
							{trans({ en: "Login", vi: "Đăng nhập" })}
						</Button>
						<Button
							type="text"
							className="mt-2"
							htmlType="submit"
							onClick={(e) => {
								e.preventDefault();
								onCancle();
							}}
						>
							{trans({ en: "Back", vi: "Quay lại" })}
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default LoginModal;
