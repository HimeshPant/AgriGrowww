// Mandi Market Rates & Selling Intelligence Dataset
// Note: Prepared with verified modal price patterns, labeled for eNAM/Agmarknet integration

export const MARKET_DATA = {
  crop: "Maize",
  cropHindi: "मक्का",
  unit: "₹ / Quintal",
  overallTrend: "+4.2%",
  trendDirection: "up",
  sampleDatasetNotice: {
    en: "Demo market dataset • Integration-ready for eNAM & Agmarknet feeds",
    hi: "नमूना मंडी डेटासेट • ई-नाम (eNAM) व एगमार्कनेट एकीकरण हेतु तैयार"
  },
  mandis: [
    {
      name: "Pithoragarh Mandi (Local)",
      nameHindi: "पिथौरागढ़ मंडी (स्थानीय)",
      distance: "12 km",
      modalPrice: 2350,
      minPrice: 2200,
      maxPrice: 2420,
      changePercent: "+4.2%",
      trend: "up",
      arrivalQuantity: "140 Qtl"
    },
    {
      name: "Haldwani Mandi",
      nameHindi: "हल्द्वानी मंडी",
      distance: "165 km",
      modalPrice: 2420,
      minPrice: 2280,
      maxPrice: 2500,
      changePercent: "+3.8%",
      trend: "up",
      arrivalQuantity: "520 Qtl"
    },
    {
      name: "Tanakpur Mandi",
      nameHindi: "टनकपुर मंडी",
      distance: "140 km",
      modalPrice: 2390,
      minPrice: 2250,
      maxPrice: 2460,
      changePercent: "+2.5%",
      trend: "up",
      arrivalQuantity: "280 Qtl"
    }
  ],
  priceHistory7Days: [
    { day: "21 Sep", price: 2250 },
    { day: "22 Sep", price: 2270 },
    { day: "23 Sep", price: 2290 },
    { day: "24 Sep", price: 2310 },
    { day: "25 Sep", price: 2325 },
    { day: "26 Sep", price: 2340 },
    { day: "27 Sep", price: 2350 }
  ],
  sellingAdvice: {
    en: "Mandi prices in Kumaon region show a steady 4.2% upward trajectory due to active poultry feed demand. If clean, dry post-harvest storage is available, staggered selling over the next 2-3 weeks can yield ₹80-120/q higher margins.",
    hi: "कुमाऊं क्षेत्र में पोल्ट्री व स्टार्च मांग के चलते मक्के के दामों में 4.2% की निरंतर बढ़त देखी जा रही है। यदि आपके पास सूखा व सुरक्षित भंडारण है, तो अगले 2-3 हफ्तों में चरणबद्ध बिक्री करने से ₹80-120 प्रति क्विंटल अतिरिक्त लाभ मिल सकता है।"
  }
};
