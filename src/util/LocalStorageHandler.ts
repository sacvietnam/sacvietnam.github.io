import { IOrderDetail, IProduct } from "../models/DataModel";

/* eslint-disable @typescript-eslint/no-explicit-any */
const LOCAL_STORAGE_KEY = {
	USER: "user",
	LOGIN_FORM: "loginForm",
	CART: "cart",
};

type LOCAL_STORAGE_KEY_TYPE = { [key in keyof typeof LOCAL_STORAGE_KEY]: any };

class LocalStorageHandler {
	private static MAIN_KEY = "SmartAirconClothing";
	private static object: LOCAL_STORAGE_KEY_TYPE = {
		USER: null,
		LOGIN_FORM: null,
		CART: null,
	};

	public static initial() {
		const raw = localStorage.getItem(LocalStorageHandler.MAIN_KEY) || null;
		if (raw) {
			this.object = JSON.parse(raw);
		}
	}

	public static setItem(key: keyof typeof LOCAL_STORAGE_KEY, value: any) {
		this.object[key] = value;

		localStorage.setItem(this.MAIN_KEY, JSON.stringify(this.object));
	}

	public static getItem<T>(key: keyof typeof LOCAL_STORAGE_KEY): T | null {
		return this.object[key] as T;
	}
}

export interface CartItem extends IOrderDetail {
	product: IProduct;
}
export class CartStorageHandler {
	private static cart: CartItem[] | null = null;

	public static getInstance() {
		if (!this.cart) {
			this.cart = LocalStorageHandler.getItem<CartItem[]>("CART");
			if (!this.cart) {
				this.cart = [];
				LocalStorageHandler.setItem("CART", this.cart);
			}
		}
		return this.cart;
	}

	public static addItemToCart(product: IProduct, quantity: number) {
		const cart = this.getInstance();
		const existingItem = cart.find(
			(cartItem) => cartItem.productId === product._id
		);
		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			const newLine: CartItem = {
				product: product,
				productId: product._id,
				quantity: quantity,
				price: product.price,
				discount: product.discount,
			};
			cart.push(newLine);
		}
		LocalStorageHandler.setItem("CART", cart);
	}

	public static removeItemFromCart(item: IOrderDetail, quantity: number) {
		const cart = this.getInstance();
		if (cart) {
			const index = cart.findIndex(
				(cartItem) => cartItem.productId === item.productId
			);
			if (index !== -1) {
				const updatedItem = cart[index];
				updatedItem.quantity -= quantity;
				if (updatedItem.quantity <= 0) {
					cart.splice(index, 1);
				}
				LocalStorageHandler.setItem("CART", cart);
			}
		}
	}
}

export default LocalStorageHandler;
