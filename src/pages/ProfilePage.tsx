import { LoginForm, RegisterForm } from "@/components/LoginFormContainer";
import { ProfileMatches } from "@/components/ProfileMatches";
import { SignoutButton } from "@/components/SignoutButton";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export const ProfilePage = () => {
  const [showRegister, setShowRegister] = useState(false);

  const { user } = useAuth();

  return (
    <>
      {user && (
        <section className="flex flex-col items-center">
          <img
            src="/images/placeholder.jpg"
            className="rounded-full w-32 h-32 m-5"
            alt="placeholder"
            style={{ viewTransitionName: "profile-img" }}
          />
          <SignoutButton />
          <ProfileMatches />
        </section>
      )}
      {!user && (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Bienvenido a SlamStats
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Inicia sesión con tu cuenta de SlamStats
          </p>
          {showRegister ? <RegisterForm /> : <LoginForm />}
          <a
            className="cursor-pointer text-neutral-600 text-sm dark:text-neutral-300 mt-4"
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister
              ? "Ya tienes una cuenta? Inicia sesión"
              : "No tienes una cuenta? Registrate"}
          </a>
        </div>
      )}
    </>
  );
};
