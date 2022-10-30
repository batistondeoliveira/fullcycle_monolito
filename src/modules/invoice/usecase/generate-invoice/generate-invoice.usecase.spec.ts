import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate Invoice UseCase unit test", () => {
  it("should generate a invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const product1 = {
      id: "1",
      name: "Product 1",
      price: 100,
    };
    
    const product2 = {
      id: "2",
      name: "Product 2",
      price: 200,
    };
    
    const input = {      
      name: "Client 1",
      document: "Doc-1",
      street: "Street 1",
      number: "1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "Zip 1",
      items: [product1, product2],
    };

    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items.length).toEqual(2);
    expect(result.items[0].id).toBe(product1.id);
    expect(result.items[0].name).toBe(product1.name);
    expect(result.items[0].price).toBe(product1.price);
    expect(result.items[1].id).toBe(product2.id);
    expect(result.items[1].name).toBe(product2.name);
    expect(result.items[1].price).toBe(product2.price);  
    expect(result.total).toBe(300);  
  });
});