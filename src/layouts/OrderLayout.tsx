import MainLayout from "./MainLayout";
import AccountBar from "../components/AccountBar";

const OrderLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <MainLayout>
      <>
        <AccountBar />
        {children}
      </>
    </MainLayout>
  );
};

export default OrderLayout;
