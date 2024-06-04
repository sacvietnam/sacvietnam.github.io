import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { LangContext } from "../../contexts/LangContext";
import {
  getAllArticles,
  getArticleSize,
  softDeleteArticle,
} from "../../services/articleService";
import { Button, Popconfirm, Space, TableProps, message } from "antd";
import { MdEdit } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import Formatter from "../../util/format/Formatter";
import { AdminFunctionIndex } from ".";
import TableDataManager from "../../components/TableDataManager";

const pageSize = 10;

const columns: TableProps<IArticle>["columns"] = [
  {
    title: "Thumbnail",
    dataIndex: "image",
    key: "image",
    render: (src) => (
      <img src={src} alt="thumbnail" style={{ width: "100px" }} />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Publish At",
    dataIndex: "publishedAt",
    key: "publishedAt",
    render: (date) => Formatter.toDateTime(date),
  },
  {
    title: "Viewed",
    dataIndex: "view",
    key: "view",
  },
];

const BlogManager = ({
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
    queryKey: ["articlesSize"],
    queryFn: getArticleSize,
  });

  const handleOK = async (id: string) => {
    const isCompleted = await softDeleteArticle(id);
    if (isCompleted) {
      message.success("Delete article successfully");
      handleRerender();
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
  };

  const handleRerender = () => {
    setRerender((prev) => !prev);
  };

  const columnsWithAction: TableProps<IArticle>["columns"] = [
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
              changeFunction("EDIT_BLOG");
            }}
          ></Button>
          <Popconfirm
            title="Delete article?"
            description={trans({
              en: "Are you sure to delete this task? (It can recover later)",
              vi: "Bạn có chắc chắn muốn xóa bài viết này không? (Có thể khôi phục sau này)",
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
        <TableDataManager<IArticle>
          currentPage={currentPage}
          pageSize={pageSize}
          setPage={setCurrentPage}
          total={total || 0}
          queryFn={getAllArticles}
          queryKey="articles"
          columns={columnsWithAction}
          footer={
            <div className="grid place-items-end">
              <Button
                icon={<BsTrash3Fill />}
                type="dashed"
                onClick={() => changeFunction("ARTICLE_RECYCLE_BIN")}
              >
                {trans({
                  en: "Recover deleted articles",
                  vi: "Khôi phục bài viết đã xóa",
                })}
              </Button>
            </div>
          }
        />
      </div>
    </>
  );
};

export default BlogManager;
