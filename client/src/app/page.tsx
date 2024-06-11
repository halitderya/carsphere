"use client";
import Header from "@/components/layout/header";
import FilterMenu from "@/components/layout/filtermenu";
import CarCard from "@/components/essentials/carCard";
import Footer from "@/components/layout/footer";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ICarCard from "@/types/carCardType";

export default function Index() {
  const CAR_COUNT = gql`
    query totalcars {
      totalcars
    }
  `;

  const FILTER_CARS = gql`
    query FilteredCars(
      $make: String
      $model: String
      $transmission: Transmission
      $milageMax: Int
      $milageMin: Int
      $color: String
    ) {
      filteredCars(
        make: $make
        model: $model

        transmission: $transmission
        milage_max: $milageMax
        milage_min: $milageMin
        color: $color
      ) {
        make
        model
        fueltype
        milage
        transmission
      }
    }
  `;
  const [params, setParams] = useState<{}>({});

  const [getCars, { loading, error, data }] = useLazyQuery(FILTER_CARS, {
    //fetchPolicy: "network-only", // Doesn't check cache before making a network request

    variables: { ...params },
  });
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    console.log("params:", params);

    getCars({ variables: { ...params } }).then((x) => {
      console.log("refetch: ", x.data);
    });
  }, [params]);
  function handleCardClicked(e: any) {
    console.log("carcardclicked", e);
  }
  return (
    <div className="greatparent">
      <div className="mainwrapper">
        <Header active={active} setActive={setActive} />
        <div className="maindiv">
          <div className="leftcolumn">
            {" "}
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
              Number of Cars: <a href="/listings">{}</a>{" "}
            </h2>
            <h3>
              {loading ? (
                <p>Loading...</p>
              ) : data ? (
                data.filteredCars.length > 0 ? (
                  data.filteredCars.map((car: ICarCard, index: number) => (
                    <div key={index}>
                      <CarCard
                        carData={car}
                        onClick={handleCardClicked}
                      ></CarCard>
                    </div>
                  ))
                ) : (
                  <p>No cars available.</p>
                )
              ) : (
                <p>No data...</p>
              )}
            </h3>
          </div>
          <div className="rightcolumn"> Right Column</div>
        </div>{" "}
        <Footer></Footer>
      </div>
    </div>
  );
}
