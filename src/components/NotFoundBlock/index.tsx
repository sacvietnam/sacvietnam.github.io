import ErrorSVG from "./error.svg?react";
import TCButton from "../../components/TCButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
const NotFoundBlock = () => {
  const navigate = useNavigate();
  const { trans } = useContext(LangContext);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-screen-xl max-h-screen gap-8 p-6 mx-auto">
      <ErrorSVG width={250} height={300} />
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl text-primary md:text-3xl">
          {trans({
            en: "404 - I can’t find what you’re looking for. ",
            vi: "404 - Tôi không tìm thấy thứ mà bạn tìm.",
          })}
        </p>
        <TCButton label="Back to Home" onPress={handleBackToHome} />
      </div>
    </div>
  );
};

export default NotFoundBlock;
