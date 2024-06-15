'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNormalizedError } from "@/src/hooks";
import { useUpdatePassword } from "@/src/queries";
import { IUpdatePassword } from "@/src/services";
import { changePasswordSchema } from "@/src/validation";
import { ErrorText } from "@/src/components/atoms";
import { PasswordInput, PrimaryButton } from "@/src/components/molecules";

type Props = {
  closeModal: () => void;
};

const ChangePasswordForm: React.FC<Props> = ({ closeModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = changePasswordSchema();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IUpdatePassword, 'userId'>>({
    values: {
      oldPassword: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useUpdatePassword();

  const onSubmit: SubmitHandler<Omit<IUpdatePassword, 'userId'>> 
  = async(data) => {
    mutate(data, {
      onError: (e) => setErrorMessage(e),
      onSuccess: closeModal,
    });
  };

  return (
    <form
      className="grid h-full w-full grid-cols-2 gap-x-4 gap-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-1">
        <PasswordInput 
          name="oldPassword"
          label="Current password"
          control={control}
          errorText={errors.oldPassword?.message}
          disabled={isPending}
        />
      </div>


      <div className="row-start-2">
        <PasswordInput 
          name="password"
          label="New password"
          control={control}
          errorText={errors.password?.message}
          disabled={isPending}
        />
      </div>
      <div className="row-start-2">
        <PasswordInput 
          name="repeatPassword"
          label="Repeat new password"
          control={control}
          errorText={errors.repeatPassword?.message}
          disabled={isPending}
        />
      </div>

      <PrimaryButton 
        text="Save" 
        disabled={isPending} 
        type='submit' 
        classes="row-start-3 col-span-2" 
      />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ChangePasswordForm;