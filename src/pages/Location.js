import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { DateTime } from "luxon";

import { ReactComponent as SearchIcon } from "../assets/search.svg";

import Icon from "../components/Icon";
import Hour from "../components/Hour";
import Day from "../components/Day";
import Switch from "../components/UnitsSwitch";

import useLoading from "../hooks/useLoading";
import useTemperature from "../hooks/useTemperature";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const UnitsSwitch = styled(Switch)`
  align-self: flex-start;
  margin-top: 7px;
`;

const Link = styled(RouterLink)`
  padding: 7px;

  :hover {
    background-color: #f5d8cd;
  }

  transition: background-color 150ms ease-in-out;
`;

const Layout = styled.div`
  margin: 0 auto;
  max-width: 960px;

  @media screen and (max-width: 1000px) {
    max-width: 90vw;
  }

  transition: opacity 350ms ease-in-out;
  opacity: 1;
  ${({ isLoading }) => isLoading && "opacity: 0"};
`;

const CurrentWeatherContainer = styled.div`
  background: ${({ theme }) => theme.secondaryColor};
  margin-bottom: 70px;
  padding: 20px 20px;
  box-shadow: 0px 2px 5px 5px rgba(185, 185, 185, 0.2);
  transform: translateY(30px);
`;

const RestOfTheWeekContainer = styled.div`
  background: ${({ theme }) => theme.secondaryColor};
  margin-bottom: 70px;
  padding: 20px 20px;
  box-shadow: 0px 2px 5px 5px rgba(185, 185, 185, 0.2);
`;

const LocationName = styled.h1`
  text-align: center;
  margin: 0;
  font-size: calc(3vw + 5px);
  font-weight: 200;
`;

const MainInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  margin-top: 55px;
  margin-bottom: 65px;
`;

const TemperatureContainer = styled.div`
  display: flex;
  align-items: center;
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
  max-width: 50%;
  padding: 10px;

  @media screen and (max-width: 450px) {
    max-width: 100%;
    margin-left: 20px;
  }
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

  const { formatTemperature, changeUnits } = useTemperature();

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
        <CurrentWeatherContainer>
          <Header>
            <UnitsSwitch changeUnits={changeUnits} />
            <LocationName>
              {locationName.split(",")[0].toUpperCase()}
            </LocationName>
            <Link to="/">
              <SearchIcon />
            </Link>
          </Header>

          <MainInfo>
            <TemperatureContainer>
              <Icon name={icon} style={{ transform: `scale(1.7)` }} />
              <div style={{ marginLeft: 15 }}>
                <Temperature>{formatTemperature(temperature)} </Temperature>
                <FeelsLike>
                  Feels like {formatTemperature(apparentTemperature)}
                </FeelsLike>
              </div>
            </TemperatureContainer>
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
                temperature={formatTemperature(temperature)}
              />
            ))}
          </HoursContainer>
        </CurrentWeatherContainer>

        <RestOfTheWeekContainer>
          <h1> Rest of the week </h1>
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
                  temperatureHigh={formatTemperature(temperatureHigh)}
                  temperatureLow={formatTemperature(temperatureLow)}
                  icon={icon}
                  dayName={
                    DateTime.fromSeconds(time, { zone: timezone }).weekdayLong
                  }
                  precipProbability={precipProbability}
                />
              )
            )}
          </DaysContainer>
        </RestOfTheWeekContainer>
      </>
    );
  }

  return <Layout isLoading={isLoading}>{component}</Layout>;
};

export default Location;
