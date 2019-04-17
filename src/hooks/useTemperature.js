import { useState } from "react";
import { toFahrenheitFmt } from "celsius";

export default function useTemperature() {
  const [celsius, setCelsius] = useState(true);

  const changeUnits = () => setCelsius(state => !state);

  const formatTemperature = temp => {
    if (!celsius) {
      return toFahrenheitFmt(temp);
    }
    return `${Math.round(temp)} °C`;
  };

  return { formatTemperature, changeUnits };
}
