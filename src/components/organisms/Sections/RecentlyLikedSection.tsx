import { PrimaryButton } from "@/src/components/moleculs";
import { TripShortCard } from "@/src/components/organisms";
// import { useUser } from "@/src/store/user";
import { useGetUserCollections } from "@/src/queries/user.queries";
import { memo } from "react";

const RecentlyLikedSection: React.FC = () => {
  //   const { user } = useUser();
  const { data: collections } = useGetUserCollections();
  const likedCards = collections?.find(
    (collection) => collection.name === "Liked cards"
  )?.cards;

  return (
    <div
      className="bg-white p-6 rounded-2xl flex flex-col gap-2 
 h-max"
    >
      <p className="text-2xl font-semibold">Cards you&apos;ve recently liked</p>
      {likedCards && likedCards.length > 0 ? (
        <div className="">
          {likedCards.map((trip) => (
            <TripShortCard key={trip.id} card={trip} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-xl font-normal text-gray80">
            You don&apos;t have any liked cards yet. Wanna find some?
          </p>
          <PrimaryButton text="Explore" classes="w-1/6" type="button" />
        </div>
      )}
    </div>
  );
};

export default memo(RecentlyLikedSection);
