import InvoiceFacadeInputDto, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto } from "./invoice.facade.dto";

export default interface InvoiceFacadeInterface {
  generate(input: InvoiceFacadeInputDto): Promise<void>;
  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}
