import { Button, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { LangContext } from "../../contexts/LangContext";
import {
	FrownOutlined,
	MehOutlined,
	SendOutlined,
	SmileOutlined,
} from "@ant-design/icons";

type UserFeedbackFormProps = {
	onSubmit: (feedback: { rate: number; content: string }) => void;
};

const customIcons: Record<number, React.ReactNode> = {
	1: <FrownOutlined />,
	2: <FrownOutlined />,
	3: <MehOutlined />,
	4: <SmileOutlined />,
	5: <SmileOutlined />,
};

const UserFeedbackForm = ({ onSubmit }: UserFeedbackFormProps) => {
	const { user } = useContext(GlobalContext);
	const { trans } = useContext(LangContext);
	const [userFeedback, setUserFeedback] = useState<{
		rate: number;
		content: string;
	}>({ rate: 5, content: "" });

	const setRate = (value: number) => {
		setUserFeedback((prev) => {
			return { ...prev, rate: value };
		});
	};

	const setContent = (value: string) => {
		setUserFeedback((prev) => {
			return { ...prev, content: value };
		});
	};

	const rateColor = (() => {
		switch (userFeedback.rate) {
			case 1:
				return "#FF0000";
			case 2:
				return "#FFA500";
			case 3:
				return "#FFD700";
			case 4:
			case 5:
				return "#4CAF50";
		}
	})();

	const rateText = (() => {
		switch (userFeedback.rate) {
			case 1:
				return trans({ en: "Very bad", vi: "Rất tệ" });
			case 2:
				return trans({ en: "Bad", vi: "Tệ" });
			case 3:
				return trans({ en: "Normal", vi: "Bình thường" });
			case 4:
				return trans({ en: "Good", vi: "Tốt" });
			case 5:
				return trans({ en: "Very good", vi: "Rất tốt" });
			default:
				return "";
		}
	})();
	return (
		<div className="order-1 mx-auto w-full lg:order-2 col-span-12 max-w-[500px] max-h-[300px] h-fit p-4  mb-8 lg:col-span-4 border rounded-md">
			<div className="flex flex-col items-center gap-2 mb-2">
				<span className="font-semibold">
					{user
						? user.name
						: trans({ en: "Your review", vi: "Cảm nhận của bạn" })}
				</span>
				<div className="flex flex-col items-center gap-1">
					<Rate
						allowClear={false}
						defaultValue={userFeedback.rate}
						onChange={setRate}
						character={({ index = 0 }) => customIcons[index + 1]}
						style={{ color: rateColor }}
					/>
					<span className="text-sm">{rateText}</span>
				</div>
				<TextArea
					disabled={!user}
					showCount
					autoSize={{ minRows: 2, maxRows: 5 }}
					rows={2}
					placeholder={trans({
						en: "Please text your feedback",
						vi: "Nhập bình luận của bạn...",
					})}
					maxLength={200}
					value={userFeedback.content}
					onChange={(e) => setContent(e.target.value)}
					className="mb-4"
				/>
				{!user && (
					<i className="text-xs text-left text-red-400">
						{trans({
							en: "You must be logged in to be able to post feedback",
							vi: "Bạn phải đăng nhập để có thể gửi phản hồi",
						})}
					</i>
				)}
				<Button
					icon={<SendOutlined />}
					onClick={() => {
						onSubmit(userFeedback);
						setUserFeedback({ rate: 5, content: "" });
					}}
					disabled={!user}
					block
					type="dashed"
				>
					{trans({ en: "Send feedback", vi: "Gửi phản hồi" })}
				</Button>
			</div>
		</div>
	);
};

export default UserFeedbackForm;
