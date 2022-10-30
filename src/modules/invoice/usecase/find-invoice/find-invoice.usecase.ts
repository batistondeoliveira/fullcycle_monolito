import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;
  
  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {    
    const result = await this._invoiceRepository.find(input.id);
    
    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      address: {
        street: result.address.street,
        number: result.address.number,
        complement: result.address.complement,
        city: result.address.city,
        state: result.address.state,
        zipCode: result.address.zipCode,
      },
      items: result.items.map((product) => ({
        id: product.id.id,
        name: product.name,
        price: product.price,
      })),
      total: result.items.reduce((acc, item) => (acc + item.price), 0),
      createdAt: result.createdAt,
    };  
  }
}