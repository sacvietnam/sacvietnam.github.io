import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Pagination, Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { AnyObject } from "antd/es/_util/type";

function TableDataManager<Type>({
  queryKey,
  pageSize,
  currentPage,
  total,
  setPage,
  footer,
  queryFn,
  columns,
}: {
  queryKey: string;
  pageSize: number;
  total: number;
  currentPage: number;
  setPage: (page: number) => void;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  queryFn: (pageSize: number, currentPage: number) => Promise<Type[]>;
  columns: TableProps<Type>["columns"];
}): React.JSX.Element {
  const { data: dataList, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFn(pageSize, currentPage),
    select: (response) => response as Type[],
  });

  const changePage = (page: number) => {
    setPage(page);
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
      <Table
        size="middle"
        footer={() => footer}
        columns={columns as ColumnsType<AnyObject> | undefined} // Cast columns to the correct type
        dataSource={dataList as readonly AnyObject[] | undefined} // Cast dataList to the correct type
        pagination={false}
      ></Table>
      {dataList && dataList.length > 0 && (
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
}

export default TableDataManager;
