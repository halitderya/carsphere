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
  const [uniqueMakes, setUniqueMakes] = useState<string[]>([]);
  const [allCars, setAllCars] = useState<ICarCard[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    []
  );
  // const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>();
  // const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [uniqueTransmission, setUniqueTransmission] = useState<string[]>([]);
  const [uniqueFuelType, setUniqueFuelType] = useState<string[]>([]);
  const [uniqueColour, setUniqueColour] = useState<string[]>([]);

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
  const testfunc = (sender: string) => {
    let newarray: ICarCard[] = allCars;
    let hoppa: ICarCard[];
    Object.keys(params as ICarFilterType).forEach((x) => {
      if (x === sender) {
        if (Array.isArray(params[x as keyof ICarFilterType])) {
          console.log("array and fueltype", params[x as keyof ICarFilterType]);
          hoppa = newarray.filter((car) =>
            (params[x as keyof ICarFilterType] as string[]).some(
              (value) => car[x as keyof ICarCard] === value
            )
          );
        } else {
          hoppa = newarray.filter(
            (car) =>
              car[x as keyof ICarCard] === params[x as keyof ICarFilterType]
          );
        }
      }
      console.log(hoppa);
      // console.log(x, params[x as keyof ICarFilterType]);
    });

    // Object.values(params as ICarFilterType).forEach((x) => {
    //   if (Array.isArray(x as keyof ICarFilterType)) {
    //     console.log(Object.keys(x), "array X: ", x);
    //     const other = allCars.filter(() => {});
    //   } else {
    //     console.log("non array X: ", x);
    //   }
    // });
  };
  async function handlefilterchange(e: SyntheticEvent) {
    ////////

    ///////

    const target = e.target as HTMLInputElement;

    const { value, id } = e.target as HTMLInputElement;

    if (target.type === "checkbox") {
      if (target.checked) {
        addProperty(id as keyof ICarFilterType, [value]);
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

            {result.map((mk, index) => (
              <Fragment key={index}>
                {
                  <option key={index} value={mk.model}>
                    {mk.model}({" "}
                    {result && result.filter((x) => x === mk).length} )
                  </option>
                }
              </Fragment>
            ))}
          </select>
        )}
        <div>
          <h4>Transmission</h4>
          {uniqueTransmission.map((tr, index) => (
            <Fragment key={index}>
              <div key={index}>
                <label htmlFor={tr}>
                  {tr}
                  {""} (
                  {
                    allCars!.filter((s: ICarCard) => s.transmission === tr)
                      .length
                  }
                  )
                </label>
                <input
                  id="transmission"
                  onChange={async (e) => {
                    await handlefilterchange(e);
                    reMap(allCars);
                  }}
                  type="checkbox"
                  value={tr}
                />
              </div>
            </Fragment>
          ))}
        </div>
        <div>
          {" "}
          <h4>Fuel Type</h4>
          {uniqueFuelType.map((uf, index) => (
            <Fragment key={index}>
              <div key={index}>
                <label htmlFor={uf}>
                  {uf}
                  {""} (
                  {result!.filter((s: ICarCard) => s.fueltype === uf).length})
                </label>
                <input
                  id="fueltype"
                  onChange={async (e) => {
                    await handlefilterchange(e);
                    reMap(allCars);
                  }}
                  type="checkbox"
                  value={uf}
                />
              </div>
            </Fragment>
          ))}
        </div>
        <h4>Colour</h4>
        {uniqueColour.map((uc, index) => (
          <Fragment key={index}>
            <div key={index}>
              <label htmlFor={uc}>
                {uc}
                {""} ({result!.filter((s: ICarCard) => s.color === uc).length})
              </label>
              <input
                id="color"
                onChange={async (e) => {
                  await handlefilterchange(e);
                  reMap(allCars);
                }}
                type="checkbox"
                value={uc}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
