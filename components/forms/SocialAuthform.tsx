"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "../ui/toast";
import { signIn } from "next-auth/react";
import ROUTES from "@/constant/routes";

const SocialAuthform = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 rounded-2 flex-1 px-4 py-3.5 cursor-pointer";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (err) {
      console.log(err);

      toast.add({
        type: "error",
        title: "Sign-in Failed",
        description:
          err instanceof Error
            ? err.message
            : "An error occurred during sign-in",
        priority: "high",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="GitHub logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
          loading="eager"
        />
        <span>Log in with GitHub</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className=" mr-2.5 object-contain"
          loading="eager"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthform;
