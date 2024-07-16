import { Icon } from '@/components/Button/components/Icon';

import { Button as Core } from './Button';
import { Close } from './components/Close';
import { Favorite } from './components/Favorite';
import { Link } from './components/Link';
import { Submit } from './components/Submit';

export const Button = Object.assign(Core, {
  Close,
  Link,
  Submit,
  Favorite,
  Icon,
});
