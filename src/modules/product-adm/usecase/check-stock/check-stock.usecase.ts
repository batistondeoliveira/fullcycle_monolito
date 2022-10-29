import ProductGateway from "../../gateway/product.gateway";
import ProductRepository from "../../repository/product.repository";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class checkStockUseCase {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(input.productId);
    return {
      productId: product.id.id,
      stock: product.stock,
    }
  }
}