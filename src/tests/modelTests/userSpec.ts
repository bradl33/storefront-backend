import { UserStore } from '../../models/user';

const store = new UserStore();

describe('User model', (): void => {
  it('has createUser method', (): void => {
    expect(store.createUser).toBeDefined();
  });

  it('has authenticate method', (): void => {
    expect(store.authenticate).toBeDefined();
  });

  it('has getOneUserById method', (): void => {
    expect(store.getOneUserById).toBeDefined();
  });

  it('has getAllUsers method', (): void => {
    expect(store.getAllUsers).toBeDefined();
  });

  it('has deleteUser method', (): void => {
    expect(store.deleteUser).toBeDefined();
  });

  it('createUser method creates a user', async (): Promise<void> => {
    const result = await store.createUser({
      firstname: 'John',
      lastname: 'Doe UserSpec',
      username: 'john_doe',
      password: 'pass_john'
    });

    expect(result).toEqual({
      firstname: 'John',
      lastname: 'Doe UserSpec',
      username: 'john_doe'
    });
  });

  it('getOneUserById method returns user by id', async (): Promise<void> => {
    const result = await store.getOneUserById(1);

    expect(result).toEqual({
      firstname: 'Jane',
      lastname: 'Doe OrderSpec',
      username: 'jane_doe'
    });
  });

  it('getAllUsers method returns all users', async (): Promise<void> => {
    const result = await store.getAllUsers();

    expect(result).toEqual([
      {
        firstname: 'Jane',
        lastname: 'Doe OrderSpec',
        username: 'jane_doe'
      },
      {
        firstname: 'John',
        lastname: 'Doe UserSpec',
        username: 'john_doe'
      }
    ]);
  });

  // it('deleteUser method deletes user by id', async (): Promise<void> => {
  //   const result = await store.deleteUser(1);
  //   expect(result)
  //   .toEqual({
  //     firstname: 'Jane',
  //     lastname: 'Doe OrderSpec',
  //     username: 'jane_doe'
  //   });
  // });
});
