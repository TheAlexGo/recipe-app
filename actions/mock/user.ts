import { IUser } from '@/actions/user';

export const getUserMock = async (): Promise<IUser> =>
  ({
    id: 'userMockId',
    firstname: 'Тест',
    lastname: 'Тестов',
    avatarUrl: '/',
    get fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  }) as IUser;
