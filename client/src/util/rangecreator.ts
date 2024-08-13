import ICarCard from "@/types/carCardType";

export const rangedCreator = (
  RangedFilterType: keyof ICarCard,
  allcars: ICarCard[]
) => {
  let minrangedvalues: { value: number; label: string }[] = [];
  let maxrangedvalues: { value: number; label: string }[] = [];

  // Min and max value calculations
  let min = Math.min(
    ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
  );
  let max = Math.max(
    ...allcars.map((car: ICarCard) => Number(car[RangedFilterType]))
  );
  let step = Math.floor((max - min) / 10);

  let round = 0;
  switch (true) {
    case step < 10:
      round = 1;
      break;
    case step >= 100 && step < 1000:
      step = Math.round(step / 100) * 100;
      min = Math.ceil(min / 100) * 100;
      max = Math.floor(max / 100) * 100;
      break;
    case step >= 1000 && step < 10000:
      step = Math.round(step / 1000) * 1000;
      min = Math.ceil(min / 1000) * 1000;
      max = Math.floor(max / 1000) * 1000;
      break;
    case step >= 10000 && step < 100000:
      step = Math.round(step / 10000) * 10000;
      min = Math.ceil(min / 10000) * 10000;
      max = Math.floor(max / 10000) * 10000;
      break;
    case step >= 100000 && step < 1000000:
      step = Math.round(step / 100000) * 100000;
      min = Math.ceil(min / 100000) * 100000;
      max = Math.floor(max / 100000) * 100000;
      break;
    case step >= 1000000 && step < 10000000:
      step = Math.round(step / 1000000) * 1000000;
      min = Math.ceil(min / 1000000) * 1000000;
      max = Math.floor(max / 1000000) * 1000000;
      break;
    case step >= 10000000 && step < 100000000:
      step = Math.round(step / 10000000) * 10000000;
      min = Math.ceil(min / 10000000) * 10000000;
      max = Math.floor(max / 10000000) * 10000000;
      break;
    case step >= 100000000 && step < 1000000000:
      step = Math.round(step / 100000000) * 100000000;
      min = Math.ceil(min / 100000000) * 100000000;
      max = Math.floor(max / 100000000) * 100000000;
      break;
    default:
      break;
  }

  if (step === 0) {
    step = 1;
  }

  for (let i = min; i <= max; i += step) {
    minrangedvalues.push({ value: i, label: i.toString() });
    maxrangedvalues.push({ value: i, label: i.toString() });
  }

  return { minrangedvalues, maxrangedvalues };
};
