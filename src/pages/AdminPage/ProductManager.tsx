import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { LangContext } from "../../contexts/LangContext";
import { Button, Popconfirm, Space, TableProps, message } from "antd";
import { MdEdit } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import Formatter from "../../util/format/Formatter";
import { AdminFunctionIndex } from ".";
import TableDataManager from "../../components/TableDataManager";
import {
  getAllProducts,
  getProductSize,
  softDeleteProduct,
} from "../../services/productService";

const pageSize = 10;

const columns: TableProps<IProduct>["columns"] = [
  {
    title: "Thumbnail Image",
    dataIndex: "images",
    key: "images",
    render: (images) => (
      <img src={images[0]} alt="thumbnail" style={{ width: "100px" }} />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => Formatter.toVND(price),
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    render: (discount: Discount) => {
      if (discount.type === "percent") {
        return `${discount.value}%`;
      }
      return Formatter.toVND(discount.value);
    },
  },
  {
    title: "Inventory",
    dataIndex: "inventory",
    key: "inventory",
  },
];

const ProductManager = ({
  changeFunction,
  setId,
}: {
  setId: React.Dispatch<React.SetStateAction<string>>;
  changeFunction(index: AdminFunctionIndex): void;
}) => {
  const { trans } = useContext(LangContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, contextHolder] = message.useMessage();
  const [rerender, setRerender] = useState<boolean>(false);
  const { data: total } = useQuery({
    queryKey: ["productSize"],
    queryFn: getProductSize,
  });

  const handleOK = async (id: string) => {
    const isCompleted = await softDeleteProduct(id);
    if (isCompleted) {
      message.success("Delete product successfully");
      handleRerender();
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
  };

  const handleRerender = () => {
    setRerender((prev) => !prev);
  };

  const columnsWithAction: TableProps<IProduct>["columns"] = [
    ...columns,
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<MdEdit />}
            onClick={() => {
              setId(record._id);
              changeFunction("EDIT_PRODUCT");
            }}
          ></Button>
          <Popconfirm
            title="Delete Product?"
            description={trans({
              en: "Are you sure to delete this Product? (It can recover later)",
              vi: "Bạn có chắc chắn muốn xóa Sản phẩm này không? (Có thể khôi phục sau này)",
            })}
            onConfirm={() => handleOK(record._id)}
            onCancel={handleCancel}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button icon={<BsTrash3Fill />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div key={JSON.stringify(rerender)}>
        <TableDataManager<IProduct>
          currentPage={currentPage}
          pageSize={pageSize}
          setPage={setCurrentPage}
          total={total || 0}
          queryFn={getAllProducts}
          queryKey="products"
          columns={columnsWithAction}
          footer={
            <div className="grid place-items-end">
              <Button
                icon={<BsTrash3Fill />}
                type="dashed"
                onClick={() => changeFunction("PRODUCT_RECYCLE_BIN")}
              >
                {trans({
                  en: "Recover deleted products",
                  vi: "Khôi phục sản phẩm đã xóa",
                })}
              </Button>
            </div>
          }
        />
      </div>
    </>
  );
};

export default ProductManager;
