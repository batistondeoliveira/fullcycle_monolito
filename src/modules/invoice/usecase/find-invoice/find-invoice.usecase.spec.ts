import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const address = new Address({  
  street: "Street 1",
  number: "1",
  complement: "Complement 1",
  city: "City 1",
  state: "State 1",
  zipCode: "zip 1",  
});

const product1 = new Product({
  id: new Id("1"),
  name: "Product 1",
  price: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  price: 200,
});

const invoice = new Invoice({
  id: new Id("1"),
  name: "Client 1",
  document: "Doc-1",
  address: address,
  items: [product1, product2],
  createdAt: new Date(),  
});

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find Invoice UseCase unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {      
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);    
    expect(result.address.street).toEqual(invoice.address.street);
    expect(result.address.number).toEqual(invoice.address.number);
    expect(result.address.complement).toEqual(invoice.address.complement);
    expect(result.address.city).toEqual(invoice.address.city);
    expect(result.address.state).toEqual(invoice.address.state);    
    expect(result.address.zipCode).toEqual(invoice.address.zipCode);
    expect(result.items.length).toEqual(2);
    expect(result.items[0].id).toBe(product1.id.id);
    expect(result.items[0].name).toBe(product1.name);
    expect(result.items[0].price).toBe(product1.price);
    expect(result.items[1].id).toBe(product2.id.id);
    expect(result.items[1].name).toBe(product2.name);
    expect(result.items[1].price).toBe(product2.price);
    expect(result.total).toBe(300);
    expect(result.createdAt).toEqual(invoice.createdAt);  
  });
});