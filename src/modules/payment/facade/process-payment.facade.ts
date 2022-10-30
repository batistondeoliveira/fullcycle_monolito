import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, { ProcessPaymentFacadeInputDto, ProcessPaymentFacadeOutputDto } from "./process-payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: UseCaseInterface) {}

  process(input: ProcessPaymentFacadeInputDto): Promise<ProcessPaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }
}