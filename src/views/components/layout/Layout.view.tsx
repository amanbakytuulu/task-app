import { FC, PropsWithChildren } from "react";
import { Header } from "../header";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
};
