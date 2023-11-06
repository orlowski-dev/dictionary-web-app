import Image from "next/image";
import "./header.scss";
import ColorSchemeToggler from "./ColorSchemeToggler";

export default function Header() {
  return (
    <header className="main-header">
      <div className="container-680 p-4">
        <div className="logo">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <span>Dictionary</span>
        </div>
        <div>
          <ColorSchemeToggler />
        </div>
      </div>
    </header>
  );
}
