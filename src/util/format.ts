class Format {
	static currency(amount: number) {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	}
}

export default Format;
