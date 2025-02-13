import { GlobalContextProvider as GlobalContextProviderApi } from "@/app/context/GlobalContext";

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalContextProviderApi>{children}</GlobalContextProviderApi>;
}
