import { Divider, Rate } from "antd";
import { IFeedback } from "../../models/DataModel";

const FeedbackItem = ({ feedback }: { feedback: IFeedback }) => {
	return (
		<div
			key={feedback._id}
			className="grid w-full grid-cols-1 p-4 border rounded-md md:grid-cols-4"
		>
			<div className="flex flex-col md:col-span-1">
				<div>
					<span className="mr-4 text-sm font-semibold">
						{feedback.nameUser}
					</span>
					<br />
					<span className="text-xs text-gray-500">
						{new Date(feedback.createdAt).toLocaleDateString("vi-VN")}
					</span>
				</div>
				<Rate value={feedback.rate} className="text-sm" disabled />
			</div>
			<div className="flex gap-2 mt-1 w-fit md:col-span-3 md:mt-0">
				<Divider type="vertical" className="hidden h-full md:block" />
				<p className="text-xs break-all w-fit">{feedback.content}</p>
			</div>
		</div>
	);
};

export default FeedbackItem;
