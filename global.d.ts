declare interface IAccount {
  _id: string;
  username: string;
  phone: string;
  password: string;
  name: string;
  gender: "male" | "female" | "other";
  role: "admin" | "user";
}

declare interface IFeedback {
  _id: string;
  rate: number;
  content: string;
  createdAt: Date;
  user_id: string;
  product_id: string;
  nameUser: string;
}

declare interface IArticle {
  _id: string;
  title: string;
  description: string;
  image: string;
  view: number;
  content: string;
  publishedAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
}

declare interface IOrderDetail {
  productId: string;
  quantity: number;
  price: number;
  discount: Discount;
}

declare interface ICustomer {
  name: string;
  phone: string;
  address: string;
}

declare interface IOrder {
  _id: string;
  orderDate: Date;
  customerId: string;
  customer: ICustomer;
  orderDetails: IOrderDetail[];
}

declare interface Discount {
  type: "percent" | "fixed";
  value: number;
}

declare interface IProduct {
  _id: string;
  name: string;
  images: string[];
  price: number;
  discount: Discount;
  description: string;
  inventory: number;
  rate: number;
  quantityRate: number;
  sold: number;
}
