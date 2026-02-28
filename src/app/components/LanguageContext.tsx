import { createContext, useContext, useState } from "react";

export type Language = "en" | "yo";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Splash
    "splash.title": "Cervicoapp",

    // Welcome
    "welcome.to": "Welcome to",
    "welcome.brand": "Cervicoapp",
    "welcome.title1": "Cervical Cancer Screening",
    "welcome.title2": "Support Tool",
    "welcome.subtitle": "Supporting women with reliable information and screening guidance.",
    "welcome.selectLanguage": "Select Language",
    "welcome.selectLanguagePlaceholder": "Select Language",
    "welcome.getStarted": "Get Started",

    // Consent
    "consent.title": "What You Need To Know",
    "consent.intro": "This app is part of a research project",
    "consent.purposeTitle": "Purpose of the Study",
    "consent.purposeText": "This study aims to evaluate the effect of a mobile health (mHealth) application on women's knowledge, perceptions, intentions, and uptake of cervical cancer screening. The study will compare results between an intervention group (who will receive educational counselling through the app) and a control group.\n\nYour participation will help researchers understand whether this application can improve cervical cancer screening outcomes.",
    "consent.benefitsTitle": "Benefits",
    "consent.benefitsIntro": "Increased knowledge about cervical cancer screening",
    "consent.benefit1": "Improved awareness of screening importance",
    "consent.benefit2": "Access to educational counselling materials",
    "consent.benefit3": "Contribution to research that may improve future healthcare services",
    "consent.benefitsNote": "However, individual benefits cannot be guaranteed.",
    "consent.risksTitle": "Risks and Discomforts",
    "consent.risksIntro": "There are minimal risks associated with participation.",
    "consent.risksSubIntro": "Possible minor discomforts may include:",
    "consent.risk1": "Spending time completing questionnaires",
    "consent.risk2": "Reflecting on personal health information",
    "consent.risksNote": "There are no known physical risks associated with using this application.",
    "consent.confidentialityTitle": "Confidentiality",
    "consent.confidentiality1": "Your information will be kept confidential.",
    "consent.confidentiality2": "Data will be stored securely.",
    "consent.confidentiality3": "Responses will be coded and anonymized where possible.",
    "consent.confidentiality4": "Only authorized members of the research team will have access to the data.",
    "consent.confidentiality5": "Results will be reported in aggregate form (no individual identification).",
    "consent.confidentiality6": "Your identity will not be included in any published reports.",
    "consent.voluntaryTitle": "Voluntary Participation and Withdrawal",
    "consent.voluntary1": "Participation in this study is completely voluntary.",
    "consent.voluntary2": "You may choose not to participate.",
    "consent.voluntary3": "You may withdraw at any time without penalty.",
    "consent.voluntary4": "Choosing not to participate or withdrawing will not affect any services you receive.",
    "consent.voluntary5": "To withdraw, you may exit the app or contact the research team.",
    "consent.checkbox": "I have read and understood the information above.",
    "consent.continue": "Continue",

    // Auth
    "auth.register": "Register",
    "auth.login": "Log In",
    "auth.email": "Your Email",
    "auth.emailPlaceholder": "john@xyz.com",
    "auth.phone": "Your Phone Number",
    "auth.phonePlaceholder": "+234 123 4567 890",
    "auth.phoneError": "Phone number must start with +234 followed by 10 digits",
    "auth.city": "City",
    "auth.cityPlaceholder": "Enter your city",
    "auth.cityError": "Please enter your city",
    "auth.pin": "Select a 4-digit pin",
    "auth.confirmPin": "Confirm pin",
    "auth.pinMismatch": "PINs do not match",
    "auth.pinIncomplete": "Please enter a 4-digit PIN",

    // Auth API messages
    "auth.registerSuccess": "Registration successful!",
    "auth.loginSuccess": "Login successful!",
    "auth.loading": "Please wait...",
    "auth.genericError": "Something went wrong. Please try again.",

    // Home
    "home.welcome": "Welcome,",
    "home.letsStart": "Let's get started!",
    "home.progress": "Your Progress",
    "home.baseline": "Baseline Assessment",
    "home.modules": "Complete Knowledge Modules",
    "home.endline": "Endline Assessment",
    "home.continue": "Continue",
    "home.noScreening": "You have not booked a cervical cancer screening",
    "home.bookNow": "Book Now",
    "home.learnTitle": "Learn about cervical cancer",
    "home.learnMore": "Learn More",

    // Library
    "library.title": "What You Should Know About Cervical Cancer",
    "library.previous": "Previous",
    "library.next": "Next",
    "library.complete": "Complete",
    "library.watchVideos": "Watch Videos",

    // FAQs
    "library.faqTitle": "Frequently Asked Questions",
    "library.faq1.q": "What is cervical cancer?",
    "library.faq1.a": "Cervical cancer is a type of cancer that occurs in the cells of the cervix — the lower part of the uterus that connects to the vagina. It is most commonly caused by persistent infection with certain strains of the human papillomavirus (HPV).",
    "library.faq2.q": "What causes cervical cancer?",
    "library.faq2.a": "Nearly all cervical cancers are caused by the human papillomavirus (HPV), a very common sexually transmitted infection. While most HPV infections clear on their own, persistent infection with high-risk HPV types (especially HPV 16 and 18) can lead to cervical cancer over time.",
    "library.faq3.q": "Who is at risk of cervical cancer?",
    "library.faq3.a": "All women who have been sexually active are at risk. Other risk factors include early sexual activity, multiple sexual partners, smoking, a weakened immune system, long-term use of oral contraceptives, and not being screened regularly.",
    "library.faq4.q": "What are the symptoms of cervical cancer?",
    "library.faq4.a": "Early-stage cervical cancer often has no symptoms. As it progresses, symptoms may include abnormal vaginal bleeding (between periods, after intercourse, or after menopause), unusual vaginal discharge, pelvic pain, and pain during intercourse.",
    "library.faq5.q": "How can cervical cancer be prevented?",
    "library.faq5.a": "Cervical cancer can be prevented through HPV vaccination (ideally before sexual activity begins), regular cervical screening (Pap smear or HPV test), practising safe sex, and avoiding smoking.",
    "library.faq6.q": "What is a Pap smear test?",
    "library.faq6.a": "A Pap smear (or Pap test) is a screening procedure where cells are collected from the cervix and examined under a microscope for abnormalities. It can detect pre-cancerous changes early, allowing treatment before cancer develops.",
    "library.faq7.q": "How often should I get screened?",
    "library.faq7.a": "Women aged 25–65 should be screened regularly. The recommended interval depends on the test used — every 3 years for a Pap smear alone, or every 5 years for an HPV test or co-testing (Pap + HPV). Your healthcare provider can advise on the best schedule for you.",
    "library.faq8.q": "Is cervical cancer curable?",
    "library.faq8.a": "Yes, especially when detected early. Pre-cancerous changes are highly treatable, and early-stage cervical cancer has a high cure rate with surgery, radiation, or chemotherapy. This is why regular screening is so important.",

    // Library Module 1
    "library.m1.title": "Cervical Cancer",
    "library.m1.h1": "Cervical Cancer",
    "library.m1.t1": "Cervical cancer is a type of cancer that starts in the cells of the cervix, the lower part of the uterus that connects to the vagina. It is one of the most common cancers among women worldwide, particularly in low- and middle-income countries.",
    "library.m1.h2": "Cause",
    "library.m1.t2": "The primary cause is persistent infection with high-risk types of HPV, especially types 16 and 18.",
    "library.m1.h3": "Development",
    "library.m1.t3": "Cervical cancer usually develops slowly over time:\nNormal cervical cells \u2192 Precancerous changes (CIN) \u2192 Invasive cancer.",
    "library.m1.h4": "Symptoms",
    "library.m1.t4": "Common symptoms include:\n\u2022 Abnormal vaginal bleeding (e.g., after sex)\n\u2022 Unusual vaginal discharge\n\u2022 Pelvic pain or pain during intercourse",
    "library.m1.h5": "Prevention",
    "library.m1.t5": "\u2022 HPV vaccination (before sexual activity begins)\n\u2022 Regular Pap smears and HPV testing\n\u2022 Safe sex practices (e.g., condom use)",
    "library.m1.h6": "Treatment",
    "library.m1.t6": "\u2022 Surgery (e.g., hysterectomy)\n\u2022 Radiation therapy\n\u2022 Chemotherapy\n\u2022 Targeted therapy or immunotherapy",

    // Library Module 2
    "library.m2.title": "Screening Methods",
    "library.m2.h1": "What is Cervical Screening?",
    "library.m2.t1": "Cervical screening (also known as a Pap test or smear test) is a method of detecting abnormal cells on the cervix before they develop into cancer.",
    "library.m2.h2": "Types of Screening",
    "library.m2.t2": "\u2022 Pap Smear (Pap Test)\n\u2022 HPV Test\n\u2022 Visual Inspection with Acetic Acid (VIA)\n\u2022 Visual Inspection with Lugol's Iodine (VILI)",
    "library.m2.h3": "Who Should Be Screened?",
    "library.m2.t3": "Women aged 21-65 should get regular screenings. Women aged 21-29 should have a Pap test every 3 years. Women aged 30-65 can have a Pap test and HPV test every 5 years.",
    "library.m2.h4": "What to Expect",
    "library.m2.t4": "The procedure is quick and usually painless. A healthcare provider will collect cells from the cervix using a small brush or spatula. Results are usually available within 1-3 weeks.",

    // Library Module 3
    "library.m3.title": "HPV & Risk Factors",
    "library.m3.h1": "What is HPV?",
    "library.m3.t1": "Human Papillomavirus (HPV) is a very common sexually transmitted infection. There are over 200 types of HPV, and about 14 are considered high-risk for causing cervical cancer.",
    "library.m3.h2": "Risk Factors",
    "library.m3.t2": "\u2022 Early onset of sexual activity\n\u2022 Multiple sexual partners\n\u2022 Weakened immune system\n\u2022 Smoking\n\u2022 Long-term use of oral contraceptives\n\u2022 Having many children",
    "library.m3.h3": "HPV Vaccination",
    "library.m3.t3": "The HPV vaccine is highly effective at preventing infection with the HPV types that cause most cervical cancers. It is recommended for girls and boys aged 9-14 years.",

    // Screening
    "screening.title": "Get Yourself Screened",
    "screening.age": "Your Age",
    "screening.agePlaceholder": "Type your age",
    "screening.center": "Select Screening Center",
    "screening.centerPlaceholder": "Select Center",
    "screening.center1": "OAUTHC, Ile-Ife",
    "screening.center2": "UNIOSUN Teaching Hospital, Osogbo",
    "screening.center3": "State Specialist Hospital, Osogbo",
    "screening.center4": "Fountain University Health Centre",
    "screening.center5": "Iremide Medical Centre Annex",
    "screening.center6": "FOMWAN Secretariat, Ogo-Oluwa",
    "screening.date": "Date of Screening",
    "screening.datePlaceholder": "Select a date",
    "screening.reminder": "Set daily reminder",
    "screening.save": "Save Screening Date",
    "screening.saving": "Saving...",
    "screening.successTitle": "Screening date saved successfully!",
    "screening.successDesc": "You will receive reminders about your upcoming screening.",

    // Assessment
    "assessment.title": "Take the Knowledge Assessment",
    "assessment.takeBaseline": "Take Baseline Assessment",
    "assessment.takeEndline": "Take Endline Assessment",
    "assessment.baseline": "Baseline",
    "assessment.endline": "Endline",
    "assessment.assessmentLabel": "Assessment",
    "assessment.question": "Question",
    "assessment.of": "of",
    "assessment.next": "Next",
    "assessment.submit": "Submit",
    "assessment.back": "Back to Assessments",
    "assessment.complete": "Assessment Complete!",
    "assessment.scored": "You scored",
    "assessment.outOf": "out of",
    "assessment.done": "Done",
    "assessment.saving": "Saving...",

    // Assessment Questions
    "assessment.q1": "What is the main cause of cervical cancer?",
    "assessment.q1.a": "Bacteria",
    "assessment.q1.b": "HPV infection",
    "assessment.q1.c": "Fungal infection",
    "assessment.q1.d": "Genetics",
    "assessment.q2": "What age group should start cervical screening?",
    "assessment.q2.a": "Under 18",
    "assessment.q2.b": "21-65 years",
    "assessment.q2.c": "Over 70",
    "assessment.q2.d": "Only after menopause",
    "assessment.q3": "Which of the following is a screening method for cervical cancer?",
    "assessment.q3.a": "X-ray",
    "assessment.q3.b": "MRI scan",
    "assessment.q3.c": "Pap smear",
    "assessment.q3.d": "Blood test",
    "assessment.q4": "HPV vaccination is recommended for:",
    "assessment.q4.a": "Elderly women only",
    "assessment.q4.b": "Boys and girls aged 9-14",
    "assessment.q4.c": "Pregnant women",
    "assessment.q4.d": "Men over 50",
    "assessment.q5": "Cervical cancer can be prevented by:",
    "assessment.q5.a": "Regular screening and HPV vaccination",
    "assessment.q5.b": "Avoiding water",
    "assessment.q5.c": "Taking antibiotics",
    "assessment.q5.d": "None of the above",

    // Bottom Nav
    "nav.home": "Home",
    "nav.library": "Library",
    "nav.screening": "Screening",
    "nav.assessment": "Assessment",
  },

  yo: {
    // Splash
    "splash.title": "Cervicoapp",

    // Welcome
    "welcome.to": "Ẹ ku abọ si",
    "welcome.brand": "Cervicoapp",
    "welcome.title1": "Àyẹ̀wò Àrùn Jẹjẹrẹ",
    "welcome.title2": "Ọ̀nà Ìrànlọ́wọ́",
    "welcome.subtitle": "Àtìlẹ́yìn fún àwọn obìnrin pẹ̀lú ìmọ̀ tó ṣe é gbẹ́kẹ̀lé àti ìtọ́sọ́nà nípa àyẹ̀wò.",
    "welcome.selectLanguage": "Yan Èdè",
    "welcome.selectLanguagePlaceholder": "Yan Èdè",
    "welcome.getStarted": "Jẹ́ Ká Bẹ̀rẹ̀",

    // Consent
    "consent.title": "Ohun Tí O Nílò Láti Mọ̀",
    "consent.intro": "Àpù yìí jẹ́ apá kan iṣẹ́ ìwádìí",
    "consent.purposeTitle": "Ète Ìwádìí Náà",
    "consent.purposeText": "Ìwádìí yìí ní èrò láti ṣe àyẹ̀wò ipa tí àpù ìlera alágbèéká (mHealth) ní lórí ìmọ̀, ìrònú, ìpinnu, àti gbígba àyẹ̀wò àrùn jẹjẹrẹ ọrùn ilé-ọmọ láàárín àwọn obìnrin. Ìwádìí náà yóò fi àwọn àbájáde ẹgbẹ́ tí wọ́n ń gba ìtọ́ni (nípasẹ̀ àpù náà) wé ẹgbẹ́ àmúṣe.\n\nÌkópa rẹ yóò ràn àwọn olùwádìí lọ́wọ́ láti mọ̀ bóyá àpù yìí lè mú àbájáde àyẹ̀wò àrùn jẹjẹrẹ dára sí i.",
    "consent.benefitsTitle": "Àǹfààní",
    "consent.benefitsIntro": "Ìmọ̀ tó pọ̀ sí i nípa àyẹ̀wò àrùn jẹjẹrẹ",
    "consent.benefit1": "Ìmọ̀ tó dára sí i nípa pàtàkì àyẹ̀wò",
    "consent.benefit2": "Ànfààní sí àwọn ohun èlò ìtọ́ni ẹ̀kọ́",
    "consent.benefit3": "Ìkópa nínú ìwádìí tó lè mú iṣẹ́ ìlera ọjọ́ iwájú dára sí i",
    "consent.benefitsNote": "Síbẹ̀, a kò lè ṣe ìlérí àǹfààní fún ẹnìkọ̀ọ̀kan.",
    "consent.risksTitle": "Ewu àti Àìdùn",
    "consent.risksIntro": "Ewu kékeré ni ó wà pẹ̀lú ìkópa.",
    "consent.risksSubIntro": "Àìdùn kékeré tó ṣeé ṣe lè wà nínú:",
    "consent.risk1": "Àkókò tí o máa lò láti parí àwọn ìbéèrè",
    "consent.risk2": "Ìrònú lórí ìmọ̀ ìlera ara ẹni",
    "consent.risksNote": "Kò sí ewu ara tí a mọ̀ tó ní í ṣe pẹ̀lú lílo àpù yìí.",
    "consent.confidentialityTitle": "Àṣírí",
    "consent.confidentiality1": "A óò pa ìmọ̀ rẹ mọ́.",
    "consent.confidentiality2": "A óò tọ́jú dátà náà dáadáa.",
    "consent.confidentiality3": "A óò fi kóòdù sí àwọn ìdáhùn, a óò sì pa orúkọ mọ́ bí ó bá ṣeé ṣe.",
    "consent.confidentiality4": "Àwọn ọmọ ẹgb́ ìwádìí tí wọ́n ní àṣẹ nìkan ló ní ànfààní sí dátà náà.",
    "consent.confidentiality5": "A óò ṣe ìjábọ̀ àbájáde ní ọ̀nà àpapọ̀ (kò sí ìdámọ̀ ẹnìkọ̀ọ̀kan).",
    "consent.confidentiality6": "Orúkọ rẹ kò ní wà nínú àwọn ìjábọ̀ tí a tẹ̀ jáde.",
    "consent.voluntaryTitle": "Ìkópa Àtinúwá àti Ìyọkúrò",
    "consent.voluntary1": "Ìkópa nínú ìwádìí yìí jẹ́ àtinúwá pátápátá.",
    "consent.voluntary2": "O lè yan láti má kópa.",
    "consent.voluntary3": "O lè yọ ara rẹ kúrò nígbàkúgbà láìsí ìjìyà.",
    "consent.voluntary4": "Yíyan láti má kópa tàbí yíyọkúrò kò ní nípa lórí iṣẹ́ ìtọ́jú tí o ń gba.",
    "consent.voluntary5": "Láti yọ ara rẹ kúrò, o lè jáde kúrò nínú àpù náà tàbí kàn sí ẹgbẹ́ ìwádìí.",
    "consent.checkbox": "Mo ti ka, mo sì ti lóye ìmọ̀ tó wà lókè yìí.",
    "consent.continue": "Tẹ̀síwájú",

    // Auth
    "auth.register": "Forúkọsílẹ̀",
    "auth.login": "Wọlé",
    "auth.email": "Àdírẹ́sì Ímeèlì Rẹ",
    "auth.emailPlaceholder": "john@xyz.com",
    "auth.phone": "Nọ́mbà Fóònù Rẹ",
    "auth.phonePlaceholder": "+234 123 4567 890",
    "auth.phoneError": "Nọ́mbà fóònù gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú +234 tí ó sì ní díjíìtì 10 lẹ́yìn rẹ̀",
    "auth.city": "Ìlú",
    "auth.cityPlaceholder": "Tẹ orúkọ ìlú rẹ",
    "auth.cityError": "Jọ̀wọ́ tẹ orúkọ ìlú rẹ",
    "auth.pin": "Yan pínì oníka mẹ́rin",
    "auth.confirmPin": "Fi pínì múlẹ̀",
    "auth.pinMismatch": "Àwọn pínì kò bá ara wọn mu",
    "auth.pinIncomplete": "Jọ̀wọ́ tẹ pínì oníka mẹ́rin",

    // Auth API messages
    "auth.registerSuccess": "Ìforúkọsílẹ̀ ti ṣàṣeyọrí!",
    "auth.loginSuccess": "Ìwọlé ti ṣàṣeyọrí!",
    "auth.loading": "Jọ̀wọ́ dúró...",
    "auth.genericError": "Nǹkan kan ṣẹlẹ̀. Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan síi.",

    // Home
    "home.welcome": "Ẹ ku abọ,",
    "home.letsStart": "Jẹ́ ká bẹ̀rẹ̀!",
    "home.progress": "Ìlọsíwájú Rẹ",
    "home.baseline": "Ìdánwò Ìpilẹ̀ṣẹ̀",
    "home.modules": "Parí Àwọn Ẹ̀kọ́ Ìmọ̀",
    "home.endline": "Ìdánwò Ìparí",
    "home.continue": "Tẹ̀síwájú",
    "home.noScreening": "O kò tíì forúkọ sílẹ̀ fún àyẹ̀wò àrùn jẹjẹrẹ",
    "home.bookNow": "Forúkọ Sílẹ̀",
    "home.learnTitle": "Kọ́ ẹ̀kọ́ nípa àrùn jẹjẹrẹ",
    "home.learnMore": "Kọ́ Ẹ̀kọ́ Síi",

    // Library
    "library.title": "Ohun Tí O Yẹ Kí O Mọ̀ Nípa Àrùn Jẹjẹrẹ Ọrùn Ilé-ọmọ",
    "library.previous": "Sẹ́yìn",
    "library.next": "Tẹ̀lé",
    "library.complete": "Parí",
    "library.watchVideos": "Wo Fídíò",

    // FAQs
    "library.faqTitle": "Àwọn Ìbéèrè Tí A Máa Ń Béèrè",
    "library.faq1.q": "Kí ni àrùn jẹjẹrẹ ọrùn ilé-ọmọ?",
    "library.faq1.a": "Àrùn jẹjẹrẹ ọrùn ilé-ọmọ jẹ́ irú àrùn jẹjẹrẹ tó bẹ̀rẹ̀ nínú àwọn sẹ́ẹ̀lì ọrùn ilé-ọmọ, apá ìsàlẹ̀ ilé-ọmọ tó so mọ́ ojú-ara ọ̀nà ìbímọ. Ó jẹ́ ọ̀kan nínú àwọn àrùn jẹjẹrẹ tó wọ́pọ̀ jùlọ láàárín àwọn obìnrin ní àgbáyé, pàápàá jùlọ ní àwọn orílẹ̀-èdè tó ní owó-orí kékeré àti àárín.",
    "library.faq2.q": "Kí ló ń fa àrùn jẹjẹrẹ ọrùn ilé-ọmọ?",
    "library.faq2.a": "Ó fẹ́rẹ̀ẹ́ jẹ́ gbogbo àrùn jẹjẹrẹ ọrùn ilé-ọmọ ni kòkòrò HPV ló ń fa. Bí kòkòrò HPV ewu-gíga (ní pàtàkì HPV 16 àti 18) bá wà nínú ara fún ìgbà pípẹ́, ó lè yọrí sí àrùn jẹjẹrẹ.",
    "library.faq3.q": "Ta ló wà nínú ewu àrùn jẹjẹrẹ ọrùn ilé-ọmọ?",
    "library.faq3.a": "Gbogbo obìnrin tí ó ti ní ìbálòpọ̀ ni ó wà nínú ewu. Àwọn ohun mìíràn tí ó lè mú ewu pọ̀ sí ni bíbẹ̀rẹ̀ ìbálòpọ̀ ní ọjọ́ orí kékeré, ọ̀pọ̀ àwọn alábàápín ìbálòpọ̀, síga mímu, ìlera tí kò lágbára, àti àìṣe àyẹ̀wò déédéé.",
    "library.faq4.q": "Kí ni àwọn àmì àrùn jẹjẹrẹ ọrùn ilé-ọmọ?",
    "library.faq4.a": "Ní ìpele àkọ́kọ́, àrùn jẹjẹrẹ ọrùn ilé-ọmọ kò sábà ní àmì kankan. Bí ó bá ń tẹ̀síwájú, àwọn àmì lè pẹ̀lú ẹ̀jẹ̀ tí kìí ṣe dédé láti inú abẹ́, ìdà tí kò wọ́pọ̀, ìrora ẹ̀gbẹ́ ìbàdí, àti ìrora nígbà ìbálòpọ̀.",
    "library.faq5.q": "Báwo ni a ṣe lè dènà àrùn jẹjẹrẹ ọrùn ilé-ọmọ?",
    "library.faq5.a": "A lè dènà rẹ̀ nípasẹ̀ àjẹsára HPV, àyẹ̀wò ọrùn ilé-ọmọ déédéé (Pap smear tàbí ìdánwò HPV), ìbálòpọ̀ aláàbò, àti yíyẹra fún síga mímu.",
    "library.faq6.q": "Kí ni ìdánwò Pap smear?",
    "library.faq6.a": "Pap smear jẹ́ ìlànà àyẹ̀wò níbi tí a ti ń gba àwọn sẹ́ẹ̀lì láti ọrùn ilé-ọmọ, tí a sì ń ṣàyẹ̀wò wọn lábẹ́ maikróskóòpù fún ohunkóhun tí kò tọ́. Ó lè ṣàwárí àwọn àyípadà kí àrùn jẹjẹrẹ tó dé.",
    "library.faq7.q": "Báwo ni ìgbà mélòó ni mo yẹ kí n ṣe àyẹ̀wò?",
    "library.faq7.a": "Àwọn obìnrin tí ọjọ́ orí wọn wà láàárín 25 sí 65 yẹ kí wọ́n máa ṣe àyẹ̀wò déédéé. Ní gbogbo ọdún mẹ́ta fún Pap smear nìkan, tàbí ní gbogbo ọdún márùn-ún fún ìdánwò HPV. Dókítà rẹ lè fún ọ ní ìmọ̀ràn tó dára jùlọ.",
    "library.faq8.q": "Ṣé a lè wo àrùn jẹjẹrẹ ọrùn ilé-ọmọ sàn?",
    "library.faq8.a": "Bẹ́ẹ̀ ni, ní pàtàkì nígbà tí a bá rí i ní ìpele àkọ́kọ́. Àwọn àyípadà ṣáájú àrùn jẹjẹrẹ lè wòsàn dáadáa, àrùn jẹjẹrẹ ní ìpele àkọ́kọ́ sì ní ìṣeéṣe wíwòsàn gíga pẹ̀lú iṣẹ́ abẹ, ìtànṣán, tàbí oògùn. Nítorí ìdí èyí, àyẹ̀wò déédéé ṣe pàtàkì púpọ̀.",

    // Library Module 1
    "library.m1.title": "Àrùn Jẹjẹrẹ Ọrùn Ilé-ọmọ",
    "library.m1.h1": "Àrùn Jẹjẹrẹ Ọrùn Ilé-ọmọ",
    "library.m1.t1": "Àrùn jẹjẹrẹ ọrùn ilé-ọmọ jẹ́ irú àrùn jẹjẹrẹ tó bẹ̀rẹ̀ nínú àwọn sẹ́ẹ̀lì ọrùn ilé-ọmọ, apá ìsàlẹ̀ ilé-ọmọ tó so mọ́ ojú-ara ọ̀nà ìbímọ. Ó jẹ́ ọ̀kan nínú àwọn àrùn jẹjẹrẹ tó wọ́pọ̀ jùlọ láàárín àwọn obìnrin ní àgbáyé, pàápàá jùlọ ní àwọn orílẹ̀-èdè tó ní owó-orí kékeré àti àárín.",
    "library.m1.h2": "Ohun Tó Ń Fà Á",
    "library.m1.t2": "Ohun àkọ́kọ́ tó ń fà á ni àkóràn HPV tó ń bá ni lọ, pàápàá irú 16 àti 18.",
    "library.m1.h3": "Bí Ó Ṣe Ń Dàgbà",
    "library.m1.t3": "Àrùn jẹjẹrẹ ọrùn ilé-ọmọ máa ń dàgbà díẹ̀díẹ̀ pẹ̀lú àkókò:\nÀwọn sẹ́ẹ̀lì deédé \u2192 Àyípadà ṣáájú jẹjẹrẹ (CIN) \u2192 Àrùn jẹjẹrẹ tó ti tàn ká.",
    "library.m1.h4": "Àmì Àìsàn",
    "library.m1.t4": "Àwọn àmì àìsàn tó wọ́pọ̀ ni:\n\u2022 Ẹ̀jẹ̀ tó ń jáde lójú-ara ọ̀nà ìbímọ tó kìí e deédé (b.a., lẹ́yìn ìbálòpọ̀)\n\u2022 Omi tó ń jáde lójú-ara ọ̀nà ìbímọ tó yàtọ̀\n\u2022 Ìrora ẹ̀gbẹ́ ìdí tàbí ìrora nígbà ìbálòpọ̀",
    "library.m1.h5": "Ìdènà",
    "library.m1.t5": "\u2022 Abẹ́rẹ́ àjẹsára HPV (ṣáájú ìbálòpọ̀ àkọ́kọ́)\n\u2022 Àyẹ̀wò Pap àti ìdánwò HPV déédé\n\u2022 Ìbálòpọ̀ aláàbò (b.a., lílo kọ́ńdọ́mù)",
    "library.m1.h6": "Ìtọ́jú",
    "library.m1.t6": "\u2022 Iṣẹ́ abẹ (b.a., yíyọ ilé-ọmọ kúrò)\n\u2022 Ìtọ́jú ìtànṣán\n\u2022 Kẹ́mọ́tẹ́rápì\n\u2022 Ìtọ́jú àmójútó tàbí ìmúnọ́tẹ́rápì",

    // Library Module 2
    "library.m2.title": "Àwọn Ọ̀nà Àyẹ̀wò",
    "library.m2.h1": "Kíni Àyẹ̀wò Ọrùn Ilé-ọmọ?",
    "library.m2.t1": "Àyẹ̀wò ọrùn ilé-ọmọ (tí a tún mọ̀ sí ìdánwò Pap tàbí smear test) jẹ́ ọ̀nà láti rí àwọn sẹ́ẹ̀lì aláìdeédé lórí ọrùn ilé-ọmọ ṣáájú kí wọ́n tó di àrùn jẹjẹrẹ.",
    "library.m2.h2": "Irú Àyẹ̀wò",
    "library.m2.t2": "\u2022 Pap Smear (Ìdánwò Pap)\n\u2022 Ìdánwò HPV\n\u2022 Àyẹ̀wò Ìwòran pẹ̀lú Acid Acetic (VIA)\n\u2022 Àyẹ̀wò Ìwòran pẹ̀lú Iodine Lugol (VILI)",
    "library.m2.h3": "Ta Ló Yẹ Kí Ó Ṣe Àyẹ̀wò?",
    "library.m2.t3": "Àwọn obìnrin tó wà láàárín ọdún 21-65 yẹ kí wọ́n máa ṣe àyẹ̀wò déédé. Àwọn obìnrin ọdún 21-29 yẹ kí wọ́n ṣe ìdánwò Pap ní ọdún mẹ́ta mẹ́ta. Àwọn obìnrin ọdún 30-65 lè ṣe ìdánwò Pap àti HPV ní ọdún márùn-ún márùn-ún.",
    "library.m2.h4": "Ohun Tí O Lè Retí",
    "library.m2.t4": "Ìlànà náà yára, kò sì máa ń dùn ní ọ̀pọ̀ ìgbà. Olùpèsè ìtọ́jú ìlera yóò kó àwọn sẹ́ẹ̀lì láti orí ọrùn ilé-ọmọ pẹ̀lú búrọ́ọ̀ṣì kékeré tàbí spatula. Àbájáde máa ń wà ní ̀sẹ̀ kan sí mẹ́ta.",

    // Library Module 3
    "library.m3.title": "HPV & Àwọn Ohun Ewu",
    "library.m3.h1": "Kíni HPV?",
    "library.m3.t1": "Human Papillomavirus (HPV) jẹ́ àkóràn tó ń tàn nípasẹ̀ ìbálòpọ̀ tó wọ́pọ̀ gan-an. Irú HPV tó ju igba lọ ló wà, nǹkan bíi mẹ́rìnlá nínú wọn ni a kà sí ewu gíga fún àrùn jẹjẹrẹ ọrùn ilé-ọmọ.",
    "library.m3.h2": "Àwọn Ohun Ewu",
    "library.m3.t2": "\u2022 Bíbẹ̀rẹ̀ ìbálòpọ̀ ní ọjọ́ orí kékeré\n\u2022 Níní ọ̀pọ̀ alábàápín ìbálòpọ̀\n\u2022 Ètò àjẹsára tó rẹ̀wẹ̀sì\n\u2022 Sìgá mímu\n\u2022 Lílo oògùn ìdènà oyún fún ìgbà pípẹ́\n\u2022 Bíbí ọmọ púpọ̀",
    "library.m3.h3": "Abẹ́rẹ́ Àjẹsára HPV",
    "library.m3.t3": "Abẹ́rẹ́ àjẹsára HPV ṣiṣẹ́ dáadáa láti dènà àkóràn pẹ̀lú irú HPV tó ń fa ọ̀pọ̀lọpọ̀ àrùn jẹjẹrẹ ọrùn ilé-ọmọ. A ṣe ìgbanimọ̀ràn rẹ̀ fún àwọn ọmọbìnrin àti ọmọkùnrin tó wà láàárín ọdún 9-14.",

    // Screening
    "screening.title": "Ṣe Àyẹ̀wò Ara Rẹ",
    "screening.age": "Ọjọ́ Orí Rẹ",
    "screening.agePlaceholder": "Tẹ ọjọ́ orí rẹ",
    "screening.center": "Yan Ibùdó Àyẹ̀wò",
    "screening.centerPlaceholder": "Yan Ibùdó",
    "screening.center1": "OAUTHC, Ile-Ife",
    "screening.center2": "Ilé-Ìwòsàn Ẹ̀kọ́ UNIOSUN, Òṣogbo",
    "screening.center3": "Ilé-Ìwòsàn Àkànṣe Ìpínlẹ̀, Òṣogbo",
    "screening.center4": "Ibùdó Ìlera Yunifásítì Fountain",
    "screening.center5": "Iremide Medical Centre Annex",
    "screening.center6": "Ilé-Iṣẹ́ FOMWAN, Ogo-Oluwa",
    "screening.date": "Ọjọ́ Àyẹ̀wò",
    "screening.datePlaceholder": "Yan ọjọ́ kan",
    "screening.reminder": "Ṣètò ìránnilétí ojoojúmọ́",
    "screening.save": "Fi Ọjọ́ Àyẹ̀wò Pamọ́",
    "screening.saving": "Ṣe àkókò...",
    "screening.successTitle": "A ti fi ọjọ́ àyẹ̀wò pamọ́ dáadáa!",
    "screening.successDesc": "Ìránnilétí yóò máa dé ba ọ́ nípa àyẹ̀wò rẹ tó ń bọ̀.",

    // Assessment
    "assessment.title": "Ṣe Ìdánwò Ìmọ̀",
    "assessment.takeBaseline": "Ṣe Ìdánwò Ìpilẹ̀ṣẹ̀",
    "assessment.takeEndline": "Ṣe Ìdánwò Ìparí",
    "assessment.baseline": "Ìpilẹ̀ṣẹ̀",
    "assessment.endline": "Ìparí",
    "assessment.assessmentLabel": "Ìdánwò",
    "assessment.question": "Ìbéèrè",
    "assessment.of": "nínú",
    "assessment.next": "Tẹ̀lé",
    "assessment.submit": "Fi Sílẹ̀",
    "assessment.back": "Padà sí Àwọn Ìdánwò",
    "assessment.complete": "Ìdánwò Ti Parí!",
    "assessment.scored": "O gba",
    "assessment.outOf": "nínú",
    "assessment.done": "Parí",
    "assessment.saving": "Ṣe àkókò...",

    // Assessment Questions
    "assessment.q1": "Kíni ohun àkọ́kọ́ tó ń fa àrùn jẹjẹrẹ ọrùn ilé-ọmọ?",
    "assessment.q1.a": "Bakitéríà",
    "assessment.q1.b": "Àkóràn HPV",
    "assessment.q1.c": "Àkóràn fọ́ngì",
    "assessment.q1.d": "Àjogúnbá",
    "assessment.q2": "Ẹgbẹ́ ọjọ́ orí wo ló yẹ kí ó bẹ̀rẹ̀ àyẹ̀wò ọrùn ilé-ọmọ?",
    "assessment.q2.a": "Lábẹ́ ọdún 18",
    "assessment.q2.b": "Ọdún 21-65",
    "assessment.q2.c": "Ju ọdún 70 lọ",
    "assessment.q2.d": "Lẹ́yìn ìdásílẹ̀ nǹkan oṣù nìkan",
    "assessment.q3": "Èwo nínú àwọn wọ̀nyí ni ọ̀nà àyẹ̀wò fún àrùn jẹjẹrẹ ọrùn ilé-ọmọ?",
    "assessment.q3.a": "X-ray",
    "assessment.q3.b": "MRI scan",
    "assessment.q3.c": "Pap smear",
    "assessment.q3.d": "Ìdánwò ẹ̀jẹ̀",
    "assessment.q4": "A ṣe ìgbanimọ̀ràn abẹ́rẹ́ àjẹsára HPV fún:",
    "assessment.q4.a": "Àwọn obìnrin àgbàlagbà nìkan",
    "assessment.q4.b": "Ọmọkùnrin àti ọmọbìnrin ọdún 9-14",
    "assessment.q4.c": "Àwọn abọ́yún",
    "assessment.q4.d": "Àwọn ọkùnrin tó ju 50 lọ",
    "assessment.q5": "A lè dènà àrùn jẹjẹrẹ ọrùn ilé-ọmọ nípasẹ̀:",
    "assessment.q5.a": "Àyẹ̀wò déédé àti abẹ́rẹ́ àjẹsára HPV",
    "assessment.q5.b": "Yíyẹra fún omi",
    "assessment.q5.c": "Mímu oògùn àkóràn",
    "assessment.q5.d": "Kò sí nǹkan tó wà lókè yìí",

    // Bottom Nav
    "nav.home": "Ilé",
    "nav.library": "Ibi Ìwé",
    "nav.screening": "Àyẹ̀wò",
    "nav.assessment": "Ìdánwò",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}