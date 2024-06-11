import type { FormProps, MenuProps } from "antd";
import { Badge, Button, Dropdown, message } from "antd";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaCode } from "react-icons/fa6";
import { LiaUser } from "react-icons/lia";
import { LuDoorOpen } from "react-icons/lu";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { LangContext } from "../../contexts/LangContext";
import { login, logout, register } from "../../services/authService";
import LocalStorageHandler from "../../util/localStorage/LocalStorageHandler";
import LoginSignUpModal, {
  LoginFieldType,
  LoginSignUpViewType,
} from "./LoginSignUpModal";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../contexts/CartContext";

const AuthBlock = () => {
  const { trans } = useContext(LangContext);
  const { user, setUser } = useContext(GlobalContext);
  const [, contextHolder] = message.useMessage();
  const [isOpen, setOpen] = useState(false);
  const [type, setType] = useState<LoginSignUpViewType>("Login");
  const { cart } = useContext(CartContext);

  // Login Logic
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showLoginModal = () => {
    setType("Login");
    showModal();
  };

  const showSignupModal = () => {
    setType("Signup");
    showModal();
  };

  const handleLoginFinish: FormProps<LoginFieldType>["onFinish"] = async (
    values,
  ) => {
    try {
      const data = await login(values, setUser);
      if (data) {
        message.success(
          trans({ en: "Login successfully", vi: "Đăng nhập thành công" }),
        );
        LocalStorageHandler.setItem("LOGIN_FORM", values);
      }
      hideModal();
    } catch (err) {
      console.log((err as AxiosError).response?.status);
      switch ((err as AxiosError).response?.status) {
        case 401:
          message.error(
            trans({
              en: "Please check your username & password",
              vi: "Hãy kiểm tra lại tên đăng nhập & mật khẩu của bạn",
            }),
          );
          break;
        default:
          message.error(
            trans({ en: "Login failed", vi: "Đăng nhập thất bại" }),
          );
      }
    }
  };

  const handleSignupFinish: FormProps<LoginFieldType>["onFinish"] = async (
    values,
  ) => {
    try {
      const inputs = values as IAccount;
      await register(inputs);
      message.success(
        trans({ en: "Sign up successfully", vi: "Đăng ký thành công" }),
      );
      setType("Login");
    } catch (err) {
      const axiosErr = err as AxiosError;
      switch (axiosErr.response?.status) {
        case 500:
          message.warning(
            trans({
              en: "An error occurred, please try again later",
              vi: "Đã xảy ra lỗi, vui lòng thử lại sau",
            }),
          );
          break;
        case 400:
          message.error(
            trans({
              en: "This phone number is already in use",
              vi: "Số điện thoại này đã được sử dụng",
            }),
          );
          break;
        default:
          message.error(
            trans({ en: "Sign up failed", vi: "Đăng ký thất bại" }),
          );
      }
    }
  };

  const handleLogout = () => {
    logout(setUser);
    message.info("Đăng xuất thành công");
  };

  /**
   * Menu items
   */
  let items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Link to="/profile" rel="noopener noreferrer">
          {trans({ en: "Your infomation", vi: "Thông tin của bạn" })}
        </Link>
      ),
      icon: <LiaUser />,
    },
    {
      key: "cart",
      label: (
        <Link to="/order/cart"> {trans({ en: "Cart", vi: "Giỏ hàng" })}</Link>
      ),
      icon: <CiShoppingCart />,
    },
    {
      key: "divider1",
      type: "divider",
    },
    {
      key: "logout",
      dashed: true,
      label: <u>{trans({ en: "Log out", vi: "Đăng xuất" })}</u>,
      icon: <LuDoorOpen />,
      onClick: handleLogout,
    },
  ];

  if (user?.role === "admin") {
    items = [
      {
        key: "admin",
        label: (
          <Link to="/admin" rel="noopener noreferrer">
            {trans({ en: "Admin Page", vi: "Trang Admin" })}
          </Link>
        ),
        icon: <FaCode />,
      },
      {
        key: "divider_admin",
        type: "divider",
      },
      ...items,
    ];
  }

  if (!user)
    return (
      <div>
        {contextHolder}
        <div className="sticky z-20 w-fit rounded-lg top-[4.2rem] ">
          <div className="flex gap-2">
            <Button
              onClick={showSignupModal}
              type="default"
              className="bg-white"
            >
              {trans({ en: "Sign up", vi: "Đăng ký" })}
            </Button>
            <Button
              type="primary"
              className="bg-primary"
              onClick={showLoginModal}
            >
              {trans({ en: "Login", vi: "Đăng nhập" })}
            </Button>
          </div>
        </div>

        {/* Login modal */}
        <LoginSignUpModal
          open={isOpen}
          view={type}
          setView={setType}
          onClose={hideModal}
          onLogin={handleLoginFinish}
          onSignUp={handleSignupFinish}
        />
      </div>
    );

  return (
    <div className="flex flex-col items-end gap-3 md:items-center md:flex-row">
      <Badge count={cart.reduce((sum, item) => sum + item.quantity, 0)}>
        <Link to={"/order/cart"}>
          <Button
            type="dashed"
            size="middle"
            shape="round"
            className="bg-white"
            icon={<ShoppingCartOutlined />}
          ></Button>
        </Link>
      </Badge>
      <Dropdown
        menu={{ items }}
        trigger={["hover", "click"]}
        className="text-sm bg-white cursor-pointer"
      >
        <Button type="default">{user.name}</Button>
      </Dropdown>
    </div>
  );
};

export default AuthBlock;
