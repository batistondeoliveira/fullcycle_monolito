import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for checkout", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a checkout", async () => {
    var resp = await request(app)
      .post("/products")
      .send({
        id: "1",
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 10,
        salesPrice: 100,
        stock: 10
      });
    expect(resp.status).toBe(200);

    resp = await request(app)
      .post("/products")
      .send({
        id: "2",
        name: "Product 2",
        description: "Product 2 description",
        purchasePrice: 10,
        salesPrice: 100,
        stock: 10
      });    
    expect(resp.status).toBe(200);

    resp = await request(app)
      .post("/clients")
      .send({
        id: "1",
        name: "Client 1",
        email: "x@x.com",
        document: "Doc-1",
        address: {
          street: "Street 1",
          number: "Number 1",
          complement: "Complement 1",
          city: "City 1",
          state: "State 1",
          zipCode: "Zip 1"
        }
      });
    expect(resp.status).toBe(200);

    resp = await request(app)
      .post("/checkout")
      .send({
        id: "1",
        clientId: "1",
        products: [
            { productId: "1" },
            { productId: "2" }
        ]
      });      

    expect(resp.status).toBe(200);
    expect(resp.body.invoiceId).toBeDefined()
    expect(resp.body.status).toBe("approved");
    expect(resp.body.total).toBe(200);
    expect(resp.body.products).toHaveLength(2);
    expect(resp.body.products[0].productId).toBe("1");
    expect(resp.body.products[1].productId).toBe("2");
  });  

  it("should not create a checkout", async () => {
    const resp = await request(app)
      .post("/checkout")
      .send({
        id: "1"        
      });

    expect(resp.status).toBe(500);    
  });  

  it("should find a checkout", async () => {    
    var resp = await request(app)
      .post("/products")
      .send({
        id: "1",
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 10,
        salesPrice: 100,
        stock: 10
      });
    expect(resp.status).toBe(200);

    resp = await request(app)
      .post("/products")
      .send({
        id: "2",
        name: "Product 2",
        description: "Product 2 description",
        purchasePrice: 10,
        salesPrice: 100,
        stock: 10
      });
    expect(resp.status).toBe(200);

    resp = await request(app)
      .post("/clients")
      .send({
        id: "1",
        name: "Client 1",
        email: "x@x.com",
        document: "Doc-1",
        address: {
          street: "Street 1",
          number: "Number 1",
          complement: "Complement 1",
          city: "City 1",
          state: "State 1",
          zipCode: "Zip 1"
        }
      });
    expect(resp.status).toBe(200);

    const id = "1";
    resp = await request(app)
      .post("/checkout")
      .send({
        id: id,
        clientId: "1",
        products: [
            { productId: "1" },
            { productId: "2" }
        ]
      });   
    expect(resp.status).toBe(200);    

    resp = await request(app).get(`/checkout/${id}`).send();

    expect(resp.status).toBe(200);        
    expect(resp.body.id).toBe(id);
    expect(resp.body.name).toBe("Client 1");
    expect(resp.body.document).toBe("Doc-1");
    expect(resp.body.address.street).toBe("Street 1");
    expect(resp.body.address.number).toBe("Number 1");
    expect(resp.body.address.complement).toBe("Complement 1");
    expect(resp.body.address.city).toBe("City 1");
    expect(resp.body.address.state).toBe("State 1");
    expect(resp.body.address.zipCode).toBe("Zip 1");
    expect(resp.body.status).toBe("approved");    
    expect(resp.body.items).toHaveLength(2);
    expect(resp.body.items[0].id).toBe("1");
    expect(resp.body.items[0].name).toBe("Product 1");
    expect(resp.body.items[0].description).toBe("Product 1 description");
    expect(resp.body.items[0].salesPrice).toBe(100);
    expect(resp.body.items[1].id).toBe("2");
    expect(resp.body.items[1].name).toBe("Product 2");
    expect(resp.body.items[1].description).toBe("Product 2 description");
    expect(resp.body.items[1].salesPrice).toBe(100);
  });
});