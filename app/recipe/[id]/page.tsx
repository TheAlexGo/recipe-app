import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { PiPizza } from 'react-icons/pi';
import { TbHeartPlus } from 'react-icons/tb';

import { getRecipe, Units } from '@/app/_actions/getRecipe';
import { CollapsedText } from '@/app/_components/CollapsedText';
import { DetailTime } from '@/app/_components/Detail/DetailTime';
import { Nutritions } from '@/app/_components/Nutritions';
import { TabsContent } from '@/app/recipe/[id]/_components/TabsContent/TabsContent';

export default async function Recipe({ params }: { params: { id: string } }) {
  const { title, lessTitle, description, cover, cookingTime, nutritions } =
    await getRecipe(params.id);
  return (
    <article className="-mx-6 -mt-3 flex h-full flex-col pb-4">
      <div className="relative h-80 bg-recipe-overlay">
        <Image
          className="-z-10"
          priority
          src={cover}
          alt={`Обложка для ${title}`}
          fill
        />
        <button
          type="button"
          className="absolute left-6 top-3 rounded-xl bg-white p-2"
          aria-label="Закрыть"
        >
          <IoClose className="size-6" />
        </button>
        <button
          type="button"
          className="absolute right-6 top-3 rounded-xl bg-white p-2"
          aria-label="В избранное"
        >
          <TbHeartPlus className="size-6" />
        </button>
      </div>
      <div className="-my-10 flex-1 rounded-se-recipe-container rounded-ss-recipe-container bg-white px-6 pb-10 before:mx-auto before:mb-6 before:mt-3 before:block before:h-1 before:w-14 before:bg-neutral-gray-3">
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">{lessTitle}</h1>
          <DetailTime className="text-neutral-gray-5" time={cookingTime} />
        </header>
        <CollapsedText>{description}</CollapsedText>
        <Nutritions className="mt-4">
          {nutritions.map(({ type, unit, value, icon }) => {
            return (
              <Nutritions.Item key={type} icon={icon}>
                {value}
                {unit !== Units.KCAL && unit} {type}
              </Nutritions.Item>
            );
          })}
        </Nutritions>
        <TabsContent
          items={[
            {
              id: 'ingredients',
            },
            {
              id: 'instructions',
            },
          ]}
        />
      </div>
    </article>
  );
}
