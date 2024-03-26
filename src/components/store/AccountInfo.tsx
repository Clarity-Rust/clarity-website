import { authedBasket, logOut, logIn } from "@/lib/Actions";
import { User } from "../../../types";

function LogIn() {
  return (
    <form action={logIn}>
      <button type="submit">Log in</button>
    </form>
  );
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
  const userInfo: User | boolean = await authedBasket();

  return (
    <div>
      {typeof userInfo === "boolean" && userInfo === false ? (
        <LogIn />
      ) : typeof userInfo === "object" && userInfo !== null ? (
        <LoggedIn name={userInfo.name} />
      ) : (
        "Unknown user"
      )}
    </div>
  );
}
