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

import Image from 'next/image';

import { IUser } from '@/actions/getUser';
import { SubmitButton } from '@/app/profile/settings/_components/UserForm/SubmitButton';
import { submitHandler } from '@/app/profile/settings/_components/UserForm/action';
import { Input } from '@/components/Input';
import { useLoadImage } from '@/hooks/useLoadImage';
import { compressFile, mutateInputFiles } from '@/utils/file';
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

  const avatarChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    async ({ target }) => {
      if (target.files?.length) {
        let file = target.files[0];
        if (file.size > 1_000_000) {
          file = await compressFile(target.files[0], {
            maxSizeMB: 1,
          });
        }
        setAvatar(URL.createObjectURL(file));
        mutateInputFiles(target, file);
      }
    },
    [],
  );

  useEffect(() => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setAvatar(avatarSrc);
  }, [avatarSrc, user.firstname, user.lastname]);

  return (
    <form className="mt-3 flex flex-col gap-y-3" action={submitHandler}>
      <label htmlFor="avatar">
        <Image
          className="size-32 object-cover"
          src={avatar}
          width={128}
          height={128}
          priority
          alt={getLocal('images.alt.avatar')}
        />
        <Input
          className="hidden"
          id="avatar"
          type="file"
          name="avatar"
          onChange={avatarChangeHandler}
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
      {dataChanged && <SubmitButton>{getLocal('form.save')}</SubmitButton>}
    </form>
  );
};
