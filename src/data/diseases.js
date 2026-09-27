// Crop Disease Knowledge Base & Diagnostic Sample Cases
// Emphasizes explainability, environmental risk factors, and non-chemical cultural steps

export const DISEASE_CASES = {
  maize_leaf_spot: {
    id: "maize_leaf_spot",
    crop: "Maize",
    cropHindi: "मक्का",
    issueName: "Maydis Leaf Blight / Leaf Spot",
    issueNameHindi: "मेडीस लीफ ब्लाइट / पत्ती धब्बा रोग",
    confidence: 78,
    screeningDisclaimer: {
      en: "AI-assisted preliminary screening (78% confidence). Always confirm with local KVK experts before chemical intervention.",
      hi: "एआई-आधारित प्रारंभिक जांच (78% सटीकता)। रासायनिक दवा डालने से पूर्व स्थानीय कृषि विज्ञान केंद्र (KVK) से पुष्टि अवश्य करें।"
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&w=600&q=80",
    symptomsObserved: [
      {
        en: "Small, oval to elongated elliptical lesions (1-2 cm) on lower leaves",
        hi: "निचली पत्तियों पर 1-2 सेमी के अंडाकार व फैले हुए धब्बे"
      },
      {
        en: "Lesions appear grayish-tan with distinct yellow chlorotic borders",
        hi: "धब्बों का रंग मटमैला भूरा जिसके किनारे पीलापन है"
      },
      {
        en: "Symptoms prominent on older leaves progressing upward",
        hi: "लक्षण पहले निचली पुरानी पत्तियों पर उभरे हैं"
      }
    ],
    riskFactors: [
      {
        en: "High relative humidity (>75%) coupled with 26-28°C temperatures",
        hi: "75% से अधिक हवा में नमी और 26-28°C तापमान फंगस के लिए अनुकूल"
      },
      {
        en: "Extended leaf wetness due to upcoming rainfall forecast",
        hi: "आने वाली बारिश से पत्तियों पर पानी जमा रहने से फंगल फैलाव का जोखिम"
      }
    ],
    recommendedActions: [
      {
        title: { en: "Improve Field Aeration & Drainage", hi: "खेत में हवा व जल निकासी सुधारें" },
        desc: { en: "Ensure drainage channels are clear ahead of tomorrow's rain to prevent stagnating ground humidity.", hi: "कल होने वाली बारिश से पहले खेत के नाले साफ रखें ताकि नमी कम रहे।" }
      },
      {
        title: { en: "Selective Leaf Pruning", hi: "संक्रमित निचली पत्तियों को अलग करें" },
        desc: { en: "Manually pluck and bury severely spotted bottom leaves that touch damp soil.", hi: "जमीन से सटी अत्यधिक धब्बेदार निचली पत्तियों को तोड़कर खेत से दूर दबा दें।" }
      },
      {
        title: { en: "Avoid Foliar Spray Right Now", hi: "अभी पत्तियों पर छिड़काव न करें" },
        desc: { en: "Hold any foliar nutritional or bio-fungicide sprays until post-rainfall dry canopy conditions.", hi: "बारिश से पूर्व छिड़काव करने पर दवा बह जाएगी, मौसम साफ होने की प्रतीक्षा करें।" }
      }
    ]
  },

  wheat_yellow_rust: {
    id: "wheat_yellow_rust",
    crop: "Wheat",
    cropHindi: "गेहूं",
    issueName: "Stripe / Yellow Rust (Puccinia striiformis)",
    issueNameHindi: "पीला रतुआ (येलो रस्ट)",
    confidence: 84,
    screeningDisclaimer: {
      en: "AI-assisted preliminary screening. Critical quarantine surveillance required for hill tracts.",
      hi: "एआई प्रारंभिक जांच। पहाड़ी क्षेत्रों में रतुआ रोग की त्वरित निगरानी आवश्यक है।"
    },
    sampleImageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    symptomsObserved: [
      { en: "Bright yellow/orange powdery pustules formed in parallel linear stripes along leaf veins", hi: "पत्तियों की नसों के समानांतर पीले रंग की धारियां व फफोले" },
      { en: "Yellow dust rubs off readily onto fingertips when touched", hi: "पत्ती छूने पर उंगलियों में पीला पाउडर चिपकना" }
    ],
    riskFactors: [
      { en: "Cool temperatures (10-18°C) accompanied by persistent fog/dew", hi: "10-18°C का ठंडा मौसम और घना कोहरा/ओस" }
    ],
    recommendedActions: [
      {
        title: { en: "Notify Local Agriculture Extension (KVK)", hi: "कृषि विज्ञान केंद्र को तुरंत सूचित करें" },
        desc: { en: "Rust spreads rapidly via airborne spores. Flag the affected plot immediately.", hi: "रतुआ हवा से फैलता है, प्रभावित क्षेत्र को तुरंत चिन्हित करें।" }
      }
    ]
  }
};
