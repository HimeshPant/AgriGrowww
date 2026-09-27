// Default Pre-loaded Hero Farmer Profile (Pithoragarh, Uttarakhand)

export const DEFAULT_FARMER = {
  id: "FARMER-UK-042",
  name: "Himesh Pant",
  hindiName: "हिमेश पंत",
  phone: "+91 98765 43210",
  state: "Uttarakhand",
  district: "Pithoragarh",
  village: "Chandak",
  farmSizeAcres: 2.0,
  irrigation: "rainfed", // rainfed, partial, fully_irrigated
  soil: "loamy", // loamy, clay, sandy_loam, clay_loam
  soilHealth: {
    pH: 6.6,
    organicCarbon: "Medium (0.62%)",
    nitrogen: "Low (192 kg/ha)",
    phosphorus: "Medium (18 kg/ha)",
    potassium: "Medium (185 kg/ha)"
  },
  currentCrop: {
    id: "maize",
    name: "Maize",
    hindiName: "मक्का",
    icon: "🌽",
    season: "kharif",
    sowingDate: "2026-06-18",
    stage: "vegetative",
    stageHindi: "वानस्पतिक वृद्धि",
    stageProgressPercent: 42,
    stageDay: 42,
    totalCycleDays: 110
  }
};
