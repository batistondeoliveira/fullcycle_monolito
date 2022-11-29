import express, { Request, Response } from 'express';
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/product-adm.facade.factory';
import StoreCatalogFacadeFactory from '../../../modules/store-catalog/factory/store-catalog.facade.factory';

export const productsRoute = express.Router();

productsRoute.post('/', async (req: Request, res: Response) => {
  const factory = ProductAdmFacadeFactory.create();
  try {
    const productDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };

    const outputProduct = await factory.addProduct(productDto);

    const storeCatalogDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      salesPrice: req.body.salesPrice,
    }

    const storeCatalog = StoreCatalogFacadeFactory.create();
    const outputCatalog = await storeCatalog.add(storeCatalogDto);
        
    const output = {
      id: outputProduct.id,
      name: outputProduct.name,
      description: outputProduct.description,
      purchasePrice: outputProduct.purchasePrice,
      stock: outputProduct.stock,
      salesPrice: outputCatalog.salesPrice,
    };

    res.send(output);
  } catch (err) {
    res.status(500).send(err)
  }
});

productsRoute.get('/:id', async (req: Request, res: Response) => {
  const factory = ProductAdmFacadeFactory.create();
  try {    
    const output = await factory.checkStock({ productId: req.params.id });
    res.send(output);
  } catch (err) {
    res.status(500).send(err)
  }
});
