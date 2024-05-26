/* eslint-disable max-len */
"use client";

import { useUser } from "@/src/store/user";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import {
  ConfirmEmailModal,
  RestorePasswordModal,
  SignInModal,
  SignUpModal,
} from "@/src/components/organisms";
import { Navbar } from "@/src/components/moleculs";

const Header: React.FC = () => {
  const { user } = useUser();
  const [isShowSignInModal, setIsShowSignInModal] = useState(false);
  const [isShowSignUpModal, setIsShowSignUpModal] = useState(false);
  const [isShowConfirmEmailModal, setIsShowConfirmEmailModal] = useState(false);
  const [isShowRestorePasswordModal, setIsShowRestorePasswordModal] = useState(false);

  return (
    <header
      className="flex items-center justify-between 
    mx-10 my-7"
    >
      <Link href="/" className="text-3xl font-bold text-red-800">
        <Image
          src="/logo.svg"
          alt="logo"
          width={192}
          height={40}
          priority={true}
        />
      </Link>
      {user ? (
        <Navbar />
      ) : (
        <div className="flex gap-8">
          <button
            className="text-black flex justify-center items-center"
            onClick={() => setIsShowSignInModal(true)}
          >
            Login
          </button>
          <button
            className="w-36 h-14 bg-black text-white flex 
            justify-center items-center rounded-full"
            onClick={() => setIsShowSignUpModal(true)}
          >
            Sign Up
          </button>
        </div>
      )}

      {isShowSignInModal && (
        <SignInModal
          onClose={() => setIsShowSignInModal(false)}
          onOpenSignUp={() => setIsShowSignUpModal(true)}
          onOpenRestorePassword={() => setIsShowRestorePasswordModal(true)}
        />
      )}

      {isShowSignUpModal && (
        <SignUpModal
          onClose={() => setIsShowSignUpModal(false)}
          onOpenSignIn={() => setIsShowSignInModal(true)}
          onOpenConfirmEmail={() => setIsShowConfirmEmailModal(true)}
        />
      )}

      {isShowRestorePasswordModal && (
        <RestorePasswordModal 
          onClose={() => setIsShowRestorePasswordModal(false)}
          onOpenSignIn={() => setIsShowSignInModal(true)}
          onOpenSignUp={() => setIsShowSignUpModal(true)}
        />
      )}

      {isShowConfirmEmailModal && (
        <ConfirmEmailModal 
          type="Confirm" 
          onClose={() => setIsShowConfirmEmailModal(false)}
        />
      )}
    </header>
  );
};

export default memo(Header);
