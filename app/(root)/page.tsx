import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constant/routes";

const Home = async () => {
  const session = await auth();

  // console.log(session);

  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      <h1 className="font-bold text-2xl font-space-grotesk">
        Welcome to Ultimate Next.js
      </h1>

      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit" className="cursor-pointer">
          Log out
        </Button>
      </form>
    </div>
  );
};

export default Home;
