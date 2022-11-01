import { InvoiceFacadeInputDto, FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, InvoiceFacadeOutputDto } from "./invoice.facade.dto";

export default interface InvoiceFacadeInterface {
  generate(input: InvoiceFacadeInputDto): Promise<InvoiceFacadeOutputDto>;
  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}
