class CartCaculator {
  public static calculateRealPrice(item: CartItem): number {
    const price = Number(item.price);
    const discount = Number(
      item.discount.type === "percent"
        ? (price * Number(item.discount.value)) / 100
        : Number(item.discount.value),
    );
    console.log(price, item.discount);
    return price - discount;
  }

  public static calculateLineTotal(item: CartItem): number {
    const price = CartCaculator.calculateRealPrice(item);
    const totalLine = price * item.quantity;
    return totalLine;
  }

  public static calculateCartTotal(cart: CartItem[]): number {
    return cart.reduce((acc, item) => {
      const price = CartCaculator.calculateLineTotal(item);
      return acc + price;
    }, 0);
  }

  public static calculateCartDiscount(cart: CartItem[]): number {
    return cart.reduce((acc, item) => {
      const discount =
        item.discount.type === "percent"
          ? (item.price * item.discount.value) / 100
          : item.discount.value;
      return acc + discount;
    }, 0);
  }
}

export default CartCaculator;
