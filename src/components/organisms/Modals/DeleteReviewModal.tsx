import { memo, useState } from "react";
import ModalSkeleton from "./ModalSkeleton";
import { ErrorText, Heading, Text } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { useDeleteComment } from "@/src/queries";
import { normalizeError } from "@/src/lib/helpers";

interface DeleteReviewModalProps {
  onClose: () => void;
  commentId: number;
  cardId: number;
}

const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({
  onClose,
  commentId,
  cardId,
}) => {
  const { isPending, mutate, isError } = useDeleteComment();

  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error: any) => {
    setErrorMessage(normalizeError(error.message));
  };

  const handleDeleteReview = () => {
    mutate({commentId, cardId}, { onError: handleError });
    onClose();
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Delete your review?" />
      <Text text="This action cannot be undone 🫣"/>

      <div className="flex w-full justify-between">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteReview}
          classes="bg-red text-white"
          disabled={isPending}
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          classes="bg-white text-black border border-black"
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </ModalSkeleton>
  );
};

export default memo(DeleteReviewModal);
