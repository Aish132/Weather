export const fetchWeather = async (city) => {
  await new Promise((r) => setTimeout(r, 500)); // simulate network delay
  return {
    name: city,
    main: { temp: 22, humidity: 60 },
    weather: [{ description: "Clear sky" }],
  };
};
