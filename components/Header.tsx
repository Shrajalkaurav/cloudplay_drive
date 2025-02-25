import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import FileUploader from "./FileUploader";
import Search from "./Search";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        FileUploader
        <FileUploader />
        <form action="">
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="log"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};
export default Header;
