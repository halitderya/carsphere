import { SyntheticEvent, useEffect, useState } from "react";
import Hamburger from "../elements/hamburger";
import { useLazyQuery } from "@apollo/client";
import { FILTER_CARS } from "@/graphql/filter_cars";
import ICarCard from "@/types/carCardType";

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
  const deleteProperty = (prop: any) => {
    let newParams = { ...params };
    delete newParams[prop];
    if (prop === "make") {
      setSelectedMake("");
      delete newParams["model"];
    }
    setParams(newParams);
  };

  async function handlefilterchange(e: SyntheticEvent) {
    console.log("allcars: ", allCars);

    const { id, value } = e.target as HTMLInputElement;

    if (id && value === "") {
      deleteProperty(id);
      console.log("prop deleted: ", id);
      // id === "make" && setUniqueModels([]);
    }
    if (id && value) {
      id === "make" && setSelectedMake(value);
      params = { ...params, [id]: value };
      setParams(params);
    }
  }
  const [getCars, { loading, error, data }] = useLazyQuery(FILTER_CARS, {
    variables: { ...params },
  });
  const [uniqueMakes, setUniqueMakes] = useState<string[]>([]);
  const [allCars, setAllCars] = useState<[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [uniqueTransmission, setUniqueTransmission] = useState<string[]>([]);
  const [uniqueFuelType, setUniqueFuelType] = useState<string[]>([]);

  useEffect(() => {
    setUniqueTransmission([
      ...new Set(allCars.map((car: ICarCard) => car.transmission)),
    ]);
    setUniqueFuelType([
      ...new Set(allCars.map((car: ICarCard) => car.fueltype)),
    ]);
  }, [uniqueTransmission, uniqueFuelType]);
  useEffect(() => {
    getCars({ variables: { ...params } }).then((x) => {
      if (x.data && x.data.filteredCars) {
        const makes: string[] = Array.from(
          new Set(x.data.filteredCars.map((car: ICarCard) => car.make))
        );
        setUniqueMakes(makes);
        const models: string[] = Array.from(
          new Set(
            (x.data.filteredCars as ICarCard[]).map(
              (car: ICarCard) => car.model
            )
          )
        );
        setAllCars(x.data.filteredCars);
      }
    });
  }, []);

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
        {" "}
        <select id="make" onChange={handlefilterchange}>
          Make
          <option value="">All</option>
          {[
            ...new Set(
              allCars
                .filter((item: ICarCard) => {
                  return Object.keys(params).every(
                    (key) =>
                      params[key as keyof ICarCard] === undefined ||
                      item[key as keyof ICarCard] ===
                        params[key as keyof ICarCard]
                  );
                })
                .map((item: ICarCard) => item.make)
            ),
          ].map((make) => {
            const count = allCars.filter((item: ICarCard) => {
              return (
                Object.keys(params).every(
                  (key) =>
                    params[key as keyof ICarCard] === undefined ||
                    item[key as keyof ICarCard] ===
                      params[key as keyof ICarCard]
                ) && item.make === make
              );
            }).length;
            return (
              <option key={make} value={make}>
                {make} ({count})
              </option>
            );
          })}
        </select>
        <select
          disabled={selectedMake === ""}
          id="model"
          onChange={handlefilterchange}
        >
          <option value={""}>All</option>
          {[
            ...new Set(
              allCars
                .filter((item: ICarCard) => {
                  return Object.keys(params).every(
                    (key) =>
                      params[key as keyof ICarCard] === undefined ||
                      item[key as keyof ICarCard] ===
                        params[key as keyof ICarCard]
                  );
                })
                .map((item: ICarCard) => item.model)
            ),
          ].map((model) => {
            const count = allCars.filter((item: ICarCard) => {
              return (
                Object.keys(params).every(
                  (key) =>
                    params[key as keyof ICarCard] === undefined ||
                    item[key as keyof ICarCard] ===
                      params[key as keyof ICarCard]
                ) && item.model === model
              );
            }).length;
            return (
              <option key={model} value={model}>
                {model} ({count})
              </option>
            );
          })}
        </select>
        <div>
          <h4>Transmission</h4>
          {uniqueTransmission.map((tr) => (
            <div>
              <label htmlFor={tr}>
                {tr}
                {""} (
                {allCars.filter((s: ICarCard) => s.transmission === tr).length})
              </label>
              <input
                id="transmission"
                onChange={handlefilterchange}
                type="checkbox"
                value={tr}
              />
            </div>
          ))}
        </div>
        <div>
          {" "}
          <h4>Fuel Type</h4>
          {uniqueFuelType.map((uf) => (
            <div>
              <label htmlFor={uf}>
                {uf}
                {""} (
                {allCars.filter((s: ICarCard) => s.fueltype === uf).length})
              </label>
              <input
                id="fueltype"
                onChange={handlefilterchange}
                type="checkbox"
                value={uf}
              />
            </div>
          ))}
        </div>
        <select id="color" onChange={handlefilterchange}>
          <option value={""}>All</option>
          {[
            ...new Set(
              allCars
                .filter((item: ICarCard) => {
                  return Object.keys(params).every(
                    (key) =>
                      params[key as keyof ICarCard] === undefined ||
                      item[key as keyof ICarCard] ===
                        params[key as keyof ICarCard]
                  );
                })
                .map((item: ICarCard) => item.color)
            ),
          ].map((color) => {
            const count = allCars.filter((item: ICarCard) => {
              return (
                Object.keys(params).every(
                  (key) =>
                    params[key as keyof ICarCard] === undefined ||
                    item[key as keyof ICarCard] ===
                      params[key as keyof ICarCard]
                ) && item.color === color
              );
            }).length;
            return (
              <option key={color} value={color}>
                {color} ({count})
              </option>
            );
          })}
        </select>
        {/* <div id="ulez_compatible">
          {[
            ...new Set(
              allCars
                .filter((item: ICarCard) => {
                  return Object.keys(params).every(
                    (key) =>
                      params[key as keyof ICarCard] === undefined ||
                      item[key as keyof ICarCard] ===
                        params[key as keyof ICarCard]
                  );
                })
                .map((item: ICarCard) => item.ulez_compatible)
            ),
          ].map((ulez) => {
            const count = allCars.filter((item: ICarCard) => {
              return (
                Object.keys(params).every(
                  (key) =>
                    params[key as keyof ICarCard] === undefined ||
                    item[key as keyof ICarCard] ===
                      params[key as keyof ICarCard]
                ) && item.ulez_compatible === ulez
              );
            }).length;
            return (
              <input
                id="ulez"
                type="checkbox"
                checked={ulez}
                value={"ulez"}
              ></input>
            );
          })}
        </div> */}
      </div>
    </div>
  );
}
