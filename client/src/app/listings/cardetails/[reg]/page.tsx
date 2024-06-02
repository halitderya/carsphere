"use client";
import { gql, useQuery } from "@apollo/client";

export default function Page({ params }: { params: { reg: string } }) {
  const GET_CARS = gql`
    query getCar($reg_number: String) {
      carbyreg(reg_number: $reg_number) {
        reg_number
        make
        engine_type
        euro_emission
        color
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CARS, {
    variables: { reg_number: params.reg },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data && data.carbyreg && data.carbyreg.reg_number)
    return (
      <div>
        <div>Details for: {params.reg}</div>
        <div>{data.carbyreg.reg_number}</div>
      </div>
    );
  else {
    return <p>Car Not found with Reg: {params.reg}</p>;
  }
}
