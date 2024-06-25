import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FilteredCars } from "@/graphql/filter_cars";
import ICarCard from "@/types/carCardType";
import { ICarFilterType } from "@/types/carFilterType";

export default function FilterMenu({
  active,
  setActive,
  params,
  setParams,
  result,
}: {
  active: boolean;
  setActive: (active: boolean) => void;
  params: ICarFilterType;
  setParams: (set: ICarFilterType) => void;
  result: ICarCard[] | undefined;
}) {
  const [getCars, { loading, error, data }] = useLazyQuery(FilteredCars, {
    variables: { ...params },
  });
  const [allCars, setAllCars] = useState<ICarCard[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    []
  );
  // const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>();
  // const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [uniqueMakes, setUniqueMakes] = useState<string[]>([]);

  const [uniqueModel, setUniqueModel] = useState<string[]>([]);
  const [uniqueTransmission, setUniqueTransmission] = useState<string[]>([]);
  const [uniqueFuelType, setUniqueFuelType] = useState<string[]>([]);
  const [uniqueColour, setUniqueColour] = useState<string[]>([]);
  const [uniqueDoors, setUniqueDoors] = useState<number[]>([]);

  const deleteProperty = (prop: keyof ICarFilterType, value: any) => {
    let newParams = { ...params };

    if (prop === "make") {
      setSelectedMake("");

      delete newParams["model"];
    }
    prop === "model" && setSelectedModel("");
    if (Array.isArray(newParams[prop])) {
      if ((newParams[prop] as (typeof prop)[]).length === 1) {
        delete newParams[prop];
      } else {
        let newProp: any[] = [];

        (newParams[prop] as []).forEach((x) => {
          if (x !== value) {
            newProp.push(x);
          }
        });

        newParams[prop] = newProp as any;
      }
    } else {
      delete newParams[prop];
    }
    setParams(newParams);
  };
  const addProperty = (prop: keyof ICarFilterType, value: any[] | any) => {
    let newparams: ICarFilterType = { ...params };

    if (Array.isArray(newparams[prop])) {
      (newparams[prop] as any[]).push(...value);
    } else {
      newparams[prop] = value;
    }

    setParams(newparams);
  };

  useEffect(() => {
    result &&
      setUniqueMakes(
        Array.from(
          new Set((result as ICarCard[]).map((car: ICarCard) => car.make))
        )
      );
  }, [result]);
  const testfunc = (sender: string): any[] => {
    let tempArray: any[] = allCars;

    Object.keys(params as ICarFilterType).forEach((paramkey) => {
      if (sender !== paramkey) {
        if (Array.isArray(params[paramkey as keyof ICarFilterType])) {
          tempArray = tempArray.filter((car) =>
            (params[paramkey as keyof ICarFilterType] as any[]).includes(
              car[paramkey as keyof ICarFilterType]
            )
          );
        } else {
          tempArray = tempArray.filter(
            (car) =>
              car[paramkey as keyof ICarFilterType] ===
              params[paramkey as keyof ICarFilterType]
          );
        }
      }
    });

    return tempArray;
  };

  async function handlefilterchange(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;

    const { value, id } = e.target as HTMLInputElement;

    if (target.type === "checkbox") {
      if (target.checked) {
        if (id === "doors") {
          addProperty(id as keyof ICarFilterType, [Number(value)]);
        } else {
          addProperty(id as keyof ICarFilterType, [value]);
        }
      } else if (!target.checked) {
        deleteProperty(id as keyof ICarFilterType, value);
      } else {
        console.error("Unknown action: ", e);
      }
    } else if (target.type === "select-one") {
      if (id && value) {
        id === "make" && setSelectedMake(value);
        id === "model" && setSelectedModel(value);
        params = { ...params, [id]: value };
        setParams(params);
      }

      addProperty(id as keyof ICarFilterType, value);

      if (id && value === "") {
        deleteProperty(id as keyof ICarFilterType, value);
      }
    } else {
      console.error("unknown target type: ", target.type);
    }
  }

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
        setUniqueModel(models);

        setAllCars(x.data.filteredCars);
        reMap(x.data.filteredCars);
      }
    });
  }, []);
  const handleReset = () => {};
  const reMap = async (x: ICarCard[]) => {
    if (x) {
      setUniqueTransmission([
        ...(Array.from(
          new Set(x.map((car: ICarCard) => car.transmission))
        ) as string[]),
      ]);
      setUniqueFuelType([
        ...(Array.from(
          new Set(x.map((car: ICarCard) => car.fueltype))
        ) as string[]),
      ]);
      setUniqueColour([
        ...(Array.from(
          new Set(x.map((car: ICarCard) => car.color))
        ) as string[]),
      ]);

      setUniqueDoors([
        ...(Array.from(
          new Set(x.map((car: ICarCard) => car.doors))
        ) as number[]),
      ]);
    } else {
    }
  };
  return (
    <div className={`filtermenu ${active ? "open" : ""}`}>
      <div className="filtermenuheader">
        <div>Find your dream car:</div>
        <button onClick={() => testfunc("fueltype")}>Reset1</button>
        <div
          className="closefilter"
          onClick={() => {
            setActive(false);
          }}
        >
          {"Close"}
        </div>
      </div>

      <div className="filterarea options">
        {" "}
        <select id="make" value={selectedMake} onChange={handlefilterchange}>
          <option value="">All</option>

          {uniqueMakes.map((mk, index) => (
            <Fragment key={index}>
              {
                <option key={index} value={mk}>
                  {mk}( {result && result.filter((x) => x.make === mk).length} )
                </option>
              }
            </Fragment>
          ))}
        </select>
        {result && selectedMake && (
          <select
            id="model"
            value={selectedModel}
            onChange={handlefilterchange}
          >
            <option value="">All</option>
            {[
              ...new Set(
                result
                  .filter((f) => f.make === selectedMake)
                  .map((mk) => mk.model)
              ),
            ].map((model, index) => (
              <Fragment key={index}>
                <option value={model}>{model}</option>
              </Fragment>
            ))}
          </select>
        )}
        <div>
          <h4>Transmission</h4>
          {(() => {
            return uniqueTransmission.map((ut, index) => {
              const filteredCars = testfunc("transmission").filter(
                (f) => f.transmission === ut
              );

              if (filteredCars.length === 0) {
                return null;
              }

              return (
                <Fragment key={index}>
                  <div>
                    <label htmlFor={ut}>
                      {ut} ({filteredCars.length})
                    </label>
                    <input
                      id="transmission"
                      onChange={async (e) => {
                        await handlefilterchange(e);
                      }}
                      type="checkbox"
                      value={ut}
                    />
                  </div>
                </Fragment>
              );
            });
          })()}
        </div>
        <div>
          <h4>Fuel Type</h4>
          {(() => {
            return uniqueFuelType.map((uf, index) => {
              const filteredCars = testfunc("fueltype").filter(
                (f) => f.fueltype === uf
              );

              if (filteredCars.length === 0) {
                return null;
              }

              return (
                <Fragment key={index}>
                  <div>
                    <label htmlFor={uf}>
                      {uf} ({filteredCars.length})
                    </label>
                    <input
                      id="fueltype"
                      onChange={async (e) => {
                        await handlefilterchange(e);
                      }}
                      type="checkbox"
                      value={uf}
                    />
                  </div>
                </Fragment>
              );
            });
          })()}
        </div>
        <div>
          <h4>Colour</h4>
          {(() => {
            return uniqueColour.map((uc, index) => {
              const filteredCars = testfunc("color").filter(
                (f: ICarCard) => f.color === uc
              );

              if (filteredCars.length === 0) {
                return null;
              }

              return (
                <Fragment key={index}>
                  <div>
                    <label htmlFor={uc}>
                      {uc} ({filteredCars.length})
                    </label>
                    <input
                      id="color"
                      onChange={async (e) => {
                        await handlefilterchange(e);
                      }}
                      type="checkbox"
                      value={uc}
                    />
                  </div>
                </Fragment>
              );
            });
          })()}
        </div>
        <div>
          <h4>Door</h4>
          {(() => {
            return uniqueDoors.map((ud, index) => {
              const filteredCars = testfunc("doors").filter(
                (f: ICarCard) => f.doors === ud
              );

              if (filteredCars.length === 0) {
                return null;
              }

              return (
                <Fragment key={index}>
                  <div>
                    <label>
                      {ud} ({filteredCars.length})
                    </label>
                    <input
                      id="doors"
                      onChange={async (e) => {
                        await handlefilterchange(e);
                      }}
                      type="checkbox"
                      value={ud}
                    />
                  </div>
                </Fragment>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
