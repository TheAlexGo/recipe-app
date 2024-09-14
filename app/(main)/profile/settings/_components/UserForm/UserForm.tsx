'use client';

import {
  ChangeEventHandler,
  FC,
  JSX,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { IUser } from '@/actions/user';
import { submitHandler } from '@/app/(main)/profile/settings/_components/UserForm/action';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useLoadImage } from '@/hooks/useLoadImage';
import { getLocal } from '@/utils/local';

interface IUserForm {
  user: IUser;
}

export const UserForm: FC<IUserForm> = ({ user }): JSX.Element => {
  const avatarSrc = useLoadImage('user_avatars', user.avatarUrl);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [avatar, setAvatar] = useState(avatarSrc);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const firstnameChangeHandler: ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => {
      setFirstname(target.value);
    }, []);

  const lastnameChangeHandler: ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => {
      setLastname(target.value);
    }, []);

  const avatarLoadingHandler = useCallback(() => {
    setAvatarLoading(true);
  }, []);

  const avatarLoadedHandler = useCallback(() => {
    setAvatarLoading(false);
  }, []);

  useEffect(() => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setAvatar(avatarSrc);
  }, [avatarSrc, user.firstname, user.lastname]);

  return (
    <form className="mt-3 flex flex-1 flex-col justify-between gap-y-3">
      <div>
        <label htmlFor="avatar">
          <span>{getLocal('form.avatar.label')}</span>
          <Input.Image
            id="avatar"
            name="avatar"
            value={avatar}
            onChange={setAvatar}
            onLoading={avatarLoadingHandler}
            onLoaded={avatarLoadedHandler}
            alt={getLocal('images.alt.avatar')}
          />
        </label>
        <label htmlFor="firstname">
          <span>{getLocal('form.firstname.label')}</span>
          <Input
            id="firstname"
            type="text"
            value={firstname}
            onChange={firstnameChangeHandler}
            name="firstname"
          />
        </label>
        <label htmlFor="lastname">
          <span>{getLocal('form.lastname.label')}</span>
          <Input
            id="lastname"
            type="text"
            value={lastname}
            onChange={lastnameChangeHandler}
            name="lastname"
          />
        </label>
      </div>
      <Button.Submit
        view="primary"
        formAction={submitHandler}
        disabled={avatarLoading}
      >
        {getLocal('form.save')}
      </Button.Submit>
    </form>
  );
};
