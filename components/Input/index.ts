import { ImageFile } from './ImageFile';
import { Input as Core } from './Input';
import { Search } from './Search';
import { TextArea } from './TextArea';

export const Input = Object.assign(Core, {
  Search,
  TextArea,
  Image: ImageFile,
});
