import ProductDesc from "../../components/ProductDesc";
import Application from "./Application";
import Features from "./Features";
import ProductBanner from "./ProductBanner";

const Product = () => {
  return (
    <div className="pb-32">
      <ProductBanner />
      <div className="max-w-screen-xl mx-auto">
        <ProductDesc />
      </div>

      <div className="my-32">
        <Features />
      </div>

      <Application />
    </div>
  );
};

export default Product;
