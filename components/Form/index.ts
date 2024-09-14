import { Button } from '@/components/Button';
import { Row } from '@/components/Form/Row/Row';
import { Title } from '@/components/Form/Title';
import { Input } from '@/components/Input';

import { Form as Core } from './Form';

export const Form = Object.assign(Core, {
  Title,
  Row,
  Input,
  Submit: Button.Submit,
});
