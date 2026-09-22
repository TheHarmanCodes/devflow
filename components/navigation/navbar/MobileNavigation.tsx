import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constant/routes";
import NavLinks from "./NavLinks";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/icons/hamburger.svg"
          alt="Menu"
          width={36}
          height={36}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none px-6"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>

        <Link href="/" className="flex items-center gap-1 py-3">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevFlow logo"
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 ">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">

            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>


          <div className="flex flex-col gap-3">
            <SheetClose
                nativeButton={false}
              render={
                <Link
                  href={ROUTES.SIGN_IN}
                  className="small-medium btn-secondary flex min-h-[41px]
                  w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 shadow-none"
                />
              }
            >
              <span className="text-[16px] primary-text-gradient">Log In</span>
            </SheetClose>
            <SheetClose
                nativeButton={false}
              render={
                <Link
                  href={ROUTES.SIGN_UP}
                  className="small-medium light-border-2 btn-tertiary text-dark400_light900
                  flex min-h-[41px] w-full items-center justify-center rounded-lg border px-4 py-3 shadow-none"
                />
              }
            >
              <span className="text-[16px]">Sign Up</span>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavigation;
