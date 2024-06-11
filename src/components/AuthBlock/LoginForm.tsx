import { Button, Form, FormProps, Input } from "antd";
import { useContext, useRef } from "react";
import { LangContext } from "../../contexts/LangContext";
import LocalStorageHandler from "../../util/localStorage/LocalStorageHandler";
import { LoginFieldType } from "./LoginSignUpModal";

const onFinishFailed: FormProps<LoginFieldType>["onFinishFailed"] = (
  errorInfo,
) => {
  console.log("Failed:", errorInfo);
};

function LoginForm({
  onLogin,
  changeToSignUp,
}: {
  onLogin: (values: LoginFieldType) => void;
  changeToSignUp: () => void;
}) {
  const { trans } = useContext(LangContext);
  const localLoginForm = useRef(
    LocalStorageHandler.getItem<LoginFieldType>("LOGIN_FORM"),
  )?.current;
  return (
    <div className="w-full max-w-full p-8 ">
      <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        className="w-full"
        onFinish={onLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item<LoginFieldType>
          label={trans({ en: "Phone number", vi: "Số điện thoại" })}
          name="phone"
          initialValue={localLoginForm?.phone}
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

        <Form.Item<LoginFieldType>
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
        <Form.Item>
          <Button
            block
            type="primary"
            className="mt-2 bg-primary"
            htmlType="submit"
            size="large"
          >
            {trans({ en: "Login", vi: "Đăng nhập" })}
          </Button>
          <Button type="link" block className="mt-2" onClick={changeToSignUp}>
            {trans({
              en: "Have not account yet? Sign up now!",
              vi: "Chưa có tài khoản? Đăng ký ngay!",
            })}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
