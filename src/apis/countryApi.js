import Swal from "sweetalert2";
import http from "./https";

export const getCountries = async () => {
  const data = await http.get("/place/countries");

  if (!data.ok) {
    await Swal.fire(data.problem, data.message, "error");
  }
  console.log(data.data.countries);
  return data.data.countries;
};

export const getStatesOfCountry = async (countryCode) => {
  const data = await http.get(`/place/states/${countryCode}`);

  if (!data.ok) {
    await Swal.fire(data.problem, data.data.message, "error");
  }
  return data.data.states;
};

export const getCitiesOfCountry = async (countryCode, statesCode) => {
  const data = await http.get(`/place/cities/${countryCode}/${statesCode}`);

  if (!data.ok) {
    await Swal.fire(data.problem, data.data.message, "error");
  }
  return data.data.cities;
};
