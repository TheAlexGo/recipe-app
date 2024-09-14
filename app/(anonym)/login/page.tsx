import Link from 'next/link';

import { signIn } from '@/actions/user';
import { Form } from '@/components/Form';
import { getLocal, PkgKeys } from '@/utils/local';

export default function Login({
  searchParams: { message },
}: {
  searchParams: { message: string };
}) {
  return (
    <Form>
      <Form.Row>
        <Form.Title>Email</Form.Title>
        <Form.Input
          id="email"
          name="email"
          placeholder="alex280702@mail.ru"
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Title>{getLocal('form.password.label')}</Form.Title>
        <Form.Input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
      </Form.Row>
      <Form.Submit
        view="primary"
        formAction={signIn}
        pendingText={getLocal('actions.login.pending')}
      >
        {getLocal('actions.login.button')}
      </Form.Submit>
      <span>
        {getLocal('actions.login.link.withoutAccount')}?{' '}
        <Link href="/registration" className="underline">
          {getLocal('actions.login.link.registration')}
        </Link>
      </span>
      <div className="relative">
        {message && (
          <p className="absolute mt-4 text-center text-brand-danger">
            {getLocal(message as PkgKeys)}
          </p>
        )}
      </div>
    </Form>
  );
}
