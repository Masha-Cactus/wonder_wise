"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUp } from "@/src/services";
import { signUpSchema } from "@/src/validation";
import {
  PrimaryButton,
  TextInput,
} from "@/src/components/molecules";
import { useSignUp } from "@/src/queries";
import { trimObjectFields } from "@/src/lib/helpers";
import { ErrorText } from "@/src/components/atoms";
import { PasswordInput } from "@/src/components/molecules";
import { useNormalizedError } from "@/src/hooks";

type Props = {
  openConfirmEmailModal: () => void;
  openSignInModal: () => void;
};

const SignUpForm: React.FC<Props> 
= ({ openConfirmEmailModal, openSignInModal }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = signUpSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    values: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });
  
  const { isPending, mutate, isError } = useSignUp();

  const onSubmit = async (data: ISignUp) => {
    const trimmedUserData = trimObjectFields(data);

    mutate(trimmedUserData, {
      onError: (e) => setErrorMessage(e),
      onSuccess: (user) => {
        user.banned 
          ? openConfirmEmailModal()
          : openSignInModal();
      }
    });
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-4" 
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        type="email"
        name="email"
        label="Email"
        control={control}
        errorText={errors.email?.message}
        disabled={isPending}
      />

      <PasswordInput
        name="password"
        label="Password"
        control={control}
        errorText={errors.password?.message}
        disabled={isPending}
        placeholder="Enter your password"
      />

      <PasswordInput
        name="repeatPassword"
        label="Confirm password"
        control={control}
        errorText={errors.repeatPassword?.message}
        disabled={isPending}
        placeholder="Confirm password"
      />

      {isError && <ErrorText errorText={errorMessage} />}

      <PrimaryButton
        text="Create Account"
        classes=""
        type="submit"
        disabled={isPending}
      />
    </form>
  );
};

export default memo(SignUpForm);