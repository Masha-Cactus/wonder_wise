import { Tab } from "@/src/components/organisms";
import { Divider, Heading2, Heading4, Icons } from "@/src/components/atoms";
import {
  ImagesBlock,
  IconButton,
  SaveButton,
  LikeButton,
} from "@/src/components/moleculs/";
import { ICard } from "@/src/services";
import { memo } from "react";

type Props = {
  card: ICard;
};

const TripLongCard: React.FC<Props> = ({ card }) => {
  const tabs = {
    'Description': card.description,
    "Why this place?": card.whyThisPlace,
    'Map': card.mapLink,
  };

  return (
    <article
      className="flex flex-col gap-2
      justify-between items-center"
    >
      <Heading2 text={card.name} classes="text-3xl" font="semibold" />

      <div className="gap-2 w-full mt-1 grid grid-cols-12">
        <div className="w-full col-span-5">
          <div className="flex gap-2 items-center justify-start">
            <Icons.location />
            <Heading4 text={card.whereIs} font="normal"/>
          </div>

          <div className="mt-6 overflow-scroll max-h-[550px]">
            <Tab tabs={tabs} />
          </div>

          <SaveButton cardId={card.id} />
        </div>

        <div className="w-full h-full col-span-7">
          <div className="flex gap-4 w-full justify-end h-8">
            <LikeButton
              cardId={card.id}
              cardLikes={card.likes}
              classes=""
            />

            <Divider classes="w-px h-full bg-gray30" />

            <IconButton
              icon={<Icons.user />}
              text={
                card.author === "AI" ? "Generated by AI" : `by ${card.author}`
              }
              classes="bg-black text-white rounded-full px-2 py-1"
            />

            <IconButton
              icon={<Icons.report />}
              text="Report Issue"
              classes="bg-transparent border border-error 
              text-error rounded-full px-2 py-1"
            />

            <Divider classes="w-px h-full bg-gray30" />

            <IconButton icon={<Icons.edit />} classes="" />

            <Divider classes="w-px h-full bg-gray30" />

            <IconButton icon={<Icons.share />} classes="" />
          </div>
          <div className="w-full mt-6">
            <ImagesBlock images={card.imageLinks} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(TripLongCard);
