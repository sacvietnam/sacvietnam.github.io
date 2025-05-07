import { useContext } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { LangContext } from "../../contexts/LangContext";
import { GrContactInfo } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import NotFoundBlock from "../../components/NotFoundBlock";

type MenuItem = Required<MenuProps>["items"][number];

const Profile = () => {
  // const { user } = useContext(GlobalContext);
  const { trans } = useContext(LangContext);
  const items: MenuItem[] = [
    {
      key: "profile",
      icon: <GrContactInfo />,
      label: trans({ en: "Profile", vi: "Thông tin cá nhân" }),
    },
    {
      key: "address",
      icon: <IoLocationOutline />,
      label: trans({ en: "Address book", vi: "Sổ địa chỉ" }),
    },
    {
      key: "order",
      label: trans({ en: "My Order", vi: "Đơn hàng của tôi" }),
      icon: <FiShoppingCart />,
      children: [
        {
          key: "order-all",
          label: trans({ en: "All order", vi: "Tất cả hóa đơn" }),
        },
        {
          key: "order-shipping",
          label: trans({ en: "Shipping", vi: "Đang giao" }),
        },
        {
          key: "order-return-cancel",
          label: trans({
            en: "Return & Cancel order",
            vi: "Đơn đổi trả & Hủy",
          }),
        },
      ],
    },
  ];

  return (
    <div className="max-w-screen-xl min-h-screen px-2 py-4 mx-auto">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <Menu
            defaultSelectedKeys={["profile"]}
            mode="horizontal"
            items={items}
            onChange={(e) => console.log(e)}
          />
          <NotFoundBlock />
        </div>
      </div>
    </div>
  );
};

export default Profile;
