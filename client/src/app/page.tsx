"use client";
import Header from "@/components/layout/header";
import FilterMenu from "@/components/layout/filtermenu";
import CarCard from "@/components/essentials/carCard";
import Footer from "@/components/layout/footer";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { SyntheticEvent, useEffect, useState } from "react";
import ICarCard from "@/types/carCardType";
import { FILTER_CARS } from "@/graphql/filter_cars";

export default function Index() {
  const [params, setParams] = useState<{}>({});

  const [totalcars, setTotalCars] = useState<string>("");
  const [getCars, { loading, error, data }] = useLazyQuery(FILTER_CARS, {
    variables: { ...params },
  });
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    console.log("params:", params);

    getCars({ variables: { ...params } }).then((x) => {
      totalcars === "" && setTotalCars(x.data.filteredCars.length);
    });
  }, [params]);
  function handleCardClicked(e: any) {}
  return (
    <div className="greatparent">
      <div className="mainwrapper">
        <Header active={active} setActive={setActive} />
        <div className="maindiv">
          <div className="leftcolumn">
            <a
              onClick={() => {
                setParams([]);
              }}
            >
              Reset
            </a>{" "}
            {/* Left Column */}
            <FilterMenu
              setParams={setParams}
              params={params}
              active={active}
              setActive={setActive}
            />
          </div>
          <div className="centercolumn">
            Welcome to bla bla here we have something hele hule hep hop Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Odio, doloribus.
            Lorem ipsum dolor sit amet.
            <h2>
              Total number:{totalcars} <a href="/listings"></a>{" "}
            </h2>
            <div className="carcardscontainer">
              {loading ? (
                <p>Loading...</p>
              ) : data ? (
                data.filteredCars.length > 0 ? (
                  (data.filteredCars as ICarCard[]).map(
                    (car: ICarCard, index: number) => (
                      <div className="carcard" key={index}>
                        <CarCard
                          carData={car}
                          onClick={handleCardClicked}
                        ></CarCard>
                      </div>
                    )
                  )
                ) : (
                  <p>No cars available.</p>
                )
              ) : (
                <p>No data...</p>
              )}
            </div>
          </div>
          <div className="rightcolumn"> Right Column</div>
        </div>{" "}
        <Footer></Footer>
      </div>
    </div>
  );
}
