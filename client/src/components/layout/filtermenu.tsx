import { SyntheticEvent, useState } from "react";
import Hamburger from "../elements/hamburger";

export default function FilterMenu({
  active,
  setActive,
  params,
  setParams,
}: {
  active: boolean;
  setActive: (active: boolean) => void;
  params: { [key: string]: any };
  setParams: any;
}) {
  function handlefilterchange(e: SyntheticEvent) {
    const { id, value } = e.target as HTMLInputElement;
    if (id || value) {
      params = { ...params, [id]: value };

      setParams(params);
    }
  }
  // if (active)
  return (
    <div className={`filtermenu ${active ? "open" : ""}`}>
      <div className="filtermenuheader">
        <div>Find your dream car:</div>

        <div
          className="closefilter"
          onClick={() => {
            setActive(false);
          }}
        >
          {"Close"}
        </div>
      </div>

      <div className="options">
        <select id="make" onChange={handlefilterchange}>
          <option value="" hidden defaultValue="">
            Make
          </option>
          <option value="AUDI">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes">Mercedes</option>
        </select>

        <select id="transmission" onChange={handlefilterchange}>
          <option value="" hidden defaultValue="">
            Transmission
          </option>
          <option value="Automatic">Automatic</option>
          <option value="Semi_Automatic">Semi Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>
    </div>
  );
  // else {
  //   return null;
  // }
}
