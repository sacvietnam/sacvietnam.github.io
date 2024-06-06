import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { LangContext } from "../../contexts/LangContext";
import { Button, Popconfirm, Space, TableProps, message } from "antd";
import { BsTrash3Fill } from "react-icons/bs";
import { TbRestore } from "react-icons/tb";

import Formatter from "../../util/format/Formatter";
import TableDataManager from "../../components/TableDataManager";
import {
  getDeletedProductSize,
  getDeletedProducts,
  hardDeleteProduct,
  restoreDeletedProduct,
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

const ProductRecycleBin = () => {
  const { trans } = useContext(LangContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, contextHolder] = message.useMessage();
  const [rerender, setRerender] = useState<boolean>(false);

  const { data: total } = useQuery({
    queryKey: ["deletedProductSize"],
    queryFn: getDeletedProductSize,
  });

  const handleHardDelete = async (id: string) => {
    const isCompleted = await hardDeleteProduct(id);
    if (isCompleted) {
      message.success("Delete article successfully");
      handleRerender();
    }
  };

  const handleRestore = async (id: string) => {
    const isCompleted = await restoreDeletedProduct(id);
    if (isCompleted) {
      message.success("Restore article successfully");
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
          <Popconfirm
            title="Restore article?"
            okType="primary"
            description={trans({
              en: "Are you sure you want to restore this article?",
              vi: "Bạn có chắc chắn muốn khôi phục bài viết này không?",
            })}
            onConfirm={() => handleRestore(record._id)}
            onCancel={handleCancel}
            okText="Restore"
            cancelText="Cancel"
          >
            <Button icon={< TbRestore />}></Button>
          </Popconfirm>
          <Popconfirm
            title="Delete article?"
            okType="danger"
            description={trans({
              en: "Are you sure you want to delete this article? (It can't be restored later)",
              vi: "Bạn có chắc chắn muốn xóa bài viết này không? (Không thể khôi phục sau này)",
            })}
            onConfirm={() => handleHardDelete(record._id)}
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
          queryFn={getDeletedProducts}
          queryKey="deletedProducts"
          columns={columnsWithAction}
        />
      </div>
    </>
  );
};

export default ProductRecycleBin;
