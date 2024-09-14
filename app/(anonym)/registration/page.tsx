import Link from 'next/link';

import { signUp } from '@/actions/user';
import { Form } from '@/components/Form';
import { getLocal, PkgKeys } from '@/utils/local';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <Form>
      <Form.Row>
        <Form.Title>{getLocal('form.firstname.label')}</Form.Title>
        <Form.Input
          id="firstname"
          name="firstname"
          placeholder="Александр"
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Title>{getLocal('form.lastname.label')}</Form.Title>
        <Form.Input
          id="lastname"
          name="lastname"
          placeholder="Гордеев"
          required
        />
      </Form.Row>
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
        formAction={signUp}
        pendingText={getLocal('actions.registration.pending')}
      >
        {getLocal('actions.registration.button')}
      </Form.Submit>
      <span>
        {getLocal('actions.registration.link.withAccount')}?{' '}
        <Link href="/login" className="underline">
          {getLocal('actions.registration.link.login')}
        </Link>
      </span>
      {searchParams?.message && (
        <p className="mt-4 text-center text-brand-danger">
          {getLocal(searchParams.message as PkgKeys)}
        </p>
      )}
    </Form>
  );
}
