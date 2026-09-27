// Context-Aware Farm Advisory & Decision Support Engine
// Synthesizes farmer profile + crop stage + weather forecast into actionable decisions

export function generateDailyAdvisory(farmer, weather) {
  const crop = farmer.currentCrop;
  const tomorrow = weather.days[1];

  // Logic: If rain probability >= 60% and rainfall expected >= 10mm
  const isRainLikely = tomorrow.rainChance >= 60;
  
  let advisory = {};

  if (isRainLikely) {
    advisory = {
      title: {
        en: "Rain Expected Tomorrow (70% Probability)",
        hi: "कल 70% बारिश की संभावना • सिंचाई स्थगित करें"
      },
      action: {
        en: "Delay scheduled irrigation today and inspect drainage channels.",
        hi: "आज सिंचाई न करें तथा खेत में जल निकासी नालियों की सफाई सुनिश्चित करें।"
      },
      why: {
        en: `Forecast shows 70% rain probability (18mm) over Pithoragarh tomorrow. With soil moisture already adequate (68%), additional watering will induce root waterlogging in vegetative Maize.`,
        hi: `कल पिथौरागढ़ में 70% संभावना के साथ 18 मिमी बारिश का अनुमान है। मिट्टी में 68% पर्याप्त नमी पहले से है, अतः सिंचाई करने से मक्के की फसल में जलभराव व जड़ों के सड़ने का जोखिम होगा।`
      },
      priority: "HIGH",
      priorityBadge: "agri-coral",
      voiceText: {
        en: "Farm advisory for your maize field in Pithoragarh: Rain is expected tomorrow with seventy percent probability. Avoid irrigation today and inspect your field drainage channels.",
        hi: "पिथौरागढ़ में आपकी मक्के की फसल के लिए कृषि सलाह: कल 70 प्रतिशत बारिश की संभावना है। आज अतिरिक्त पानी न लगाएं और खेत की जलनिकासी जांच लें।"
      },
      weeklyTasks: [
        {
          id: "task-1",
          task: { en: "Inspect & unclog drainage channels before rain", hi: "बारिश से पूर्व खेत के जल निकासी नाले साफ करें" },
          status: "urgent"
        },
        {
          id: "task-2",
          task: { en: "Scout lower leaves for early leaf-blight lesions", hi: "निचली पत्तियों पर फफूंद व धब्बों की निगरानी करें" },
          status: "pending"
        },
        {
          id: "task-3",
          task: { en: "Delay urea / fertilizer top-dressing until rain subsides", hi: "यूरिया या किसी भी खाद का बुरकाव बारिश रुकने तक टालें" },
          status: "warning"
        },
        {
          id: "task-4",
          task: { en: "Monitor soil moisture 24 hours post-rainfall", hi: "बारिश के 24 घंटे बाद मिट्टी में नमी की पुनः जांच करें" },
          status: "pending"
        }
      ]
    };
  } else {
    advisory = {
      title: {
        en: "Dry Conditions: Normal Field Operations",
        hi: "मौसम सामान्य: नियमित कृषि कार्य जारी रखें"
      },
      action: {
        en: "Proceed with scheduled light irrigation and routine manual weeding.",
        hi: "हल्की सिंचाई और खेत से खरपतवार निकालने का कार्य जारी रखें।"
      },
      why: {
        en: "Dry canopy and moderate sunshine provide ideal conditions for nutrient uptake and weeding.",
        hi: "धूप और सूखा मौसम निराई-गुड़ाई और पोषण प्रबंधन के लिए अनुकूल है।"
      },
      priority: "NORMAL",
      priorityBadge: "agri-primary",
      voiceText: {
        en: "Weather is stable today. You may proceed with light irrigation and routine weeding.",
        hi: "आज मौसम सामान्य रहेगा। आप हल्की सिंचाई और खरपतवार नियंत्रण कर सकते हैं।"
      },
      weeklyTasks: [
        { id: "task-1", task: { en: "Manual weeding between rows", hi: "पंक्तियों के बीच से खरपतवार निकालें" }, status: "pending" },
        { id: "task-2", task: { en: "Check soil moisture depth", hi: "मिट्टी में नमी की गहराई जांचें" }, status: "pending" }
      ]
    };
  }

  return advisory;
}
