import Image from "next/image";
import Link from "next/link";

import { Divider } from "@/src/components/atoms";
import { IconButton, PrimaryBtn, Icons } from "@/src/components/moleculs/";
import { ICard } from "@/src/types/Card";
import { useSaveCard } from "@/src/queries/card.queries";

type Props = {
  card: ICard;
};

const classes = "bg-gray80 text-white rounded-full px-4 py-2";

const TripMedium: React.FC<Props> = ({ card }) => {
  const { mutate } = useSaveCard();

  const saveCard = (id: number) => {
    mutate(id);
  };

  return (
    <article
      className="flex flex-col gap-4 justify-between items-center 
      round bg-white p-4"
    >
      <Link href={`/trips/${card.id}`} className="w-full">
        <Image
          src={card.imageLinks[0]}
          alt={card.name}
          width={200}
          height={200}
          className="w-full h-full object-cover round"
        />
      </Link>
      <Link href={`/trips/${card.id}`} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <IconButton
            icon={<Icons.heart />}
            text={card.likes.toString()}
            classes={classes}
          />

          <IconButton icon={<Icons.share />} text="Share" classes={classes} />

          <IconButton icon={<Icons.report />} text="Report" classes={classes} />

          <IconButton
            icon={<Icons.user />}
            text={card.author === "AI" ? "AI" : "User"}
            classes={classes}
          />
        </div>
        <Divider classes="w-full h-px" />
        <h2 className="text-xl font-medium">{card.name}</h2>
        <p className="text-base font-regular">{card.whereIs}</p>
      </Link>

      <PrimaryBtn text="Save" onClick={() => saveCard(card.id)} />
    </article>
  );
};

export default TripMedium;
