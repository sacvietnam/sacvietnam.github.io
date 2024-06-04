import ProductDesc from "../../components/ProductDesc";
import Application from "./Application";
import Features from "./Features";
import ProductBanner from "./ProductBanner";

const Product = () => {
  return (
    <>
      <ProductBanner />
      <div className="max-w-screen-xl mx-auto">
        <ProductDesc />
      </div>

      <Features />

      <Application />
    </>
  );
};

export default Product;
