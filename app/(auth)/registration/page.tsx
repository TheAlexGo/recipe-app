import Link from 'next/link';

import { signUp } from '@/actions/user';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { getLocal, PkgKeys } from '@/utils/local';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <form className="text-foreground flex w-full flex-1 flex-col justify-center gap-3">
      <label className="flex flex-col" htmlFor="firstname">
        <span className="text-md">{getLocal('form.firstname.label')}</span>
        <Input
          id="firstname"
          name="firstname"
          placeholder="Александр"
          required
        />
      </label>
      <label className="flex flex-col" htmlFor="lastname">
        <span className="text-md">{getLocal('form.lastname.label')}</span>
        <Input id="lastname" name="lastname" placeholder="Гордеев" required />
      </label>
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
        formAction={signUp}
        pendingText={getLocal('actions.registration.pending')}
      >
        {getLocal('actions.registration.button')}
      </Button.Submit>
      <span>
        {getLocal('actions.registration.link.withAccount')}?{' '}
        <Link href="/login">{getLocal('actions.registration.link.login')}</Link>
      </span>
      {searchParams?.message && (
        <p className="mt-4 text-center text-brand-danger">
          {getLocal(searchParams.message as PkgKeys)}
        </p>
      )}
    </form>
  );
}
