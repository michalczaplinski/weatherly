import React from "react";

import { ReactComponent as Cloudy } from "../icons/wi-cloudy.svg";
import { ReactComponent as DayClear } from "../icons/wi-day-sunny.svg";
import { ReactComponent as DayCloudy } from "../icons/wi-day-cloudy.svg";
import { ReactComponent as NightClear } from "../icons/wi-night-clear.svg";
import { ReactComponent as NightCloudy } from "../icons/wi-night-cloudy.svg";
import { ReactComponent as Fog } from "../icons/wi-fog.svg";
import { ReactComponent as Rain } from "../icons/wi-rain.svg";
import { ReactComponent as Sleet } from "../icons/wi-sleet.svg";
import { ReactComponent as Snow } from "../icons/wi-snow.svg";
import { ReactComponent as Wind } from "../icons/wi-windy.svg";

const mapIcons = iconName => {
  switch (iconName) {
    case "clear-day":
      return DayClear;
    case "clear-night":
      return NightClear;
    case "partly-cloudy-day":
      return DayCloudy;
    case "partly-cloudy-night":
      return NightCloudy;
    case "rain":
      return Rain;
    case "snow":
      return Snow;
    case "sleet":
      return Sleet;
    case "wind":
      return Wind;
    case "fog":
      return Fog;
    case "cloudy":
      return Cloudy;
    default:
      return null;
  }
};

const Icon = ({ name, style, ...props }) => {
  const iconElement = mapIcons(name);
  if (!iconElement) return null;

  return React.createElement(iconElement, {
    style: { width: 100, ...style },
    ...props
  });
};

export default Icon;
