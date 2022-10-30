import { Sequelize } from "sequelize-typescript"
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";

describe("Invoice repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });  
  
  it("should generate a new invoice", async () => {
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

    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const result = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: ["items"]
    });

    expect(result.id).toEqual(invoice.id.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);    
    expect(result.street).toEqual(invoice.address.street);
    expect(result.number).toEqual(invoice.address.number);
    expect(result.complement).toEqual(invoice.address.complement);
    expect(result.city).toEqual(invoice.address.city);
    expect(result.state).toEqual(invoice.address.state);    
    expect(result.zipCode).toEqual(invoice.address.zipCode);
    expect(result.items.length).toEqual(2);
    expect(result.items[0].id).toBe(product1.id.id);
    expect(result.items[0].name).toBe(product1.name);
    expect(result.items[0].price).toBe(product1.price);
    expect(result.items[1].id).toBe(product2.id.id);
    expect(result.items[1].name).toBe(product2.name);
    expect(result.items[1].price).toBe(product2.price);
    expect(result.total).toBe(300);
    expect(result.createdAt).toEqual(invoice.createdAt);  
    expect(result.updatedAt).toBeDefined();
  });

  it("should find an invoice", async () => {        
    const product1 = {
      id: "1",
      name: "Product 1",
      price: 100,
      invoiceId: "1",
    };  

    const product2 = {
      id: "2",
      name: "Product 2",
      price: 200,
      invoiceId: "1",
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
      createdAt: new Date(),
      updatedAt: new Date(),
      total: 300,
    };

    await InvoiceModel.create(
      input,
      {
        include: [{ model: InvoiceItemModel }]
      }
    );
        
    const repository = new InvoiceRepository();
    const result = await repository.find(input.id);

    expect(result.id.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);    
    expect(result.address.street).toEqual(input.street);
    expect(result.address.number).toEqual(input.number);
    expect(result.address.complement).toEqual(input.complement);
    expect(result.address.city).toEqual(input.city);
    expect(result.address.state).toEqual(input.state);    
    expect(result.address.zipCode).toEqual(input.zipCode);
    expect(result.items.length).toEqual(2);
    expect(result.items[0].id.id).toBe(product1.id);
    expect(result.items[0].name).toBe(product1.name);
    expect(result.items[0].price).toBe(product1.price);
    expect(result.items[1].id.id).toBe(product2.id);
    expect(result.items[1].name).toBe(product2.name);
    expect(result.items[1].price).toBe(product2.price);      
    expect(result.createdAt).toEqual(input.createdAt);  
    expect(result.updatedAt).toBeDefined();
  }); 
})
