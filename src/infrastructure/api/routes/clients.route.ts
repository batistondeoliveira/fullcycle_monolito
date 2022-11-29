import express, { Request, Response } from 'express';
import Address from '../../../modules/@shared/domain/value-object/address.value-object';
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory';

export const clientsRoute = express.Router();

clientsRoute.post('/', async (req: Request, res: Response) => {
  const factory = ClientAdmFacadeFactory.create();
  try {
    const clientDto = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      address: new Address({
        street: req.body.address.street,
        number: req.body.address.number,
        complement: req.body.address.complement,
        city: req.body.address.city,
        state: req.body.address.state,
        zipCode: req.body.address.zipCode,
      }),
    };

    const output = await factory.add(clientDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err)
  }
});

clientsRoute.get('/:id', async (req: Request, res: Response) => {
  const factory = ClientAdmFacadeFactory.create();
  try {    
    const output = await factory.find({ id: req.params.id });
    res.send(output);
  } catch (err) {
    res.status(500).send(err)
  }
});
