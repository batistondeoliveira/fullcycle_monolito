import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {
    const repository = new InvoiceRepository();
    const generateUseCase = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      generateUsecase: generateUseCase,
      findUsecase: undefined,
    });
    
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
      id: "1",    
      name: "Client 1",
      document: "Doc-1",
      street: "Street 1",
      number: "1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "zip 1",  
      items: [product1, product2],      
    };
    
    await facade.generate(input)

    const invoice = await InvoiceModel.findOne({
      where: { id: input.id },
      include: ["items"]
    });

    expect(invoice).toBeDefined();
    expect(invoice.id).toEqual(input.id);
    expect(invoice.name).toEqual(input.name);
    expect(invoice.document).toEqual(input.document);    
    expect(invoice.street).toEqual(input.street);
    expect(invoice.number).toEqual(input.number);
    expect(invoice.complement).toEqual(input.complement);
    expect(invoice.city).toEqual(input.city);
    expect(invoice.state).toEqual(input.state);    
    expect(invoice.zipCode).toEqual(input.zipCode);
    expect(invoice.items.length).toEqual(2);
    expect(invoice.items[0].id).toBe(product1.id);
    expect(invoice.items[0].name).toBe(product1.name);
    expect(invoice.items[0].price).toBe(product1.price);
    expect(invoice.items[1].id).toBe(product2.id);
    expect(invoice.items[1].name).toBe(product2.name);
    expect(invoice.items[1].price).toBe(product2.price);
    expect(invoice.total).toBe(300);
    expect(invoice.createdAt).toEqual(invoice.createdAt);  
    expect(invoice.updatedAt).toBeDefined();
  });

  it("should find a invoice", async () => {
    const repository = new InvoiceRepository();
    const generateUseCase = new GenerateInvoiceUseCase(repository);
    const findUseCase = new FindInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      generateUsecase: generateUseCase,
      findUsecase: findUseCase,
    });
    
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
      id: "1",    
      name: "Client 1",
      document: "Doc-1",
      street: "Street 1",
      number: "1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "zip 1",  
      items: [product1, product2],      
    };
    
    await facade.generate(input)

    const invoice = await facade.find({ id: "1" });

    expect(invoice).toBeDefined();
    expect(invoice.id).toEqual(input.id);
    expect(invoice.name).toEqual(input.name);
    expect(invoice.document).toEqual(input.document);    
    expect(invoice.address.street).toEqual(input.street);
    expect(invoice.address.number).toEqual(input.number);
    expect(invoice.address.complement).toEqual(input.complement);
    expect(invoice.address.city).toEqual(input.city);
    expect(invoice.address.state).toEqual(input.state);    
    expect(invoice.address.zipCode).toEqual(input.zipCode);
    expect(invoice.items.length).toEqual(2);
    expect(invoice.items[0].id).toBe(product1.id);
    expect(invoice.items[0].name).toBe(product1.name);
    expect(invoice.items[0].price).toBe(product1.price);
    expect(invoice.items[1].id).toBe(product2.id);
    expect(invoice.items[1].name).toBe(product2.name);
    expect(invoice.items[1].price).toBe(product2.price);
    expect(invoice.total).toBe(300);
    expect(invoice.createdAt).toEqual(invoice.createdAt);
  });
});
