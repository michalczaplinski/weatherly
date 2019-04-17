import React, { useState } from "react";
import styled, { css } from "styled-components";

const checkboxWidth = 40;
const checkboxHeight = 14;

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: ${checkboxWidth}px;
  z-index: 10;
`;

const UnitsContainer = styled.div`
  text-align: center;
  padding-right: 5px;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${checkboxHeight}px;
  border-radius: ${checkboxHeight}px;
  border: 1px solid ${({ theme }) => theme.textColor};

  :before {
    position: absolute;
    content: "";
    height: ${checkboxHeight - 6}px;
    width: ${checkboxHeight - 6}px;
    left: 2px;
    bottom: 2px;
    background-color: ${({ theme }) => theme.textColor};
    transition: all 0.4s;
    border-radius: 50%;
    transform: translateX(0px);

    ${({ checked }) =>
      checked &&
      css`
        transform: translateX(${checkboxWidth - 16}px);
      `}
  }
`;

const UnitsSwitch = ({ changeUnits }) => {
  const [checked, setChecked] = useState(false);

  return (
    <SwitchContainer>
      <Checkbox type="checkbox" />
      <Slider
        checked={checked}
        onClick={e => {
          setChecked(state => !state);
          changeUnits();
        }}
      />
      <UnitsContainer>{checked ? "°F" : "°C"}</UnitsContainer>
    </SwitchContainer>
  );
};

export default UnitsSwitch;
