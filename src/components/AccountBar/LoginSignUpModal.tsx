import { Modal, Segmented } from "antd";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import sacLogo from "../../assets/imgs/logo/saco.png";

export type LoginFieldType = {
  username: string;
  password: string;
};

export type SignUpFieldType = {
  username: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  gender: "male" | "female" | "other";
};
export type LoginSignUpViewType = "Login" | "Signup";

type LoginSignUpModalProps = {
  open: boolean;
  view: LoginSignUpViewType;
  setView: (view: LoginSignUpViewType) => void;
  onLogin: (values: LoginFieldType) => void;
  onSignUp: (values: SignUpFieldType) => void;
  onClose: () => void;
};

const LoginSignUpModal = ({
  open,
  view,
  onLogin,
  onSignUp,
  onClose,
  setView,
}: LoginSignUpModalProps) => {
  const { trans } = useContext(LangContext);
  return (
    <Modal
      title={
        <h2 className="text-center font-display text-primary">
          {trans(
            view === "Login"
              ? { en: "Login", vi: "Đăng nhập" }
              : { en: "Sign Up", vi: "Đăng ký" },
          )}
        </h2>
      }
      open={open}
      footer={null}
      onCancel={onClose}
    >
      <Segmented
        options={["Login", "Signup"]}
        value={view}
        block
        onChange={setView}
      />

      <div className="flex gap-2 mt-4 justify-evenly">
        <img
          src={sacLogo}
          alt="sacLogo"
          className="object-contain w-[100px] select-none"
        />
      </div>

      {view === "Login" ? (
        <LoginForm onLogin={onLogin} changeToSignUp={() => setView("Signup")} />
      ) : (
        <SignUpForm
          onSignUp={onSignUp}
          changeToLogin={() => setView("Login")}
        />
      )}
    </Modal>
  );
};

export default LoginSignUpModal;
