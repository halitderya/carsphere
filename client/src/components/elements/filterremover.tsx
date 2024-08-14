import { ICarFilterType } from "@/types/carFilterType";
import React, { Fragment } from "react";

type Props = {
  params: { [key: string]: any };
  setParams: (set: ICarFilterType) => void;
  deleteProperty: (key: keyof ICarFilterType, value: string) => void;
};

function FilterRemover({ params, deleteProperty }: Props) {
  const renderFilter = (key: string, value: any) => {
    if (Array.isArray(value)) {
      return (
        <div>
          {key}
          {value.map((item, index) => (
            <div
              className="singlefilter"
              onClick={() => deleteProperty(key as keyof ICarFilterType, item)}
              key={index}
            >
              <div className="filterbutton">X</div>
              <div className="filtername">{item}</div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="singlefilter">
          <div
            className="filterbutton"
            onClick={() => deleteProperty(key as keyof ICarFilterType, value)}
          >
            X
          </div>
          <div className="filtername">
            {value}
            <div className="filtername">{key}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="filterremover">
      {Object.keys(params).map((key, index) => (
        <Fragment key={index + key}>{renderFilter(key, params[key])}</Fragment>
      ))}
    </div>
  );
}

export default FilterRemover;
