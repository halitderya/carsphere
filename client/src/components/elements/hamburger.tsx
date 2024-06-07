"use client";
import { MouseEventHandler, useState } from "react";

export default function Hamburger({ onClick }: { onClick: any }) {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className="hamburger"
    >
      <div className="lane"></div>
      <div className="lane"></div>
      <div className="lane"></div>
    </div>
  );
}
