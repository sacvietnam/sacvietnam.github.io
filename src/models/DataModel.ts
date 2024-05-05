export interface IAccount {
	_id: string;
	username: string;
	phone: string;
	password: string;
	name: string;
	gender: "male" | "female" | "other";
	role: "admin" | "user";
}

export interface IFeedback {
	_id: string;
	rate: number;
	content: string;
	createdAt: Date;
	user_id: string;
	product_id: string;
	nameUser: string;
}

export interface IArticle {
	_id: string;
	title: string;
	description: string;
	image: string;
	content: string;
	publishedAt: Date;
	updatedAt: Date;
	rate: number;
	quantityRate: number;
}

export interface IOrderDetail {
	productId: string;
	quantity: number;
	price: number;
	discount: Discount;
}

export interface ICustomer {
	name: string;
	phone: string;
	address: string;
}

export interface IOrder {
	_id: string;
	orderDate: Date;
	customerId: string;
	customer: ICustomer;
	orderDetails: IOrderDetail[];
}

export interface Discount {
	type: "percent" | "fixed";
	value: number;
}

export interface IProduct {
	_id: string;
	name: string;
	images: string[];
	price: number;
	discount: Discount;
	description: string;
	inventory: number;
	rate: number;
	quantityRate: number;
}
