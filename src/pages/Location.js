import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { DateTime } from "luxon";

import { ReactComponent as SearchIcon } from "../assets/search.svg";

import Icon from "../components/Icon";
import Hour from "../components/Hour";
import Day from "../components/Day";
import useLoading from "../hooks/useLoading";

const Link = styled(RouterLink)`
  padding: 7px;
  float: right;
  margin-left: 15px;

  :hover {
    background-color: #f5d8cd;
  }

  transition: background-color 150ms ease-in-out;
`;

const Layout = styled.div`
  background: ${({ theme }) => theme.secondaryColor};
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 70px;
  padding: 20px 40px;
  box-shadow: 0px 2px 5px 5px rgba(185, 185, 185, 0.2);
  transform: translateY(30px);

  @media screen and (max-width: 1000px) {
    max-width: 90vw;
  }

  transition: opacity 350ms ease-in-out;
  opacity: 1;
  ${({ isLoading }) => isLoading && "opacity: 0"};
`;

const LocationName = styled.h1`
  text-align: center;
  margin: 0;
  font-size: 36px;
  font-weight: 200;
  margin-bottom: 30px;
`;

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`;

const Temperature = styled.div`
  font-size: 42px;
  font-weight: 700;
`;

const FeelsLike = styled.div`
  font-size: 15px;
`;

const Summary = styled.div`
  font-size: 28px;
`;

const HoursContainer = styled.div`
  padding-bottom: 20px
  display: flex;
  overflow: scroll;
`;

const DaysContainer = styled.div``;

const Location = ({
  location: {
    state: { coords, locationName }
  }
}) => {
  const {
    loadingState: { isLoading, hasError, response },
    loadPromise
  } = useLoading();

  useEffect(() => {
    loadPromise(axios.post(`/.netlify/functions/weather`, { coords }));
  }, [coords]);

  let component = null;

  if (hasError) {
    component = "Error loading the data.";
  }

  if (isLoading) {
    component = null;
  }

  if (!isLoading && !hasError) {
    const { hourly, daily, timezone } = response.data;
    const { icon, temperature, apparentTemperature } = response.data.currently;

    component = (
      <>
        <Link to="/">
          <SearchIcon />
        </Link>
        <LocationName>{locationName.split(",")[0].toUpperCase()}</LocationName>
        <MainInfo>
          <Icon name={icon} style={{ transform: `scale(1.7)` }} />
          <div style={{ marginLeft: 15 }}>
            <Temperature> {Math.round(temperature)} °C </Temperature>
            <FeelsLike>
              Feels like {Math.round(apparentTemperature)} °C
            </FeelsLike>
          </div>
          <Summary> {hourly.summary} </Summary>
        </MainInfo>

        <HoursContainer>
          {hourly.data.map(({ time, icon, temperature }) => (
            <Hour
              key={time}
              time={DateTime.fromSeconds(time, {
                zone: timezone
              }).toLocaleString(DateTime.TIME_SIMPLE)}
              iconName={icon}
              temperature={Math.round(temperature)}
            />
          ))}
        </HoursContainer>

        <h2> Rest of the week </h2>
        <DaysContainer>
          {daily.data.map(
            ({
              temperatureHigh,
              temperatureLow,
              icon,
              time,
              precipProbability
            }) => (
              <Day
                key={time}
                temperatureHigh={temperatureHigh}
                temperatureLow={temperatureLow}
                icon={icon}
                dayName={
                  DateTime.fromSeconds(time, { zone: timezone }).weekdayLong
                }
                precipProbability={precipProbability}
              />
            )
          )}
        </DaysContainer>
      </>
    );
  }

  return <Layout isLoading={isLoading}>{component}</Layout>;
};

export default Location;
