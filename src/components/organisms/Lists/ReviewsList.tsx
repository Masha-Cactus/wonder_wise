"use client";

import { ReviewCard } from "@/src/components/organisms";
import { Divider, Heading5, Heading3, Heading4 } from "@/src/components/atoms";
import { IComment } from "@/src/services";
import { memo, useState } from "react";
import CreateReviewModal from "../Modals/CreateReviewModal";

type Props = {
  reviews: IComment[];
};

const ReviewsList: React.FC<Props> = ({ reviews }) => {
  const [isPostReviewModal, setIsReviewModal] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex justify-between">
        <div className="flex justify-between gap-2 items-center">
          <div className="flex gap-2">
            <Heading3 text="Reviews" />
            <Heading4 text={`(${reviews?.length || 0})`} font="normal" classes="text-gray30" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsReviewModal(true)}
        >
          <Heading5
            text="Post review" 
            font="semibold" 
            classes="underline underline-offset-8"
          />
        </button>
      </div>

      <Divider classes="h-px w-full bg-gray30" />

      <div className="flex gap-4 overflow-x-scroll">
        {reviews.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>

      {isPostReviewModal && (
        <CreateReviewModal
          onClose={() => setIsReviewModal(false)}
        />
      )}
    </div>
  );
};

export default memo(ReviewsList);
