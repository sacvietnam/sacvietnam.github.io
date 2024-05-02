class Formatter {
	static toVND(amount: number) {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	}
}

export default Formatter;
