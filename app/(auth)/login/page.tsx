import Link from 'next/link';

import { signIn } from '@/actions/user';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { getLocal, PkgKeys } from '@/utils/local';

export default function Login({
  searchParams: { message },
}: {
  searchParams: { message: string };
}) {
  return (
    <form className="flex w-full flex-1 flex-col justify-center gap-3">
      <label className="flex flex-col" htmlFor="email">
        <span className="text-md">Email</span>
        <Input
          id="email"
          name="email"
          placeholder="alex280702@mail.ru"
          required
        />
      </label>
      <label className="flex flex-col" htmlFor="password">
        <span className="text-md">{getLocal('form.password.label')}</span>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
      </label>
      <Button.Submit
        view="primary"
        formAction={signIn}
        pendingText={getLocal('actions.login.pending')}
      >
        {getLocal('actions.login.button')}
      </Button.Submit>
      <span>
        {getLocal('actions.login.link.withoutAccount')}?{' '}
        <Link href="/registration">
          {getLocal('actions.login.link.registration')}
        </Link>
      </span>
      {message && (
        <p className="mt-4 text-center text-brand-danger">
          {getLocal(message as PkgKeys)}
        </p>
      )}
    </form>
  );
}
