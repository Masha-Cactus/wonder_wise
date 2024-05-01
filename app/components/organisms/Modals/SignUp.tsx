"use client";

import { z } from "zod";
import { useEffect, useState } from "react";

import { PWD_REGEX } from "@/app/lib/constants";
import { validateForm } from "@/app/lib/validateForm";
import { PrimaryBtn, LoginInput } from "@/app/components/moleculs/";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const SignUp = () => {
  const [user, setUser] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
    setError((curr) => ({ ...curr, name: "" }));
  }, [user.name]);

  useEffect(() => {
    setError((curr) => ({ ...curr, email: "" }));
  }, [user.email]);

  useEffect(() => {
    setError((curr) => ({ ...curr, password: "" }));
  }, [user.password]);

  useEffect(() => {
    setError((curr) => ({ ...curr, confirm: "" }));
  }, [user.confirm]);

  const formSchema = z
    .object({
      name: z.string().trim().min(1),
      email: z.coerce.string().trim().email(),
      password: z.string().trim().regex(PWD_REGEX, {
        message: `Password must contain at least 8 characters, including at least one letter and one digit`,
      }),
      confirm: z
        .string()
        .trim()
        .refine((value) => value === user.password, {
          message: "Confirmation must be equal to 'password'",
          path: ["confirm"],
        }),
    })
    .required();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await validateForm<FormData>(user, formSchema);

    if (result.isValid) {
      // make api call
    } else {
      Object.entries(result.formErrors).forEach(([key, msg]) =>
        setError((c) => ({ ...c, [key]: msg }))
      );
    }
  };

  return (
    <div
      className=" w-full h-full
    flex items-center justify-center flex-col"
    >
      <form
        action=""
        className="flex flex-col gap-4 h-full w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        {Object.keys(user).map((key) => (
          <LoginInput
            key={key}
            name={key}
            value={user[key as keyof FormData]}
            setUser={setUser}
            error={error}
            user={user}
          />
        ))}

        <PrimaryBtn text="Sign Up" classes="" onClick={() => {}} />
      </form>
    </div>
  );
};

export default SignUp;
