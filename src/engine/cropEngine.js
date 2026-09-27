// Deterministic Agricultural Crop Recommendation Engine
// Strictly validates ICAR crop seasons, sowing windows, soil, and water constraints

import { CROPS } from '../data/crops';

export function evaluateCropSuitability({
  season = "kharif",
  month = 7, // 1 - 12 (July = 7)
  soil = "loamy",
  irrigation = "rainfed",
  state = "Uttarakhand",
  district = "Pithoragarh"
}) {
  const results = [];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthName = monthNames[month - 1];

  for (const cropKey in CROPS) {
    const crop = CROPS[cropKey];
    let score = 0;
    const reasons = [];
    const negativeReasons = [];

    // 1. Season Compatibility Check
    const isSeasonMatch = crop.seasons.includes(season.toLowerCase());
    if (isSeasonMatch) {
      score += 35;
      reasons.push({
        status: "pass",
        text: `Compatible with ${season.toUpperCase()} season crop calendar.`
      });
    } else {
      score -= 50;
      const primarySeason = crop.seasons[0].toUpperCase();
      negativeReasons.push({
        status: "fail",
        text: `${crop.name} is primarily a ${primarySeason} crop. Sowing during ${season.toUpperCase()} disrupts physiological photoperiod & thermal needs.`
      });
    }

    // 2. Sowing Window Check
    const isInWindow = crop.sowingMonths.includes(month);
    if (isInWindow) {
      score += 25;
      reasons.push({
        status: "pass",
        text: `Current month (${currentMonthName}) is inside the optimal ICAR sowing window.`
      });
    } else {
      score -= 25;
      const windowStr = crop.sowingMonths.map(m => monthNames[m - 1]).join(" - ");
      negativeReasons.push({
        status: "fail",
        text: `Current month (${currentMonthName}) falls outside recommended sowing window (${windowStr}).`
      });
    }

    // 3. Soil Compatibility
    const isSoilMatch = crop.soil.includes(soil.toLowerCase());
    if (isSoilMatch) {
      score += 20;
      reasons.push({
        status: "pass",
        text: `Well-suited for ${soil} soil texture.`
      });
    } else {
      score -= 15;
      negativeReasons.push({
        status: "warn",
        text: `Suboptimal for ${soil} soil. Prefers: ${crop.soil.join(", ")}.`
      });
    }

    // 4. Water & Irrigation Compatibility
    if (irrigation === "rainfed") {
      if (crop.waterNeed === "low" || crop.waterNeed === "medium") {
        score += 15;
        reasons.push({
          status: "pass",
          text: `Moderate/low water demand aligns well with rainfed conditions.`
        });
      } else {
        score -= 25;
        negativeReasons.push({
          status: "fail",
          text: `High water demand crop. Rainfed terrace without standing irrigation carries high drought/yield risk.`
        });
      }
    } else {
      // Assured / partial irrigation
      score += 15;
      reasons.push({
        status: "pass",
        text: `Assured irrigation satisfies crop water needs.`
      });
    }

    // 5. Regional Suitability
    if (crop.suitableRegions.includes(state)) {
      score += 15;
      reasons.push({
        status: "pass",
        text: `Proven agro-climatic adaptability in ${state}.`
      });
    }

    // Classify Rating
    let suitability = "LOW";
    let suitabilityLabel = { en: "Not Recommended", hi: "अनुशंसित नहीं" };
    let badgeColor = "coral";

    if (score >= 75) {
      suitability = "HIGH";
      suitabilityLabel = { en: "High Suitability", hi: "अत्यधिक उपयुक्त" };
      badgeColor = "emerald";
    } else if (score >= 45) {
      suitability = "MODERATE";
      suitabilityLabel = { en: "Moderate / Alternative", hi: "मध्यम उपयुक्त" };
      badgeColor = "amber";
    } else {
      suitability = "REJECTED";
      suitabilityLabel = { en: "Not Recommended for Planting Now", hi: "वर्तमान बुवाई हेतु अनुशंसित नहीं" };
      badgeColor = "coral";
    }

    results.push({
      crop,
      score,
      suitability,
      suitabilityLabel,
      badgeColor,
      reasons,
      negativeReasons
    });
  }

  // Sort: High suitability first, then moderate, then rejected
  results.sort((a, b) => b.score - a.score);

  return {
    evaluatedAt: new Date().toISOString(),
    context: { season, month: currentMonthName, soil, irrigation, state, district },
    recommendations: results.filter(r => r.suitability !== "REJECTED"),
    unsuitable: results.filter(r => r.suitability === "REJECTED")
  };
}
