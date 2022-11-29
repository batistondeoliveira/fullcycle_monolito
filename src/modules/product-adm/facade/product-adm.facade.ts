import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddProductFacadeInputDto, AddProductFacadeOutputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

  private _addUsecase: UseCaseInterface;
  private _checkStockUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._addUsecase = usecaseProps.addUseCase;
    this._checkStockUsecase = usecaseProps.stockUseCase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto> {
    //caso o dto do caso de uso for != do dto da facade, temos que converter o dto da facade para o dto do caso de uso
    return await this._addUsecase.execute(input);
  }
  
  async checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return await this._checkStockUsecase.execute(input)
  }
}