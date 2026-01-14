import { type ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <div className="header-container">
          <a href="/">
            <div className="logo">
              <img src="flowpay-logo.svg" alt="Flowpay" />
            </div>
          </a>
        </div>
      </header>

      <div className="container">
        <section className="categories embed" id="embed">
          <div>{children}</div>
        </section>
      </div>
    </>
  );
}
