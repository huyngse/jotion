import { ReactNode } from "react";
import Navbar from "./_components/navbar";

interface MarketingLayout {
  children?: ReactNode;
}
function MarketingLayout({ children }: MarketingLayout) {
  return (
    <div className="h-ful">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
}

export default MarketingLayout;
