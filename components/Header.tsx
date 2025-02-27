"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import FileUploader from "./FileUploader";
import Search from "./Search";

const Header = ({ children }: { children: React.ReactNode }) => {
  const logout = async () => {
    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        alert("Logged out successfully!");
        window.location.href = "/sign-in";
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        FileUploader
        <FileUploader />
        <form action="">
          <Button type="submit" className="sign-out-button" onClick={logout}>
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
