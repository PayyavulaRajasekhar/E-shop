export interface CartItem {
  _id: string;
  userId: string;
  productId: string;
  productName: string;
  productImageURL: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
}
