import { authedBasket, logOut, logIn } from "@/lib/Actions";
import { User } from "../../../types";
import Link from "next/link";

function LogIn({ link }: { link: string }) {
  return <Link href={link}>Log in</Link>;
}

function LogOut() {
  return (
    <form action={logOut}>
      <button type="submit">Log Out</button>
    </form>
  );
}

function LoggedIn({ name }: { name: string }) {
  return (
    <div className="flex gap-2">
      <div>{"hello, " + name}</div>
      <LogOut />
    </div>
  );
}

export default async function AccountInfo() {
  const userInfo: User | string = await authedBasket();

  return (
    <div>
      {typeof userInfo === "string" ? (
        <LogIn link={userInfo} />
      ) : (
        <LoggedIn name={userInfo.name} />
      )}
    </div>
  );
}
