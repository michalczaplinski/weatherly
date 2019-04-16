import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const DayContainer = styled.div`
  display: flex;
`;

const Day = ({
  dayName,
  icon,
  temperatureHigh,
  temperatureLow,
  precipProbability
}) => {
  return (
    <DayContainer>
      <div> {dayName}</div>
      <Icon name={icon} />
      <span>
        {temperatureHigh} °C <b>{temperatureLow} °C </b>
      </span>
      <div> {Math.round(precipProbability * 100)} %</div>
    </DayContainer>
  );
};

export default Day;
