import React from "react";
import styled, { withTheme } from "styled-components";

import Icon from "./Icon";
import { ReactComponent as RainIcon } from "../icons/wi-raindrop.svg";

const DayContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr minmax(50px, 1fr) minmax(50px, 1fr);
  min-height: 70px;
`;

const DayIcon = styled(Icon)`
  @media screen and (max-width: 450px) {
    max-width: 40px;
  }
`;

const DayName = styled.h2`
  margin-left: 30px;
  margin-right: 30px;

  @media screen and (max-width: 450px) {
    margin-left: 5px;
    margin-right: 5px;
    font-size: calc(3vh + 2px);
  }
`;

const Temperature = styled.div`
  @media screen and (max-width: 450px) {
    margin-left: 10px;
    font-size: calc(2vh + 2px);
  }
`;

const TempHigh = styled.div`
  font-weight: 600;
  margin-bottom: 12px;
`;

const TempLow = styled.div``;

const Precipitation = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  text-align: center;
  font-size: calc(2vh + 2px);
`;

const Day = ({
  dayName,
  icon,
  temperatureHigh,
  temperatureLow,
  precipProbability,
  theme
}) => {
  return (
    <DayContainer>
      <DayIcon name={icon} style={{ minWidth: 40 }} />
      <DayName> {dayName}</DayName>
      <Temperature>
        <TempHigh>{temperatureHigh}</TempHigh>
        <TempLow>{temperatureLow} </TempLow>
      </Temperature>
      <Precipitation>
        <RainIcon
          style={{ fill: theme.textColor, maxWidth: 20, transform: "scale(2)" }}
        />
        {Math.round(precipProbability * 100)} %
      </Precipitation>
    </DayContainer>
  );
};

export default withTheme(Day);
