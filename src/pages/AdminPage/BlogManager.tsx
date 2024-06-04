import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "../../contexts/LangContext";
import {
  getAllArticles,
  getArticleSize,
  softDeleteArticle,
} from "../../services/articleService";
import {
  Button,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableProps,
  message,
} from "antd";
import { MdEdit } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import Formatter from "../../util/format/Formatter";
import { AdminFunctionIndex } from ".";

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
}: {
  changeFunction(index: AdminFunctionIndex): void;
}) => {
  const { trans } = useContext(LangContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, contextHolder] = message.useMessage();

  const { data: articles, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(pageSize, currentPage),
    select: (response) => response as IArticle[],
  });

  const handleOK = async (id: string) => {
    const isCompleted = await softDeleteArticle(id);
    if (isCompleted) {
      message.success("Delete article successfully");
      refetch();
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
  };

  const { data: total } = useQuery({
    queryKey: ["articlesSize"],
    queryFn: getArticleSize,
  });
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    refetch();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage, refetch]);

  return (
    <>
      {contextHolder}
      <Table
        size="middle"
        footer={() => (
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
        )}
        columns={[
          ...columns,
          {
            title: "Action",
            key: "action",
            fixed: "right",
            width: 100,
            render: (_, record) => (
              <Space size="middle">
                <Button icon={<MdEdit />}></Button>
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
        ]}
        dataSource={articles}
        pagination={false}
      ></Table>
      {articles && articles.length > 0 && (
        <div className="p-2 pb-8 mx-auto w-fit">
          <Pagination
            className="p-2 bg-white border rounded-md "
            total={total}
            defaultCurrent={1}
            defaultPageSize={pageSize}
            onChange={(page) => changePage(page)}
          />
        </div>
      )}
    </>
  );
};

export default BlogManager;
