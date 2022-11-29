import { 
  AddProductFacadeInputDto, 
  AddProductFacadeOutputDto, 
  CheckStockFacadeInputDto, 
  CheckStockFacadeOutputDto 
} from "./product-adm.facade.dto";

export default interface ProductAdmFacadeInterface {
  addProduct(
    input: AddProductFacadeInputDto
  ): Promise<AddProductFacadeOutputDto>;
  
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto>;
}