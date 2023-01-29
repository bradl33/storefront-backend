import { Application, Request, Response } from 'express';
import { UserStore, UserType, UserReturnType } from '../models/user';
import { authenticateToken } from '../auth/jsonToken';

const userStore: UserStore = new UserStore();

//create user
const create = async (req: Request, res: Response): Promise<void> => {
  const { firstname, lastname, username, password } = req.body;

  const user: UserType = {
    firstname: firstname,
    lastname: lastname,
    username: username,
    password: password
  };

  try {
    await userStore.createUser(user);
    res.sendStatus(201).json('User Registration Successful');
  } catch (err) {
    res.status(400);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const auth = await userStore.authenticate(req.body);

  res.json(auth);
};

// get user with supplied id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.userId);
    const oneUser: UserReturnType = await userStore.getOneUserById(userId);

    res.json(oneUser);
  } catch (err) {
    res.send(404);
    throw new Error(`Could not get all users. Error: ${err}`);
  }
};

//get all users
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers: UserReturnType[] = await userStore.getAllUsers();

    res.json(allUsers);
  } catch (err) {
    res.status(404);
    throw new Error(`Could not get all users. Error: ${err}`);
  }
};

//delete a user by id
const destroy = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const deletedUser: UserReturnType = await userStore.deleteUser(id);
  res.json(deletedUser);
};

export const userRoutes = (app: Application): void => {
  app.post('/users/login', login);
  app.post('/users/create', create);
  app.get('/users/:userId', authenticateToken, show);
  app.get('/users/', authenticateToken, index);
  app.delete('/users/delete/:id', authenticateToken, destroy);
};
