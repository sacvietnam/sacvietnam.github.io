import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Pagination, Spin } from "antd";
import EmptySVG from "./undraw_adventure_map_hnin.svg?react";

function PaginationDataList<Type>({
  queryKey,
  pageSize,
  currentPage,
  total,
  setPage,
  className,
  renderEach,
  queryFn,
}: {
  queryKey: string;
  pageSize: number;
  total: number;
  currentPage: number;
  setPage: (page: number) => void;
  className?: string;
  renderEach: (data: Type, key?: string) => React.JSX.Element;
  queryFn: (pageSize: number, currentPage: number) => Promise<Type[]>;
}): React.JSX.Element {
  const {
    isPending,
    data: dataList,
    refetch,
  } = useQuery({
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

  if (isPending)
    return (
      <div className="grid place-items-center" key={queryKey}>
        <Spin />
      </div>
    );

  if (!dataList || dataList.length === 0)
    return (
      <div className="mt-8" key={queryKey}>
        <p className="text-center text-gray-500">No data available</p>
        <EmptySVG className="w-1/2 mx-auto max-w-[800px] max-h-[500px]" />
      </div>
    );

  return (
    <div className="flex flex-col justify-between min-h-dvh" key={queryKey}>
      <div className={className}>
        {dataList?.map((data) => renderEach(data))}
      </div>
      {dataList && dataList.length > 0 && (
        <div className="p-2 pb-8 mx-auto mt-auto w-fit">
          <Pagination
            className="p-2 bg-white border rounded-md "
            total={total}
            defaultCurrent={1}
            defaultPageSize={pageSize}
            onChange={(page) => changePage(page)}
          />
        </div>
      )}
    </div>
  );
}

export default PaginationDataList;
