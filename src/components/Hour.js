import React from "react";
import styled from "styled-components";

import Icon from "./Icon";

const HourContainer = styled.div``;

const Time = styled.div``;

const Temperature = styled.div``;

const Hour = ({ time, iconName, temperature, precipitation }) => (
  <HourContainer>
    <Time>{time}</Time>
    <Icon name={iconName} />

    <Temperature> {temperature} ℃</Temperature>
  </HourContainer>
);

export default Hour;
