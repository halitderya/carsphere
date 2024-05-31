"use client";
import { gql, useQuery } from "@apollo/client";
export default function Index() {
  const GET_CARS = gql`
    query getCars {
      cars {
        id
        make
        engine_type
        euro_emission
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h1>Index Page</h1>

      {data.cars.map(
        ({
          id,
          make,
          engine_type,
          euro_emission,
        }: {
          id: number;
          make: string;
          engine_type: string;
          euro_emission: string;
        }) => (
          <div key={id}>
            <h3>{engine_type}</h3>
            <h3>{make}</h3>
            <h3>{euro_emission}</h3>
          </div>
        )
      )}
    </>
  );
}
