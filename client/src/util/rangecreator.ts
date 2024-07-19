import ICarCard from "@/types/carCardType";

export const rangedCreator = (
  RangedFilterType: keyof ICarCard,
  allcars: ICarCard[]
) => {
  let minrangedvalues: { value: number; label: string }[] = [];
  let maxrangedvalues: { value: number; label: string }[] = [];

  let max = 0;

  let min = 0;
  let step = Math.floor((max - min) / 10);

  let round = 0;
  switch (true) {
    case step < 10:
      round = 1;
      break;
    case step >= 100 && step < 1000:
      step = Math.round(step / 100) * 100;
      min = Math.ceil(
        (Math.min(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          100) *
          100
      );
      max = Math.floor(
        (Math.max(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          100) *
          100
      );

      break;
    case step >= 1000 && step < 10000:
      step = Math.round(step / 1000) * 1000;
      min = Math.ceil(
        (Math.min(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          1000) *
          1000
      );
      max = Math.floor(
        (Math.max(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          1000) *
          1000
      );
      break;
    case step >= 10000 && step < 100000:
      step = Math.round(step / 10000) * 10000;
      min = Math.ceil(
        (Math.min(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          10000) *
          10000
      );
      max = Math.floor(
        (Math.max(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          10000) *
          10000
      );
      break;
    case step >= 100000 && step < 1000000:
      step = Math.round(step / 100000) * 100000;
      min = Math.ceil(
        (Math.min(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          100000) *
          100000
      );
      max = Math.floor(
        (Math.max(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          100000) *
          100000
      );
      break;
    case step >= 1000000 && step < 10000000:
      step = Math.round(step / 1000000) * 1000000;
      min = Math.ceil(
        (Math.min(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          1000000) *
          1000000
      );
      max = Math.floor(
        (Math.max(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          1000000) *
          1000000
      );
      break;
    case step >= 10000000 && step < 100000000:
      step = Math.round(step / 10000000) * 10000000;
      min = Math.ceil(
        (Math.min(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          10000000) *
          10000000
      );
      max = Math.floor(
        (Math.max(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          10000000) *
          10000000
      );
      break;
    case step >= 100000000 && step < 1000000000:
      step = Math.round(step / 100000000) * 100000000;
      min = Math.ceil(
        (Math.min(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          100000000) *
          100000000
      );
      max = Math.floor(
        (Math.max(
          ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
        ) /
          100000000) *
          100000000
      );
      break;
    default:
      break;
  }

  console.log("step: ", step, "min: ", min, "max: ", max, "round: ", round);

  if (step === 0) {
    step = 1;
  }

  for (let i = min; i <= max; i += step) {
    minrangedvalues.push({ value: i, label: i.toString() });
    maxrangedvalues.push({ value: i, label: i.toString() });
  }

  return { minrangedvalues, maxrangedvalues };
};
