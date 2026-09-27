// Weather Forecast & Agro-Meteorological Intelligence Dataset

export const WEATHER_FORECAST = {
  location: "Pithoragarh, Uttarakhand",
  current: {
    temp: 28,
    tempMin: 19,
    tempMax: 29,
    condition: "Partly Cloudy",
    conditionHindi: "आंशिक रूप से बादल",
    icon: "⛅",
    humidity: 72,
    rainfallChance: 30,
    windSpeed: 9,
    windDirection: "SE",
    soilMoisture: "Adequate (68%)",
    soilMoistureHindi: "पर्याप्त नमी (68%)"
  },
  days: [
    {
      day: "Today",
      dayHindi: "आज",
      date: "27 Sep",
      temp: "28°C / 19°C",
      condition: "Partly Cloudy",
      conditionHindi: "हल्के बादल",
      icon: "⛅",
      rainChance: 30,
      expectedRainMm: 2,
      humidity: 72,
      farmAction: "Routine field monitoring. Safe for manual weeding."
    },
    {
      day: "Tomorrow",
      dayHindi: "कल",
      date: "28 Sep",
      temp: "26°C / 18°C",
      condition: "Moderate to Heavy Rain",
      conditionHindi: "मध्यम से तेज बारिश",
      icon: "🌧️",
      rainChance: 70,
      expectedRainMm: 18,
      humidity: 84,
      farmAction: "Delay scheduled irrigation. Check field drainage channels to prevent water stagnation."
    },
    {
      day: "Day 3",
      dayHindi: "परसों",
      date: "29 Sep",
      temp: "27°C / 19°C",
      condition: "Scattered Showers",
      conditionHindi: "रुक-रुक कर बौछारें",
      icon: "🌦️",
      rainChance: 45,
      expectedRainMm: 6,
      humidity: 74,
      farmAction: "Inspect soil moisture before resuming any chemical spray or nutrient application."
    }
  ],
  advisoryAlert: {
    title: {
      en: "Rain Expected Tomorrow (70% Probability)",
      hi: "कल 70% बारिश की संभावना"
    },
    action: {
      en: "Delay irrigation today and monitor drainage channels.",
      hi: "आज अतिरिक्त सिंचाई न करें तथा खेत से पानी निकासी की व्यवस्था जांचें।"
    },
    reason: {
      en: "Forecast predicts 18mm rainfall over the next 24 hours. Combined with 68% current soil moisture, adding irrigation will cause waterlogging in vegetative Maize.",
      hi: "अगले 24 घंटों में 18 मिमी वर्षा का अनुमान है। खेत में पहले से 68% नमी है, अतः पानी लगाने से जलभराव और जड़ों में सड़न का खतरा हो सकता है।"
    }
  }
};
