import { authedBasket, getBasketAuth } from "@/lib/Actions"

export default async function LoginBanner() {
  const isLoggedIn = await authedBasket("bxr9ra-97f1dcb5d1161d07b13908561e05fbb1d0f438fe");  
  const authURL = await getBasketAuth("bxr9ra-97f1dcb5d1161d07b13908561e05fbb1d0f438fe");
  return (
    <div className="">
      <a href={authURL}>Login</a>
    </div>
  )
} 