import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MdOutlineGrass } from 'react-icons/md';
import { PiAvocado, PiPizza } from 'react-icons/pi';
import { TbCampfire, TbEdit } from 'react-icons/tb';

import { isFavoriteRecipe } from '@/actions/favorite';
import { NutritionTypes, Units } from '@/actions/models/Nutritions';
import { getRecipe } from '@/actions/recipe';
import { getUser } from '@/actions/user';
import { ButtonClose } from '@/app/recipe/[id]/_components/ButtonClose/ButtonClose';
import { Button } from '@/components/Button';
import { CollapsedText } from '@/components/CollapsedText';
import { DetailTime } from '@/components/Detail/DetailTime';
import { Nutritions } from '@/components/Nutritions';
import { useLoadImage } from '@/hooks/useLoadImage';
import { getLocal } from '@/utils/local';

import { IngredientsPanel } from './_components/TabsContent/IngredientsPanel';
import { InstructionPanel } from './_components/TabsContent/InstructionPanel';
import { TabsContent } from './_components/TabsContent/TabsContent';

export default async function Recipe({ params }: { params: { id: string } }) {
  const { id } = await getUser();
  const recipeId = Number(params.id);
  const recipe = await getRecipe(recipeId);
  const isFavorite = await isFavoriteRecipe(recipeId);

  if (!recipe) {
    notFound();
  }

  const isOwner = id === recipe.user_id;

  const {
    less_title,
    description,
    cover_url: _cover_url,
    cooking_time,
    nutritions,
    ingredients,
    steps,
  } = recipe;
  const cover_url = useLoadImage('recipe_covers', _cover_url);

  return (
    <article className="-mx-6 -mt-3 flex h-full flex-col pb-4">
      <div className="relative h-80 bg-recipe-overlay">
        <Image
          className="-z-10 object-cover"
          priority
          src={cover_url}
          alt={getLocal('images.alt.recipe.cover')}
          fill
        />
        <div className="fixed top-3 m-auto flex w-full max-w-5xl justify-between px-6">
          <ButtonClose />
          <div className="flex gap-x-3">
            {isOwner && (
              <Button.Icon
                href="edit"
                icon={TbEdit}
                size="normal"
                tabIndex={-1}
              />
            )}
            <Button.Favorite
              id={recipeId}
              size="normal"
              favorite={isFavorite}
            />
          </div>
        </div>
      </div>
      <div className="-my-10 flex-1 rounded-se-recipe-container rounded-ss-recipe-container bg-white px-6 pb-10 before:mx-auto before:mb-6 before:mt-3 before:block before:h-1 before:w-14 before:bg-neutral-gray-3">
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">{less_title}</h1>
          <DetailTime
            className="shrink-0 text-neutral-gray-5"
            time={cooking_time}
          />
        </header>
        <CollapsedText>{description}</CollapsedText>
        {Boolean(nutritions.length) && (
          <Nutritions className="mt-4">
            {nutritions.map(({ type, unit, value }) => {
              let icon;
              switch (type) {
                case NutritionTypes.CARBS:
                  icon = MdOutlineGrass;
                  break;
                case NutritionTypes.PROTEINS:
                  icon = PiAvocado;
                  break;
                case NutritionTypes.KCAL:
                  icon = TbCampfire;
                  break;
                case NutritionTypes.FATS:
                  icon = PiPizza;
                  break;
                default:
                  break;
              }

              return (
                <Nutritions.Item key={type} icon={icon!}>
                  {value}
                  {unit !== Units.KCAL && unit}{' '}
                  {getLocal(`nutrition.${type}.title`)}
                </Nutritions.Item>
              );
            })}
          </Nutritions>
        )}
        <TabsContent
          items={[
            {
              tab: {
                id: 'ingredients',
              },
              panel: <IngredientsPanel items={ingredients} />,
            },
            {
              tab: {
                id: 'instruction',
              },
              panel: <InstructionPanel steps={steps} />,
            },
          ]}
        />
      </div>
    </article>
  );
}
