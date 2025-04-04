import { app } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const auth = getAuth(app);
auth.setPersistence;

export function LoginFormContainer() {
  const [showRegister, setShowRegister] = React.useState(false);

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>
      {showRegister ? <RegisterForm /> : <LoginForm />}
      <a>
        <button
          className="text-neutral-600 text-sm dark:text-neutral-300 mt-4"
          onClick={() => setShowRegister(!showRegister)}
        >
          {showRegister
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </button>
      </a>
    </div>
  );
}

export function LoginForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return;
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const idToken = await userCredential.user.getIdToken();

    try {
      const response = await fetch("/api/auth/signin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      if (response.redirected) {
        window.location.assign(response.url);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form className="my-8" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          placeholder="projectmayhem@fc.com"
          type="email"
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="••••••••"
          type="password"
        />
      </LabelInputContainer>

      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        Sign in &rarr;
        <BottomGradient />
      </button>
    </form>
  );
}

export function RegisterForm() {
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success("Account created successfully");

      // Redirect to the home page
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form className="my-8" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="name">Username</Label>
        <Input id="name" name="name" placeholder="Durden" type="text" />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          placeholder="projectmayhem@fc.com"
          type="email"
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="••••••••"
          type="password"
        />
      </LabelInputContainer>

      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        Sign up &rarr;
        <BottomGradient />
      </button>
    </form>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
