import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FilteredCars } from "@/graphql/filter_cars";
import ICarCard from "@/types/carCardType";
import { ICarFilterType } from "@/types/carFilterType";
import { RangedFilter } from "../elements/filtercomponents";
import { calculator } from "@/util/calculator";

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
  const [uniqueMakes, setUniqueMakes] = useState<string[]>([]);
  const [uniqueTransmission, setUniqueTransmission] = useState<string[]>([]);
  const [uniqueFuelType, setUniqueFuelType] = useState<string[]>([]);
  const [uniqueColour, setUniqueColour] = useState<string[]>([]);
  const [uniqueDoors, setUniqueDoors] = useState<number[]>([]);
  const [uniqueMilage, setUniqueMilage] = useState<number[]>([]);

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
  // const calculator = (sender: string): ICarCard[] => {
  //   let tempArray = allCars;

  //   Object.keys(params as ICarFilterType).forEach((paramkey) => {
  //     if (sender !== paramkey.toString()) {
  //       if (Array.isArray(params[paramkey as keyof ICarFilterType])) {
  //         tempArray = tempArray.filter((car) =>
  //           (params[paramkey as keyof ICarFilterType] as any[]).includes(
  //             car[paramkey as keyof ICarCard]
  //           )
  //         );
  //       } else {
  //         tempArray = tempArray.filter(
  //           (car) =>
  //             car[paramkey as keyof ICarCard] ===
  //             params[paramkey as keyof ICarFilterType]
  //         );
  //       }
  //     } else {
  //     }
  //   });

  //   return tempArray;
  // };

  async function handlefilterchange(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;

    const { value, title } = e.target as HTMLInputElement;
    console.log("handlefilterchange: ", title, value);

    if (target.type === "checkbox") {
      if (target.checked) {
        if (title === "doors") {
          addProperty(title as keyof ICarFilterType, [Number(value)]);
        } else {
          addProperty(title as keyof ICarFilterType, [value]);
        }
      } else if (!target.checked) {
        deleteProperty(title as keyof ICarFilterType, value);
      } else {
        console.error("Unknown action: ", e);
      }
    } else if (target.type === "select-one") {
      if (title && value) {
        title === "make" && setSelectedMake(value);
        title === "model" && setSelectedModel(value);
        params = { ...params, [title]: value };
        setParams(params);
      }

      addProperty(title as keyof ICarFilterType, value);

      if (title && value === "") {
        deleteProperty(title as keyof ICarFilterType, value);
      }
    } else {
      console.error("unknown target type: ", target.type);
    }
    console.log("params: ", params);
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
        const fueltypes: string[] = Array.from(
          new Set(x.data.filteredCars.map((car: ICarCard) => car.fueltype))
        );
        setUniqueFuelType(fueltypes);

        setAllCars(x.data.filteredCars);
        reMap(x.data.filteredCars);
      }
    });
  }, []);
  const handleReset = () => {
    const newparam: ICarFilterType = {};
    setParams(newparam);
  };
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
      setUniqueMilage([
        ...(Array.from(
          new Set(x.map((car: ICarCard) => car.milage))
        ) as number[]),
      ]);
    } else {
    }
  };
  return (
    <div className={`filtermenu ${active ? "open" : ""}`}>
      <div className="filtermenuheader">
        {Object.values(params).length > 0 && (
          <div onClick={handleReset} className="resetbutton">
            reset here
          </div>
        )}
        <div className="filterremover">
          {Object.keys(params).map((x, index) => (
            <Fragment key={index + x}>
              {Array.isArray(params[x as keyof ICarFilterType]) ? (
                (params[x as keyof ICarFilterType] as []).map((a, index2) => (
                  <div
                    className="singlefilter"
                    onClick={() => {
                      deleteProperty(x as keyof ICarFilterType, a);
                    }}
                    key={index2}
                  >
                    <div className="filterbutton">X</div>
                    <div className="filtername">{a}</div>
                    <div className="filtername">{x}</div>
                  </div>
                ))
              ) : (
                <div className="singlefilter">
                  <div
                    className="filterbutton"
                    onClick={() => {
                      deleteProperty(
                        x as keyof ICarFilterType,
                        params[x as keyof ICarFilterType]
                      );
                    }}
                  >
                    X
                  </div>
                  <div className="filtername">
                    {params[x as keyof ICarFilterType]}
                    <div className="filtername">{x}</div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>

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
        <h4>Make</h4>
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
              const isChecked = params.transmission?.includes(ut) || false;

              ///Here I want to replace all calculator functions with useCalculator hook.///
              const filteredCars = calculator({
                sender: "transmission",
                params: params,
                allCars: allCars,
              }).filter((f) => f.transmission === ut);

              if (filteredCars.length === 0) {
                return null;
              } else {
                return (
                  <div key={index}>
                    <label htmlFor={ut}>
                      {ut}({filteredCars.length})
                    </label>
                    <input
                      title="transmission"
                      id={ut}
                      checked={isChecked}
                      onChange={async (e) => {
                        await handlefilterchange(e);
                      }}
                      type="checkbox"
                      value={ut}
                    />
                  </div>
                );
              }
            });
          })()}
        </div>
        <div>
          <h4>Fuel Type</h4>
          {(() => {
            return uniqueFuelType.map((uf, index) => {
              const isChecked = params.fueltype?.includes(uf) || false;

              const filteredCars = calculator({
                sender: "fueltype",
                params: params,
                allCars: allCars,
              }).filter((f) => f.fueltype === uf);

              if (filteredCars.length === 0) {
                return null;
              }

              return (
                <div key={index}>
                  <label htmlFor={uf}>
                    {uf} ({filteredCars.length})
                  </label>
                  <input
                    title="fueltype"
                    id={uf}
                    checked={isChecked}
                    onChange={async (e) => {
                      await handlefilterchange(e);
                    }}
                    type="checkbox"
                    value={uf}
                  />
                </div>
              );
            });
          })()}
        </div>
        <div>
          <h4>Colour</h4>
          {(() => {
            return uniqueColour.map((uc, index) => {
              const isChecked = params.color?.includes(uc) || false;

              const filteredCars = calculator({
                sender: "color",
                params: params,
                allCars: allCars,
              }).filter((f) => f.color === uc);

              if (filteredCars.length === 0) {
                return null;
              }

              return (
                <div key={index}>
                  <label htmlFor={uc}>
                    {uc} ({filteredCars.length})
                  </label>
                  <input
                    id={uc}
                    checked={isChecked}
                    onChange={async (e) => {
                      await handlefilterchange(e);
                    }}
                    type="checkbox"
                    title="color"
                    value={uc}
                  />
                </div>
              );
            });
          })()}
        </div>
        <div>
          <h4>Door</h4>
          {(() => {
            return uniqueDoors.map((ud, index) => {
              const isChecked = params.doors?.includes(ud) || false;

              const filteredCars = calculator({
                sender: "transmission",
                params: params,
                allCars: allCars,
              }).filter((f) => f.doors === ud);

              if (filteredCars.length === 0) {
                return null;
              }

              return (
                <div key={index}>
                  <label htmlFor={ud.toString()}>
                    {ud} Doors ({filteredCars.length})
                  </label>
                  <input
                    id={ud.toString()}
                    onChange={async (e) => {
                      await handlefilterchange(e);
                    }}
                    type="checkbox"
                    title="doors"
                    checked={isChecked}
                    value={ud}
                  />
                </div>
              );
            });
          })()}
        </div>
        <h4>Milage</h4>
        <RangedFilter
          allCars={allCars}
          params={params}
          setParams={setParams}
          handleOnChange={handlefilterchange}
          RangedFilterType="milage"
        />
        <h4>Price</h4>
        <RangedFilter
          allCars={allCars}
          params={params}
          setParams={setParams}
          handleOnChange={handlefilterchange}
          RangedFilterType="price"
        />
        <h4>Year</h4>
        <RangedFilter
          allCars={allCars}
          params={params}
          setParams={setParams}
          handleOnChange={handlefilterchange}
          RangedFilterType="year"
        />
      </div>
    </div>
  );
}
