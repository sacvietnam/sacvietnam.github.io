import { Link } from "react-router-dom";
import sacLogoSrc from "../../assets/imgs/logo/saco.png";

const Logo = () => {
  // const [isShow, setShow] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-between w-full md:w-fit">
      <Link
        className="flex items-center justify-between gap-4 select-none"
        to="/"
      >
        <img width={100} height={50} src={sacLogoSrc} alt="SAC logo" />
      </Link>
    </div>
  );
};

export default Logo;
