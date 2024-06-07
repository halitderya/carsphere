"use client";
import { EventHandler, useState } from "react";
import Hamburger from "../elements/hamburger";

import LogoComponent from "../elements/logo";
import FilterMenu from "./filtermenu";

export default function Header({
  active,
  setActive,
}: {
  active: any;
  setActive: (active: boolean) => void;
}) {
  return (
    <>
      <div className="header-maincontainer ">
        <LogoComponent />
        <div className="header-elements">Something1</div>
        <div className="header-elements">Something2</div>
        <div className="header-elements">Something3</div>
        <Hamburger
          onClick={() => {
            console.log("Hamburger clicked");
            setActive(!active);
          }}
        />
      </div>
    </>
  );
}
