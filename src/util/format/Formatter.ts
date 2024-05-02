class Formatter {
	static toVND(amount: number) {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	}

	static toDate(date: string | Date) {
		return new Date(date).toLocaleDateString("vi-VN");
	}

	static toDateTime(date: string | Date) {
		return `${new Date(date).toLocaleTimeString("vi-VN")} ${new Date(
			date
		).toLocaleDateString("vi-VN")}`;
	}
}

export default Formatter;
