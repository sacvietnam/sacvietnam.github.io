import { useContext, useEffect, useMemo, useState } from "react";
import useMobile from "../../hooks/useMobile.js";
import { LangContext, MultilangContent } from "../../contexts/LangContext.js";

import { IoIosArrowBack } from "react-icons/io";
import { IoBagAdd } from "react-icons/io5";
import { FaPager } from "react-icons/fa6";

import { IconType } from "react-icons";
import { Button } from "antd";
import CreateProductPage from "./CreateProductPage.js";
import CreateNewBlogPage from "./CreateNewBlogPage.js";
import { GlobalContext } from "../../contexts/GlobalContext.js";
import { Link } from "react-router-dom";

const AdminPage = () => {
	const isMobile = useMobile();
	const { user } = useContext(GlobalContext);
	const { trans } = useContext(LangContext);
	const [index, setIndex] = useState<number>(-1);

	const functions: {
		name: MultilangContent;
		icon: IconType;
	}[] = [
		{
			name: {
				en: "Create new Product",
				vi: "Tạo Sản phẩm mới",
			},
			icon: IoBagAdd,
		},
		{
			name: {
				en: "Create new Blog",
				vi: "Tạo Bài viết mới",
			},
			icon: FaPager,
		},
	];

	const returnHome = () => {
		setIndex(-1);
	};

	const currentFunction = useMemo(() => {
		switch (index) {
			case 0:
				return <CreateProductPage returnHome={returnHome} />;
			case 1:
				return <CreateNewBlogPage returnHome={returnHome} />;
			default:
				return (
					<>
						<p className="text-red-500">This function not exists</p>
					</>
				);
		}
	}, [index]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const onConfirmRefresh = function (event: any) {
			event.preventDefault();
			return (event.returnValue = "Are you sure you want to leave the page?");
		};

		if (index !== -1)
			window.addEventListener("beforeunload", onConfirmRefresh, {
				capture: true,
			});
		return () => {
			window.removeEventListener("beforeunload", onConfirmRefresh, {
				capture: true,
			});
		};
	}, [index]);

	if (!user || user.role !== "admin") {
		return (
			<div className="flex flex-col justify-center max-w-screen-lg px-8 mx-auto mt-16">
				<h1 className="my-8 text-3xl text-center text-red-500">
					What are you doing here? 😈
				</h1>
				<p className="my-2 mb-8 italic text-center text-gray-500">This funciton is not for you role, try to ask thanhcanhit</p>
				<Link to={"/"}>
					<Button type="primary" block size="large">BACK TO HOME</Button>
				</Link>
			</div>
		);
	}

	if (isMobile)
		return (
			<div className="px-2 my-4 mt-8 text-center">
				<h1 className="text-2xl font-semibold text-red-500">
					{trans({
						en: "Not support on this Device",
						vi: "Không hỗ trợ trên thiết bị này",
					})}
				</h1>
				<p className="italic text-center text-red-400">
					{trans({
						en: "To better UX, pls use this function on PC or Tablet",
						vi: "Để có trải nghiệm tốt nhất, hãy dùng tính năng này ở máy tính hoặc máy tính bảng",
					})}
				</p>
			</div>
		);

	if (index === -1)
		return (
			<div className="relative max-w-screen-lg px-2 mx-auto my-4 mt-8">
				<h1 className="mt-2 text-2xl font-semibold text-center">
					{trans({
						en: "Welcome to admin page,",
						vi: "Chào mừng đến với trang quản trị viên,",
					})}
					<span className="block text-primary">The sharks team</span>
				</h1>
				<div className="grid grid-cols-3 gap-8 mt-8 lg:gap-16 lg:grid-cols-5">
					{functions.map((item, index) => (
						<div
							key={index}
							onClick={() => setIndex(index)}
							className="grid gap-4 p-4 border rounded-md cursor-pointer hover:shadow-md place-items-center w-[200px] h-[150px] group select-none"
						>
							<div className="text-3xl text-gray-500 transition-colors group-hover:text-primary">
								<item.icon />
							</div>
							<p className="font-semibold text-center">{trans(item.name)}</p>
						</div>
					))}
				</div>
			</div>
		);

	return (
		<div className="max-w-screen-lg px-2 mx-auto my-4 mt-8">
			<div className="flex items-center gap-2">
				<Button
					shape="round"
					className="w-fit"
					icon={<IoIosArrowBack />}
					onClick={() => setIndex(-1)}
				>
					{trans({ en: "Back", vi: "Quay lại" })}
				</Button>

				<h2 className="flex-auto text-xl font-bold text-center text-primary">
					{trans(functions[index].name)}
				</h2>
			</div>
			<div className="flex flex-col mt-4">{currentFunction}</div>{" "}
		</div>
	);
};
export default AdminPage;
