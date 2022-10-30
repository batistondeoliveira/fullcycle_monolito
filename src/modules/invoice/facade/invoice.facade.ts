import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInputDto, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto } from "./invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";

export interface UseCaseProps {
  findUsecase: UseCaseInterface,
  generateUsecase: UseCaseInterface,
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _generateUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._generateUsecase = usecaseProps.generateUsecase;
    this._findUsecase = usecaseProps.findUsecase;
  }

  async generate(input: InvoiceFacadeInputDto): Promise<void> {
    await this._generateUsecase.execute(input);
  }

  async find(
    input: FindInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findUsecase.execute(input);
  }
}
