import { Application, Request, Response } from 'express';
import { ProductStore, ProductType } from '../models/product';
import { authenticateToken } from '../auth/jsonToken';

const productStore: ProductStore = new ProductStore();

//create product
const create = async (req: Request, res: Response): Promise<void> => {
  const { name, price, category } = req.body;

  const product: ProductType = {
    name: name,
    price: price,
    category: category
  };

  try {
    await productStore.createProduct(product);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
  }
};

// get product with supplied id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: number = parseInt(req.params.prodId);
    const oneProduct: ProductType = await productStore.getOneProductById(
      productId
    );

    res.json(oneProduct);
  } catch (err) {
    res.sendStatus(404).json({ error: err });
  }
};

const productByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = String(req.params.cat);
    const productByCat: ProductType[] = await productStore.getProductsByCat(
      category
    );

    res.json(productByCat);
  } catch (err) {
    res.sendStatus(404).json({ error: err });
  }
};

//get all products
const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allProducts: ProductType[] = await productStore.getAllProducts();

    res.json(allProducts);
  } catch (err) {
    res.sendStatus(404);
    throw new Error(`Could not get all products. Error: ${err}`);
  }
};

//delete product
const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    await productStore.deleteProduct(id);

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(403);
  }
};

export const productRoutes = (app: Application): void => {
  app.post('/products/create', authenticateToken, create);
  app.get('/products/:prodId', authenticateToken, show);
  app.get('/products/category/:cat', authenticateToken, productByCategory);
  app.get('/products/', index);
  app.delete('/products/delete/:id', authenticateToken, destroy);
};
