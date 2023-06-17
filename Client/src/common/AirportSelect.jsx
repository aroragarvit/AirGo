import { useMemo } from "react";
import Select from "react-select";
import airportsJson from "../constants/airport.json";
import { useColorModeValue } from "@chakra-ui/react";

export const AirportSelect = ({ onChange, data, label }) => {
  const airports = airportsJson.airports;

  const findAirport = useMemo(() => {
    return (airportCode) => {
      return airports.find((airport) => airport.IATA_code === airportCode);
    };
  }, [airports]);

  return (
    <Select
      options={airports.map((airport) => ({
        value: airport.IATA_code,
        label: `${airport.airport_name} (${airport.IATA_code})`,
      }))}
      placeholder={label}
      styles={{
        control: (base) => ({
          ...base,
          border: 0,
          boxShadow: "none",
          width: ["full", null, "300px"],
          backgroundColor: useColorModeValue("#E2E8F0", "#2D3748"),
        }),
        placeholder: (base) => ({
          ...base,
          color: useColorModeValue("black", "white"),
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: useColorModeValue("white", "#1D1F29"),
        }),
        menuList: (base) => ({
          ...base,
          color: useColorModeValue("black", "white"),
          _hover: {
            color: useColorModeValue("white", "black"),
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: useColorModeValue("black", "white"),
        }),
      }}
      onChange={onChange}
      value={
        data[label.toLowerCase()].length > 0
          ? { value: data[label.toLowerCase()], label: findAirport(data[label.toLowerCase()]).airport_name }
          : null
      }
    />
  );
};
