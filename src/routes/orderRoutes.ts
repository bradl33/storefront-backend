import { Application, Request, Response } from 'express';
import { OrderStore, OrderType, OrderUpdateType } from '../models/order';
import { authenticateToken } from '../auth/jsonToken';
import { loggedInUserId } from '../auth/jsonToken';

const orderStore: OrderStore = new OrderStore();

//create order
const create = async (req: Request, res: Response): Promise<void> => {
  const { orderItems } = req.body;

  const orderOwner: number = loggedInUserId(req) as number;

  try {
    const newOrder: OrderType = await orderStore.createOrderProducts(
      orderOwner,
      orderItems
    );

    res.json(newOrder);
  } catch (err) {
    res.sendStatus(400);
  }
};

// get user active orders
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.userId);
    const activeOrders: OrderType[] = await orderStore.getUserActiveOrders(
      userId
    );

    res.json(activeOrders);
  } catch (err) {
    res.send(404);
    throw new Error(`Could not get user's active order(s). Error: ${err}`);
  }
};

const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { orderToUpdate } = req.body;

  const orderUpdated: OrderUpdateType = await orderStore.updateOrderStatus(
    orderToUpdate
  );

  res.json(orderUpdated);
};

//completed orders by user id
const completedOrders = async (req: Request, res: Response): Promise<void> => {
  const userId: number = parseInt(req.params.userId);
  const completedOrder: OrderType[] = await orderStore.getUserCompletedOrders(
    userId
  );

  res.json(completedOrder);
};

//get all orders
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.userId);
    const userAllOrders: OrderType[] = await orderStore.getUserAllOrders(
      userId
    );

    res.json(userAllOrders);
  } catch (err) {
    res.status(404);
    throw new Error(`Could not get all user's orders. Error: ${err}`);
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const deletedOrder: OrderType = await orderStore.deleteOrder(id);

  res.json(deletedOrder);
};

export const orderRoutes = (app: Application): void => {
  app.post('/orders/create', authenticateToken, create);
  app.get('/orders/active/:userId', authenticateToken, show);
  app.post('/orders/update-status', authenticateToken, updateOrderStatus);
  app.get('/orders/completed/:userId', authenticateToken, completedOrders);
  app.get('/orders/all/:userId', authenticateToken, index);
  app.delete('/orders/delete/:id', authenticateToken, destroy);
};
