import { User } from '../../@types/users';
import UserService from '../../models/users';
describe ('Test the users model', () => {
    it ('Index function must be there in the module ', () => {
        const index  = UserService.getUserData;

        expect(index).toBeDefined();
    });

    it ('Create function must be defined in the model', () => {
        const create = UserService.create ;

        expect(create).toBeDefined();
    });


    it ('Get user function must be defined in the model', () => {
        const getUser = UserService.getUserDataByID ;

        expect(getUser).toBeDefined();
    });

    it ('Should Create new user successfully ', async () => {
        const user: User = {
            firstName: 'John',
            lastName: 'Doe',
            password: '123456',
            username: 'johndoe',
        };

        const newUser = await UserService.create(user);

        expect(newUser).toBeDefined();
        expect(newUser.firstName).toBe(user.firstName);
        expect(newUser.lastName).toBe(user.lastName);
        expect(newUser.username).toBe(user.username);
    });

    it ('Should get user data by username', async () => {
        const USER_NAME = 'johndoe';

        const user = await UserService.getUserData(USER_NAME);


        expect(user).toBeDefined();
        expect(user.username).toBe(USER_NAME);
        expect(user.firstName).toBeInstanceOf(String);
        expect(user.lastName).toBeInstanceOf(String);
        expect(user.password).toBeInstanceOf(String);
    });

       it ('Should get user data by id', async () => {
        const USER_ID = 1;

        const user = await UserService.getUserDataByID(USER_ID);

        expect(user).toBeDefined();
        expect(user.username).toBeInstanceOf(String);
        expect(user.firstName).toBeInstanceOf(String);
        expect(user.lastName).toBeInstanceOf(String);
        expect(user.password).toBeUndefined();
    });

});