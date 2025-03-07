import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden w-1/2 items-center justify-center  lg:flex xl:w-2/5">
        <div>
          <Image
            src="/assets/icons/logo-2-cropped.png"
            alt="logo"
            width={250}
            height={250}
            className="h-auto mb-8 p-2 ml-32 "
          />
          <div className="space-y-5 text-white">
            <h1 className="h1">Handle your files the smart way.</h1>
            <p className="body-1">
              Securely store all your documents in one place.
            </p>
            <Image
              src="/assets/images/files.png"
              alt="files"
              width={342}
              height={342}
              className="transition-all hover:rotate-2 hover:scale-105 ml-20 p-2"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/assets/icons/icon-fill.ico"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
