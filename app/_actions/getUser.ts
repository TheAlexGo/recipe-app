export interface IUser {
  firstname: string;
  lastname: string;
  get fullname(): string;
}

/**
 * Получаем текущего пользователя
 */
export const getUser = async (): Promise<IUser> =>
  ({
    firstname: 'Alena',
    lastname: 'Sabyan',
    get fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  }) as IUser;
