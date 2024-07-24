'use client';

import {
  ChangeEventHandler,
  FC,
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import cn from 'classnames';
import Image from 'next/image';

import { IUser } from '@/actions/user';
import { submitHandler } from '@/app/profile/settings/_components/UserForm/action';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Spinner } from '@/components/Spinner';
import { useLoadImage } from '@/hooks/useLoadImage';
import { useUploadImage } from '@/hooks/useUploadImage';
import { getLocal } from '@/utils/local';

interface IUserForm {
  user: IUser;
}

export const UserForm: FC<IUserForm> = ({ user }): JSX.Element => {
  const avatarSrc = useLoadImage('user_avatars', user.avatarUrl);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [avatar, setAvatar] = useState(avatarSrc);

  const dataChanged = useMemo(() => {
    return (
      firstname !== user.firstname ||
      lastname !== user.lastname ||
      avatar !== avatarSrc
    );
  }, [avatar, firstname, lastname, avatarSrc, user.firstname, user.lastname]);

  const firstnameChangeHandler: ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => {
      setFirstname(target.value);
    }, []);

  const lastnameChangeHandler: ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => {
      setLastname(target.value);
    }, []);

  const { changeHandler, loading } = useUploadImage({
    setImage: setAvatar,
  });

  useEffect(() => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setAvatar(avatarSrc);
  }, [avatarSrc, user.firstname, user.lastname]);

  return (
    <form className="mt-3 flex flex-col gap-y-3">
      <label htmlFor="avatar">
        <span>{getLocal('form.avatar.label')}</span>
        <div className="relative size-32">
          <Image
            className={cn('size-32 object-cover', {
              'opacity-50': loading,
            })}
            src={avatar}
            width={128}
            height={128}
            priority
            alt={getLocal('images.alt.avatar')}
          />
          {loading && <Spinner size="normal" position="absolute" />}
        </div>
        <Input
          className="hidden"
          id="avatar"
          type="file"
          name="avatar"
          onChange={changeHandler}
          accept="image/*"
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
      {dataChanged && (
        <Button.Submit
          view="primary"
          formAction={submitHandler}
          disabled={loading}
        >
          {getLocal('form.save')}
        </Button.Submit>
      )}
    </form>
  );
};
