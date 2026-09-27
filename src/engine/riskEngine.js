// Agricultural Risk & Stress Engine

export function evaluateFarmRisks(farmer, weather) {
  const tomorrow = weather.days[1];
  
  // Humidity > 75% + moderate temp triggers fungal/leaf disease risk
  const isHumid = tomorrow.humidity >= 75;
  const pestRiskLevel = isHumid ? "MEDIUM" : "LOW";
  const pestRiskPercent = isHumid ? 58 : 22;

  return {
    weatherRisk: {
      level: "LOW-MEDIUM",
      score: 35,
      label: { en: "Low-Medium Weather Risk", hi: "मौसम जोखिम: मध्यम" },
      reason: {
        en: "Monsoon shower expected; manageable with proper ridge and furrow drainage.",
        hi: "मध्यम वर्षा का अनुमान; नालियों द्वारा जल निकासी संभव है।"
      }
    },
    waterStress: {
      level: "LOW",
      score: 15,
      label: { en: "No Water Stress", hi: "जल तनाव: बिल्कुल नहीं" },
      reason: {
        en: "Soil moisture stands at 68%, fully adequate for vegetative stage Maize.",
        hi: "मिट्टी में 68% नमी उपलब्ध है जो बढ़वार अवस्था के लिए आदर्श है।"
      }
    },
    pestDiseaseRisk: {
      level: pestRiskLevel,
      score: pestRiskPercent,
      label: { en: `${pestRiskLevel} Disease Risk (Maydis Blight)`, hi: `रोग जोखिम: ${pestRiskLevel === 'MEDIUM' ? 'मध्यम' : 'कम'}` },
      targetIssue: "Maydis Leaf Blight / Fungal Spot",
      targetIssueHindi: "पत्ती धब्बा / फंगल संक्रमण",
      reason: {
        en: "Relative humidity spiking to 84% creates damp canopy microclimate favorable for fungal spore germination.",
        hi: "84% आर्द्रता व बारिश के कारण पत्तियों पर लगातार नमी रहने से फंगस का जोखिम बढ़ सकता है।"
      }
    }
  };
}
