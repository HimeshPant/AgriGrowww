// ICAR-aligned Agricultural Crop Knowledge Base

export const CROPS = {
  maize: {
    id: "maize",
    name: "Maize",
    hindiName: "मक्का",
    icon: "🌽",
    seasons: ["kharif"],
    sowingMonths: [6, 7], // June - July
    harvestMonths: [9, 10], // Sept - Oct
    waterNeed: "medium", // low, medium, high
    soil: ["loamy", "sandy-loam", "clay-loam"],
    minTemp: 18,
    maxTemp: 35,
    growthStages: [
      { id: "land_prep", name: "Land Preparation", hindi: "खेत की तैयारी", durationDays: 10 },
      { id: "sowing", name: "Sowing", hindi: "बुवाई", durationDays: 5 },
      { id: "vegetative", name: "Vegetative Growth", hindi: "वानस्पतिक वृद्धि", durationDays: 35 },
      { id: "tasseling", name: "Tasseling / Flowering", hindi: "मंजर आना / फूल", durationDays: 20 },
      { id: "grain_filling", name: "Grain Filling", hindi: "दाना भराव", durationDays: 25 },
      { id: "harvest", name: "Maturity & Harvest", hindi: "कटाई व गहाई", durationDays: 15 }
    ],
    suitableRegions: ["Uttarakhand", "Himachal Pradesh", "Punjab", "Haryana", "Rajasthan", "Madhya Pradesh", "Karnataka"],
    marketBasePrice: 2225, // MSP approx
    description: {
      en: "Versatile cereal crop with moderate water demand. Highly suitable for loamy hill soils and monsoon rainfed cultivation.",
      hi: "मध्यम जल आवश्यकता वाली प्रमुख धान्य फसल। पहाड़ी व दोमट मिट्टी तथा मानसूनी वर्षा आधारित खेती के लिए अत्यंत उपयुक्त।"
    }
  },

  soybean: {
    id: "soybean",
    name: "Soybean",
    hindiName: "सोयाबीन",
    icon: "🌱",
    seasons: ["kharif"],
    sowingMonths: [6, 7], // June - July
    harvestMonths: [9, 10],
    waterNeed: "medium",
    soil: ["loamy", "clay-loam"],
    minTemp: 20,
    maxTemp: 32,
    growthStages: [
      { id: "land_prep", name: "Land Prep", hindi: "खेत तैयारी", durationDays: 10 },
      { id: "sowing", name: "Sowing", hindi: "बुवाई", durationDays: 5 },
      { id: "vegetative", name: "Vegetative", hindi: "वानस्पतिक", durationDays: 30 },
      { id: "flowering", name: "Flowering", hindi: "फूल आना", durationDays: 20 },
      { id: "pod_formation", name: "Pod Formation", hindi: "फली बनना", durationDays: 25 },
      { id: "harvest", name: "Harvest", hindi: "कटाई", durationDays: 15 }
    ],
    suitableRegions: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttarakhand"],
    marketBasePrice: 4892,
    description: {
      en: "High-protein oilseed crop that fixes atmospheric nitrogen, improving soil fertility for subsequent rotations.",
      hi: "उच्च प्रोटीन युक्त तिलहनी फसल जो मिट्टी में नाइट्रोजन स्थिरीकरण कर उर्वरता बढ़ाती है।"
    }
  },

  rice: {
    id: "rice",
    name: "Paddy (Rice)",
    hindiName: "धान",
    icon: "🌾",
    seasons: ["kharif"],
    sowingMonths: [6, 7],
    harvestMonths: [10, 11],
    waterNeed: "high",
    soil: ["clay", "clay-loam"],
    minTemp: 22,
    maxTemp: 37,
    growthStages: [
      { id: "nursery", name: "Nursery", hindi: "नर्सरी", durationDays: 25 },
      { id: "transplanting", name: "Transplanting", hindi: "रोपाई", durationDays: 10 },
      { id: "tillering", name: "Tillering", hindi: "कल्ले फूटना", durationDays: 30 },
      { id: "panicle", name: "Panicle Initiation", hindi: "बाली निकलना", durationDays: 20 },
      { id: "maturity", name: "Harvest", hindi: "कटाई", durationDays: 20 }
    ],
    suitableRegions: ["Punjab", "West Bengal", "Uttar Pradesh", "Uttarakhand (Tarai)", "Andhra Pradesh"],
    marketBasePrice: 2300,
    description: {
      en: "Requires standing water and high clay retention. Suboptimal for rainfed steep hill terraces without assured irrigation.",
      hi: "अधिक जल व चिकनी मिट्टी की मांग। बिना सुनिश्चित सिंचाई वाले वर्षा-आधारित पहाड़ी ढलानों के लिए चुनौतीपूर्ण।"
    }
  },

  wheat: {
    id: "wheat",
    name: "Wheat",
    hindiName: "गेहूं",
    icon: "🌾",
    seasons: ["rabi"],
    sowingMonths: [10, 11, 12], // Oct - Dec
    harvestMonths: [3, 4], // March - April
    waterNeed: "medium",
    soil: ["loamy", "clay-loam"],
    minTemp: 10,
    maxTemp: 25,
    growthStages: [
      { id: "sowing", name: "Sowing & Germination", hindi: "बुवाई व अंकुरण", durationDays: 15 },
      { id: "cri", name: "Crown Root (CRI)", hindi: "शिखर जड़ अवस्था", durationDays: 21 },
      { id: "tillering", name: "Tillering", hindi: "कल्ले निकलना", durationDays: 25 },
      { id: "jointing", name: "Jointing", hindi: "गांठ बनना", durationDays: 20 },
      { id: "flowering", name: "Flowering & Milking", hindi: "फूल व दुग्धावस्था", durationDays: 20 },
      { id: "harvest", name: "Harvest", hindi: "कटाई", durationDays: 15 }
    ],
    suitableRegions: ["Punjab", "Haryana", "Uttar Pradesh", "Uttarakhand", "Madhya Pradesh"],
    marketBasePrice: 2275,
    description: {
      en: "Primary winter Rabi cereal requiring cool temperatures during vegetative phase and warm ripening conditions.",
      hi: "प्रमुख रबी शीतकालीन फसल जिसे शुरुआती वृद्धि के लिए ठंडे मौसम और पकते समय हल्की धूप की आवश्यकता होती है।"
    }
  },

  mustard: {
    id: "mustard",
    name: "Mustard",
    hindiName: "सरसों",
    icon: "🌼",
    seasons: ["rabi"],
    sowingMonths: [10, 11],
    harvestMonths: [2, 3],
    waterNeed: "low",
    soil: ["loamy", "sandy-loam"],
    minTemp: 10,
    maxTemp: 25,
    growthStages: [
      { id: "sowing", name: "Sowing", hindi: "बुवाई", durationDays: 10 },
      { id: "vegetative", name: "Vegetative", hindi: "वानस्पतिक", durationDays: 30 },
      { id: "flowering", name: "Flowering", hindi: "फूल खिलना", durationDays: 25 },
      { id: "pod_development", name: "Pod Filling", hindi: "फलियां बनना", durationDays: 30 },
      { id: "harvest", name: "Harvest", hindi: "कटाई", durationDays: 15 }
    ],
    suitableRegions: ["Rajasthan", "Haryana", "Uttar Pradesh", "Uttarakhand", "Madhya Pradesh"],
    marketBasePrice: 5650,
    description: {
      en: "Low water requirement oilseed crop ideal for moisture-conserved Rabi fields following Kharif harvest.",
      hi: "कम पानी में तैयार होने वाली प्रमुख तिलहनी फसल जो खरीफ की कटाई के बाद संरक्षित नमी में उत्कृष्ट परिणाम देती है।"
    }
  },

  chickpea: {
    id: "chickpea",
    name: "Chickpea (Gram)",
    hindiName: "चना",
    icon: "🧆",
    seasons: ["rabi"],
    sowingMonths: [10, 11],
    harvestMonths: [3, 4],
    waterNeed: "low",
    soil: ["loamy", "sandy-loam"],
    minTemp: 12,
    maxTemp: 28,
    growthStages: [
      { id: "sowing", name: "Sowing", hindi: "बुवाई", durationDays: 10 },
      { id: "vegetative", name: "Vegetative", hindi: "वानस्पतिक", durationDays: 35 },
      { id: "flowering", name: "Flowering", hindi: "फूल आना", durationDays: 25 },
      { id: "pod", name: "Pod Development", hindi: "घंटी/फली बनना", durationDays: 30 },
      { id: "harvest", name: "Harvest", hindi: "कटाई", durationDays: 15 }
    ],
    suitableRegions: ["Madhya Pradesh", "Rajasthan", "Maharashtra", "Uttar Pradesh", "Uttarakhand"],
    marketBasePrice: 5440,
    description: {
      en: "Drought-tolerant pulse with low water needs. Deep taproot system extracts residual soil moisture.",
      hi: "सूखा सहन करने में सक्षम दलहनी फसल जिसकी गहरी जड़ें मिट्टी की अवशिष्ट नमी का समुचित उपयोग करती हैं।"
    }
  }
};
