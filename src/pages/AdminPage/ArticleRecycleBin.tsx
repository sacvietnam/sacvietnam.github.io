import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { LangContext } from "../../contexts/LangContext";
import {
  getDeletedArticleSize,
  getDeletedArticles,
  hardDeleteArticle,
} from "../../services/articleService";
import { Button, Popconfirm, Space, TableProps, message } from "antd";
import { BsTrash3Fill } from "react-icons/bs";
import { TbRestore } from "react-icons/tb";

import Formatter from "../../util/format/Formatter";
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
    render: (date) => Formatter.toDate(date),
  },
  {
    title: "Deleted At",
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (date) => Formatter.toDateTime(date),
  },
];
const ArticleRecycleBin = () => {
  const { trans } = useContext(LangContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, contextHolder] = message.useMessage();

  const { data: total } = useQuery({
    queryKey: ["articlesSize"],
    queryFn: getDeletedArticleSize,
  });

  const handleOK = async (id: string) => {
    const isCompleted = await hardDeleteArticle(id);
    if (isCompleted) {
      message.success("Delete article successfully");
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
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
          <Button icon={<TbRestore />}></Button>
          <Popconfirm
            title="Delete article?"
            okType="danger"
            description={trans({
              en: "Are you sure you want to delete this article? (It can't be restored later)",
              vi: "Bạn có chắc chắn muốn xóa bài viết này không? (Không thể khôi phục sau này)",
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
      <TableDataManager<IArticle>
        currentPage={currentPage}
        pageSize={pageSize}
        setPage={setCurrentPage}
        total={total || 0}
        queryFn={getDeletedArticles}
        queryKey="deletedArticles"
        columns={columnsWithAction}
      />
    </>
  );
};

export default ArticleRecycleBin;
