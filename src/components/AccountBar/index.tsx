import type { FormProps, MenuProps } from "antd";
import { Button, Dropdown, message } from "antd";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { FaCode } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { CiShoppingCart } from "react-icons/ci";
import { LuDoorOpen } from "react-icons/lu";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { LangContext } from "../../contexts/LangContext";
import { login, logout, register } from "../../services/authService";
import LocalStorageHandler from "../../util/localStorage/LocalStorageHandler";
import LoginSignUpModal, { LoginSignUpViewType } from "./LoginSignUpModal";

export type LoginFieldType = {
  username: string;
  password: string;
};

const AccountBar = () => {
  const { trans } = useContext(LangContext);
  const { user, setUser } = useContext(GlobalContext);
  const [, contextHolder] = message.useMessage();
  const [isOpen, setOpen] = useState(false);
  const [type, setType] = useState<LoginSignUpViewType>("Login");

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
    } catch (err) {
      switch ((err as AxiosError).response?.status) {
        case 500:
          message.warning(
            trans({
              en: "Username is already taken",
              vi: "Tên tài khoản đã tồn tại",
            }),
          );
          break;
        case 400:
          message.warning(
            trans({
              en: "Please fill all required fields",
              vi: "Hãy điền đầy đủ thông tin",
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
      disabled: true,
    },
    {
      key: "setting",
      label: trans({ en: "Setting", vi: "Cài đặt" }),
      icon: <IoSettingsOutline />,
      disabled: true,
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
    <Dropdown
      menu={{ items }}
      trigger={["hover", "click"]}
      className="text-sm bg-white cursor-pointer"
    >
      <Button type="default">{user.name}</Button>
    </Dropdown>
  );
};

export default AccountBar;
