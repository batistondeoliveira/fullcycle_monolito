import Product from "../domain/product.entity";

export default interface ProductGatway {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}