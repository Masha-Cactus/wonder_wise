'use client';

import { useNormalizedError } from "@/src/hooks/useNormalizedError";
import { trimObjectFields } from "@/src/lib/helpers";
import { useReportCard, useReportComment } from "@/src/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";
import { TextAreaInput, PrimaryButton } from "@/src/components/moleculs";
import { useParams } from "next/navigation";
import { reportCardSchema } from "@/src/validation";
import { IComment } from "@/src/services";

type Props = {
  closeModal: () => void;
  type: 'Card' | 'Comment';
  comment?: IComment;
};

type ReportFormData = {
  text: string;
};

const ReportForm: React.FC<Props> = ({ closeModal, type, comment }) => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useNormalizedError();

  const validationSchema = reportCardSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    values: {
      text: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  const { 
    isPending: isReportCardPending, 
    mutate: reportCard, 
    isError: isReportCardError, 
  } = useReportCard();

  const { 
    isPending: isReportCommentPending, 
    mutate: reportComment,
    isError: isReportCommentError,
  } = useReportComment();

  const onSubmit = async (data: ReportFormData) => {
    const { text } = trimObjectFields(data);

    if (type === 'Comment' && comment) {
      reportComment({ 
        reportText: text, 
        commentAuthor: comment.author, 
        commentText: comment.text,
        id: comment.id, 
      }, {
        onError: handleError,
        onSuccess: () => closeModal(),
      });

      return;
    }
    
    if (type === 'Card' && id) {
      reportCard({text, cardId: +id}, {
        onError: handleError,
        onSuccess: () => closeModal(),
      });
    }
  };

  const isPending = isReportCardPending || isReportCommentPending;

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full flex flex-col gap-8"
    >
      <TextAreaInput
        name="text"
        control={control}
        errorText={errors.text?.message}
        disabled={isPending}
        placeholder="Type your issue here..."
      />
      <PrimaryButton type="submit" text="Send" disabled={isPending} />

      {(isReportCardError || isReportCommentError) && (
        <ErrorText errorText={errorMessage} />
      )}
    </form>
  );
};

export default ReportForm;