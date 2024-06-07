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
  if (active)
    return (
      <div className="filtermenu">
        <div>Filter MENU</div>

        <div
          className="closefilter"
          onClick={() => {
            setActive(false);
          }}
        >
          {"Close"}
        </div>

        <select id="Make" onChange={handlefilterchange}>
          <option value="" hidden defaultValue="">
            Make
          </option>
          <option value="AUDI">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes">Mercedes</option>
        </select>

        <select id="Transmission" onChange={handlefilterchange}>
          <option value="" hidden defaultValue="">
            Transmission
          </option>
          <option value="AUTOMATIC">Automatic</option>
          <option value="SEMI_AUTOMATIC">Semi Automatic</option>
          <option value="MANUAL">Manual</option>
        </select>
      </div>
    );
  else {
    return null;
  }
}
