import Link from 'next/link';

import { signUp } from '@/actions/login';
import { getLocal } from '@/utils/local';

import { SubmitButton } from '../_components/SubmitButton/SubmitButton';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form className="text-foreground flex w-full flex-1 flex-col justify-center gap-2">
        <label className="flex flex-col" htmlFor="firstname">
          <span className="text-md">{getLocal('form.firstname.label')}</span>
          <input
            id="firstname"
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="firstname"
            placeholder="Александр"
            required
          />
        </label>
        <label className="flex flex-col" htmlFor="lastname">
          <span className="text-md">{getLocal('form.lastname.label')}</span>
          <input
            id="lastname"
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="lastname"
            placeholder="Гордеев"
            required
          />
        </label>
        <label className="flex flex-col" htmlFor="email">
          <span className="text-md">Email</span>
          <input
            id="email"
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="flex flex-col" htmlFor="password">
          <span className="text-md">{getLocal('form.password.label')}</span>
          <input
            id="password"
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </label>
        <SubmitButton
          formAction={signUp}
          className="mb-2 rounded-md bg-green-700 px-4 py-2 text-white"
          pendingText={getLocal('actions.registration.pending')}
        >
          {getLocal('actions.registration.button')}
        </SubmitButton>
        <span>
          {getLocal('actions.registration.link.withAccount')}?{' '}
          <Link href="/login">
            {getLocal('actions.registration.link.login')}
          </Link>
        </span>
        {searchParams?.message && (
          <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
