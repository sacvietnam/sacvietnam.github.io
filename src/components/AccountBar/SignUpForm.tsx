import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import type { FormProps } from "antd";
import { Button, Form, Input, Radio } from "antd";
import { SignUpFieldType } from "./LoginSignUpModal";

const onFinishFailed: FormProps<SignUpFieldType>["onFinishFailed"] = (
  errorInfo,
) => {
  console.log("Failed:", errorInfo);
};

function SignUpForm({
  onSignUp,
  changeToLogin,
}: {
  onSignUp: (values: SignUpFieldType) => void;
  changeToLogin: () => void;
}) {
  const { trans } = useContext(LangContext);
  return (
    <div className="w-full max-w-full p-8">
      <Form
        name="signup"
        layout="vertical"
        onFinish={onSignUp}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<SignUpFieldType>
          label={trans({ en: "Username", vi: "Tên đăng nhập" })}
          name="username"
          rules={[
            {
              required: true,
              message: trans({
                en: "Please input your username",
                vi: "Hãy nhập tên đăng nhập của bạn",
              }),
            },
            {
              pattern: /^[a-zA-Z0-9]{6,20}$/,
              message: trans({
                en: "Username must be 6-20 characters long, no special characters",
                vi: "Tên đăng nhập phải từ 6-20 ký tự, không chứa ký tự đặc biệt",
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignUpFieldType>
          label={trans({ en: "Password", vi: "Mật khẩu" })}
          name="password"
          rules={[
            {
              required: true,
              message: trans({
                en: "Please input your password",
                vi: "Hãy nhập mật khẩu của bạn",
              }),
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,24}$/,
              message: trans({
                en: "Password must be 8-24 characters long, contain at least 1 uppercase letter, 1 lowercase letter and 1 number",
                vi: "Mật khẩu phải từ 8-24 ký tự, chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
              }),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<SignUpFieldType>
          label={trans({ en: "Full name", vi: "Tên của bạn" })}
          name="name"
          rules={[
            {
              required: true,
              message: trans({
                en: "Please input your name",
                vi: "Hãy nhập tên của bạn",
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignUpFieldType>
          label={trans({ en: "Phone number", vi: "Số điện thoại" })}
          name="phone"
          rules={[
            {
              required: true,
              message: trans({
                en: "Please input your phone number",
                vi: "Hãy nhập số điện thoại của bạn",
              }),
            },

            {
              pattern: /^[0-9]{10}$/,
              message: trans({
                en: "Please input a valid phone number",
                vi: "Hãy nhập số điện thoại hợp lệ",
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignUpFieldType>
          name="gender"
          initialValue={"male"}
          label={trans({ en: "Gender", vi: "Giới tính" })}
          rules={[{ required: true }]}
        >
          <Radio.Group defaultValue={"male"} className="flex justify-evenly">
            <Radio value={"male"}>{trans({ en: "Male", vi: "Nam" })}</Radio>
            <Radio value={"female"}>{trans({ en: "Female", vi: "Nữ" })}</Radio>
            <Radio value={"other"}>{trans({ en: "Other", vi: "Khác" })}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            className="mt-2 bg-primary"
            htmlType="submit"
            size="large"
            block
          >
            {trans({ en: "Sign up", vi: "Đăng ký tài khoản" })}
          </Button>
          <Button type="link" className="mt-2" block onClick={changeToLogin}>
            {trans({
              en: "Already have an account? Login now!",
              vi: "Đã có tài khoản? Đăng nhập ngay!",
            })}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUpForm;
