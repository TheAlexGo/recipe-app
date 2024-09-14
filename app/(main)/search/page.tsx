import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { getLocal } from '@/utils/local';

export default async function Search() {
  return (
    <div>
      <Header>
        <Header.Title>{getLocal('page.search.title')}</Header.Title>
      </Header>
      <Input.Search />
    </div>
  );
}
