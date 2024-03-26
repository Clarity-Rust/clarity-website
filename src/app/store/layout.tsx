import LoginBanner from "@/components/store/PleaseLogin"

export default function Layout({children}: {children: React.ReactNode}){
return (
  <div>
    {children}
  </div>
)
}