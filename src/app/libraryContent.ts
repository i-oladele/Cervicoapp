// Learning library slides. Each slide is short so it fits one screen and can be
// read aloud with the Listen button. English and Yoruba must stay in step:
// scripts/check-review.mjs fails the build check if either is missing.

type Bilingual = { en: string; yo: string };

export type LibraryIcon =
  | "info" | "trend" | "virus" | "risk" | "myth" | "symptoms" | "prevent"
  | "who" | "via" | "lab" | "prepare" | "results" | "barriers" | "motivate"
  | "place" | "book";

export interface LibrarySlide {
  id: string;
  unit: Bilingual;
  heading: Bilingual;
  body: Bilingual;
  icon: LibraryIcon;
  image?: "anatomy";
  action?: "facilities" | "book";
}

// Nigeria's 2025 national guideline (NICRAT). Also used for FAQ 7.
export const screeningAgeText: Bilingual = {
  en: "Nigeria’s 2025 guideline identifies women aged 30–49 as the primary screening group, starting at 30; screening starts at 25 for women living with HIV. This study recruits women aged 30–49. Your clinician will advise on the test and repeat interval. Seek care for unusual bleeding or other symptoms at any age.",
  yo: "Àyẹ̀wò déédé bẹ̀rẹ̀ ní ọjọ́ orí 30, tàbí 25 fún àwọn obìnrin tó ń gbé pẹ̀lú HIV (Ìtọ́sọ́nà Nàìjíríà 2025). Ìwádìí yìí gba àwọn obìnrin ọdún 30–49. Òṣìṣẹ́ ìlera yóò sọ irú àyẹ̀wò àti ìgbà tí o yẹ kí o tún ṣe é. Wá ìtọ́jú fún ẹ̀jẹ̀ tí kò déédé ní ọjọ́ orí èyíkéyìí.",
};

const intro = { en: "Introduction", yo: "Ìfihàn" };
const causes = { en: "Causes and risk factors", yo: "Ohun tó ń fà á àti àwọn ewu" };
const signs = { en: "Signs and symptoms", yo: "Àwọn àmì àìsàn" };
const prevention = { en: "Prevention", yo: "Ìdènà" };
const screening = { en: "Screening methods", yo: "Àwọn ọ̀nà àyẹ̀wò" };
const visit = { en: "Your screening visit", yo: "Ìbẹ̀wò àyẹ̀wò rẹ" };
const barriers = { en: "Overcoming barriers", yo: "Bíborí àwọn ìdènà" };
const action = { en: "Take action", yo: "Gbé ìgbésẹ̀" };

export const librarySlides: LibrarySlide[] = [
  {
    id: "what-is",
    unit: intro,
    icon: "info",
    image: "anatomy",
    heading: { en: "What is cervical cancer?", yo: "Kí ni jẹjẹrẹ ọrùn ilé-ọmọ?" },
    body: {
      en: "The cervix is the lower, narrow part of the womb (uterus). It connects the womb to the vagina and plays a part in menstruation, pregnancy and childbirth.\n\nCervical cancer happens when cells in the cervix change and grow out of control. These changes usually happen slowly, over many years.",
      yo: "Ọrùn ilé-ọmọ ni apá ìsàlẹ̀ ilé-ọmọ tó tínrín. Ó so ilé-ọmọ mọ́ ojú-ara, ó sì ní ipa nínú nǹkan oṣù, oyún àti ìbímọ.\n\nJẹjẹrẹ ọrùn ilé-ọmọ máa ń wáyé nígbà tí àwọn sẹ́ẹ̀lì ọrùn ilé-ọmọ bá yí padà tí wọ́n sì ń dàgbà láìní ìdarí. Àwọn àyípadà yìí sábà máa ń ṣẹlẹ̀ díẹ̀díẹ̀, fún ọ̀pọ̀ ọdún.",
    },
  },
  {
    id: "nigeria",
    unit: intro,
    icon: "trend",
    heading: { en: "Why it matters in Nigeria", yo: "Ìdí tí ó fi ṣe pàtàkì ní Nàìjíríà" },
    body: {
      en: "Cervical cancer is the second most common cancer among women in Nigeria, after breast cancer. About 13,700 Nigerian women were diagnosed with it in 2022.¹\n\n• Many women are diagnosed late, when treatment is harder.\n• Many women have never been screened.\n• Screening finds changes early, when they can be treated.\n\n¹ IARC GLOBOCAN 2022, Nigeria fact sheet.",
      yo: "Jẹjẹrẹ ọrùn ilé-ọmọ ni jẹjẹrẹ kejì tó wọ́pọ̀ jù lọ láàárín àwọn obìnrin ní Nàìjíríà, lẹ́yìn jẹjẹrẹ ọmú. Ó tó nǹkan bí 13,700 obìnrin ní Nàìjíríà tí a rí i lára wọn ní ọdún 2022.¹\n\n• Ọ̀pọ̀ obìnrin ni a máa ń rí i lára wọn ní pẹ́, nígbà tí ìtọ́jú ti le.\n• Ọ̀pọ̀ obìnrin kò tíì ṣe àyẹ̀wò rí.\n• Àyẹ̀wò máa ń tètè rí àwọn àyípadà nígbà tí a ṣì lè tọ́jú wọn.\n\n¹ IARC GLOBOCAN 2022, ìwé àlàyé Nàìjíríà.",
    },
  },
  {
    id: "cause",
    unit: causes,
    icon: "virus",
    heading: { en: "What causes it?", yo: "Kí ló ń fà á?" },
    body: {
      en: "Cervical cancer is mainly caused by a long-lasting infection with human papillomavirus (HPV).\n\nHPV is a common virus spread through sexual contact. The body clears most HPV infections on its own. When an infection stays for many years, it can slowly change cervical cells into cancer.",
      yo: "Ohun pàtàkì tó ń fa jẹjẹrẹ ọrùn ilé-ọmọ ni àkóràn kòkòrò HPV (human papillomavirus) tó pẹ́ nínú ara.\n\nHPV jẹ́ kòkòrò tó wọ́pọ̀ tí a ń kó nípasẹ̀ ìbálòpọ̀. Ara máa ń lé ọ̀pọ̀ àkóràn HPV jáde fúnra rẹ̀. Bí àkóràn bá wà nínú ara fún ọ̀pọ̀ ọdún, ó lè sọ àwọn sẹ́ẹ̀lì ọrùn ilé-ọmọ di jẹjẹrẹ díẹ̀díẹ̀.",
    },
  },
  {
    id: "risk",
    unit: causes,
    icon: "risk",
    heading: { en: "Who is at higher risk?", yo: "Ta ló wà nínú ewu jù?" },
    body: {
      en: "Any woman who has ever had sex can get cervical cancer. The risk is higher with:\n• Starting sex at a young age\n• Many sexual partners (yours or your partner’s)\n• Smoking\n• HIV or a weakened immune system\n• Taking the contraceptive pill for many years (this is not a reason to stop family planning; talk to a health worker)\n• Never having been screened",
      yo: "Obìnrin èyíkéyìí tó ti ní ìbálòpọ̀ rí lè ní jẹjẹrẹ ọrùn ilé-ọmọ. Ewu náà pọ̀ jù fún:\n• Bíbẹ̀rẹ̀ ìbálòpọ̀ ní kékeré\n• Níní ọ̀pọ̀ alábàálòpọ̀ (ìwọ tàbí ọkọ rẹ)\n• Sìgá mímu\n• HIV tàbí agbára ìdáàbòbò ara tó rẹ̀wẹ̀sì\n• Lílo oògùn ìdènà oyún fún ọ̀pọ̀ ọdún (èyí kì í ṣe ìdí láti dá ìfètò-sọ́mọbíbí dúró; bá òṣìṣẹ́ ìlera sọ̀rọ̀)\n• Àìṣe àyẹ̀wò rí",
    },
  },
  {
    id: "myths",
    unit: causes,
    icon: "myth",
    heading: { en: "Myth or fact?", yo: "Àròsọ tàbí òtítọ́?" },
    body: {
      en: "Myth: Cervical cancer is caused by witchcraft or a spiritual attack.\nFact: It is mainly caused by a long-lasting HPV infection.\n\nMyth: Only women with many partners get cervical cancer.\nFact: Any woman who has ever had sex can be at risk.\n\nMyth: If I feel fine, I cannot have cervical cancer.\nFact: Early cervical cancer usually has no symptoms.",
      yo: "Àròsọ: Àjẹ́ tàbí ìkọlù ẹ̀mí ló ń fa jẹjẹrẹ ọrùn ilé-ọmọ.\nÒtítọ́: Àkóràn HPV tó pẹ́ nínú ara ló sábà máa ń fà á.\n\nÀròsọ: Àwọn obìnrin tó ní ọ̀pọ̀ alábàálòpọ̀ nìkan ló ń ní jẹjẹrẹ ọrùn ilé-ọmọ.\nÒtítọ́: Obìnrin èyíkéyìí tó ti ní ìbálòpọ̀ rí lè wà nínú ewu.\n\nÀròsọ: Bí ara mi bá yá, mi ò lè ní jẹjẹrẹ ọrùn ilé-ọmọ.\nÒtítọ́: Jẹjẹrẹ ọrùn ilé-ọmọ kì í sábà ní àmì ní ìbẹ̀rẹ̀.",
    },
  },
  {
    id: "symptoms",
    unit: signs,
    icon: "symptoms",
    heading: { en: "Signs to look out for", yo: "Àwọn àmì tí o yẹ kí o ṣọ́" },
    body: {
      en: "Early cervical cancer usually has no symptoms. That is why screening matters.\n\nLater signs can include:\n• Bleeding between periods, after sex or after menopause\n• Foul-smelling vaginal discharge\n• Pain in the lower belly (pelvis)\n\nDo not wait for symptoms to get screened. If you notice any of these signs, see a health worker, whatever your age.",
      yo: "Jẹjẹrẹ ọrùn ilé-ọmọ kì í sábà ní àmì ní ìbẹ̀rẹ̀. Ìdí nìyẹn tí àyẹ̀wò fi ṣe pàtàkì.\n\nÀwọn àmì tó lè hàn lẹ́yìn náà:\n• Ẹ̀jẹ̀ láàárín nǹkan oṣù, lẹ́yìn ìbálòpọ̀, tàbí lẹ́yìn tí nǹkan oṣù ti dúró\n• Omi olóòórùn burúkú tó ń jáde láti ojú-ara\n• Ìrora ní ìsàlẹ̀ ikùn\n\nMá ṣe dúró de àmì kí o tó ṣe àyẹ̀wò. Bí o bá rí èyíkéyìí nínú àwọn àmì yìí, lọ rí òṣìṣẹ́ ìlera, ọjọ́ orí yòówù kí o jẹ́.",
    },
  },
  {
    id: "prevention",
    unit: prevention,
    icon: "prevent",
    heading: { en: "How to prevent it", yo: "Bí a ṣe lè dènà rẹ̀" },
    body: {
      en: "Most cervical cancer can be prevented.\n• HPV vaccine: protects against the HPV types that cause most cervical cancers. It works best before sex begins; Nigeria offers it to girls aged 9–14.\n• Regular screening: finds early changes that can be treated before they become cancer.\n• Condoms: lower the risk of HPV but do not remove it.\n• Not smoking.",
      yo: "A lè dènà ọ̀pọ̀lọpọ̀ jẹjẹrẹ ọrùn ilé-ọmọ.\n• Abẹ́rẹ́ àjẹsára HPV: ó ń dáàbò bo ni lọ́wọ́ irú HPV tó ń fa ọ̀pọ̀ jẹjẹrẹ ọrùn ilé-ọmọ. Ó ṣiṣẹ́ jù lọ kí ìbálòpọ̀ tó bẹ̀rẹ̀; Nàìjíríà ń fún àwọn ọmọbìnrin ọdún 9–14.\n• Àyẹ̀wò déédé: ó ń rí àwọn àyípadà ìbẹ̀rẹ̀ tí a lè tọ́jú kí wọ́n tó di jẹjẹrẹ.\n• Kọ́ńdọ̀mù: ó ń dín ewu HPV kù, ṣùgbọ́n kò mú un kúrò pátápátá.\n• Yíyẹra fún sìgá mímu.",
    },
  },
  {
    id: "who-when",
    unit: screening,
    icon: "who",
    heading: { en: "Who should be screened?", yo: "Ta ló yẹ kí ó ṣe àyẹ̀wò?" },
    body: screeningAgeText,
  },
  {
    id: "via-vili",
    unit: screening,
    icon: "via",
    heading: { en: "VIA and VILI", yo: "VIA àti VILI" },
    body: {
      en: "VIA and VILI are quick screening tests used at the study hospitals.\n• A trained nurse or doctor gently opens the vagina with a speculum to see the cervix.\n• They apply dilute vinegar (acetic acid) for VIA, or Lugol’s iodine for VILI.\n• After a minute or two, they look for areas that look different, which may be early changes.\n\nYou usually get the result at the same visit.",
      yo: "VIA àti VILI jẹ́ àyẹ̀wò kíákíá tí a ń ṣe ní àwọn ilé ìwòsàn ìwádìí.\n• Nọ́ọ̀sì tàbí dókítà tó ti kọ́ṣẹ́ yóò fi irinṣẹ́ (speculum) ṣí ojú-ara díẹ̀ láti rí ọrùn ilé-ọmọ.\n• Wọn yóò fi ọtí kíkan (acetic acid) sí i fún VIA, tàbí Lugol’s iodine fún VILI.\n• Lẹ́yìn ìṣẹ́jú kan tàbí méjì, wọn yóò wo àwọn ibi tó yàtọ̀, èyí tó lè jẹ́ àyípadà ìbẹ̀rẹ̀.\n\nO sábà máa ń mọ àbájáde rẹ ní ọjọ́ kan náà.",
    },
  },
  {
    id: "hpv-pap",
    unit: screening,
    icon: "lab",
    heading: { en: "HPV test and Pap smear", yo: "Ìdánwò HPV àti Pap smear" },
    body: {
      en: "• HPV test: a sample from the cervix is checked in a laboratory for the high-risk types of HPV.\n• Pap smear: cells are gently collected from the cervix with a small brush and checked under a microscope.\n\nHow often you repeat screening depends on the test and your result. Your health worker will advise you.",
      yo: "• Ìdánwò HPV: a máa ń gba àpẹẹrẹ láti ọrùn ilé-ọmọ, a sì ń yẹ̀ ẹ́ wò ní ilé ìwádìí fún irú HPV tó léwu.\n• Pap smear: a máa ń fi búrọ́ọ̀ṣì kékeré gba sẹ́ẹ̀lì láti ọrùn ilé-ọmọ, a sì ń wò wọ́n lábẹ́ maikirosikóòpù.\n\nÌgbà tí o tún máa ṣe àyẹ̀wò dá lórí irú ìdánwò àti àbájáde rẹ. Òṣìṣẹ́ ìlera rẹ yóò gbà ọ́ nímọ̀ràn.",
    },
  },
  {
    id: "prepare",
    unit: visit,
    icon: "prepare",
    heading: { en: "Preparing for screening", yo: "Ìmúrasílẹ̀ fún àyẹ̀wò" },
    body: {
      en: "• Screening takes only a few minutes. It may feel a little uncomfortable but is not usually painful.\n• Ask the clinic how to prepare for your test.\n• Tell the staff if you are pregnant or bleeding.\n• You can ask for privacy, a female health worker, an explanation, or a pause at any time.",
      yo: "• Àyẹ̀wò máa ń gba ìṣẹ́jú díẹ̀ péré. Ó lè ni ọ́ lára díẹ̀, ṣùgbọ́n kì í sábà dun ni.\n• Béèrè lọ́wọ́ ilé ìwòsàn bí o ṣe yẹ kí o múra sílẹ̀ fún ìdánwò rẹ.\n• Sọ fún àwọn òṣìṣẹ́ bí o bá lóyún tàbí tí o ń ṣẹ̀jẹ̀.\n• O lè béèrè fún àṣírí, òṣìṣẹ́ ìlera obìnrin, àlàyé, tàbí kí wọ́n dúró díẹ̀ nígbàkúgbà.",
    },
  },
  {
    id: "after",
    unit: visit,
    icon: "results",
    heading: { en: "After screening", yo: "Lẹ́yìn àyẹ̀wò" },
    body: {
      en: "• A normal result means no changes were found. Your health worker will tell you when to screen again.\n• An abnormal result does not mean you have cancer. It usually means early changes that can be treated, sometimes at the same visit.\n• Ask when your results will be ready, and go to any follow-up visit you are given.",
      yo: "• Àbájáde tó dára túmọ̀ sí pé a kò rí àyípadà kankan. Òṣìṣẹ́ ìlera rẹ yóò sọ ìgbà tí o tún máa ṣe àyẹ̀wò.\n• Àbájáde tí kò dára kò túmọ̀ sí pé o ní jẹjẹrẹ. Ó sábà máa ń jẹ́ àyípadà ìbẹ̀rẹ̀ tí a lè tọ́jú, nígbà mìíràn ní ọjọ́ kan náà.\n• Béèrè ìgbà tí àbájáde rẹ yóò jáde, kí o sì lọ sí ìpàdé àtẹ̀lé èyíkéyìí tí wọ́n bá fún ọ.",
    },
  },
  {
    id: "barriers",
    unit: barriers,
    icon: "barriers",
    heading: { en: "Common worries", yo: "Àwọn ohun tó máa ń dààmú àwọn obìnrin" },
    body: {
      en: "• Fear of pain: screening may feel a little uncomfortable, but it is not usually painful.\n• Embarrassment: health workers are trained professionals and keep your visit private.\n• Cost: some facilities offer free or low-cost screening. Ask your research assistant.\n• Cultural beliefs: cervical cancer is a medical condition, not a spiritual one.\n• Time: the test itself takes only a few minutes.",
      yo: "• Ẹ̀rù ìrora: àyẹ̀wò lè ni ọ́ lára díẹ̀, ṣùgbọ́n kì í sábà dun ni.\n• Ìtìjú: àwọn òṣìṣẹ́ ìlera ti kọ́ṣẹ́, wọ́n sì ń pa ìbẹ̀wò rẹ mọ́ ní àṣírí.\n• Owó: àwọn ilé ìwòsàn kan ń ṣe àyẹ̀wò lọ́fẹ̀ẹ́ tàbí ní owó díẹ̀. Béèrè lọ́wọ́ olùrànlọ́wọ́ ìwádìí rẹ.\n• Ìgbàgbọ́ àṣà: jẹjẹrẹ ọrùn ilé-ọmọ jẹ́ àìsàn ara, kì í ṣe ti ẹ̀mí.\n• Àkókò: ìdánwò fúnra rẹ̀ máa ń gba ìṣẹ́jú díẹ̀ péré.",
    },
  },
  {
    id: "motivation",
    unit: barriers,
    icon: "motivate",
    heading: { en: "Be motivated", yo: "Ní ìwúrí" },
    body: {
      en: "• Your health matters to you and your family.\n• Finding changes early saves lives.\n• Screening today can prevent cancer tomorrow.\n• Do not wait for symptoms.",
      yo: "• Ìlera rẹ ṣe pàtàkì fún ìwọ àti ìdílé rẹ.\n• Rírí àyípadà ní kùtùkùtù ń gba ẹ̀mí là.\n• Àyẹ̀wò lónìí lè dènà jẹjẹrẹ lọ́la.\n• Má ṣe dúró de àmì àìsàn.",
    },
  },
  {
    id: "where",
    unit: action,
    icon: "place",
    action: "facilities",
    heading: { en: "Where to get screened", yo: "Ibi tí o ti lè ṣe àyẹ̀wò" },
    body: {
      en: "Screening is available at the two study hospitals:",
      yo: "A ń ṣe àyẹ̀wò ní ilé ìwòsàn ìwádìí méjèèjì:",
    },
  },
  {
    id: "call-to-action",
    unit: action,
    icon: "book",
    action: "book",
    heading: { en: "Pick a screening date today", yo: "Yan ọjọ́ àyẹ̀wò lónìí" },
    body: {
      en: "Now you know:\n• Cervical cancer can be prevented.\n• It develops slowly.\n• It often has no early symptoms.\n• Regular screening and vaccination save lives.\n\nTake action today. Tap the button below to choose a screening date.",
      yo: "Ní báyìí o ti mọ̀ pé:\n• A lè dènà jẹjẹrẹ ọrùn ilé-ọmọ.\n• Ó máa ń dàgbà díẹ̀díẹ̀.\n• Kì í sábà ní àmì ní ìbẹ̀rẹ̀.\n• Àyẹ̀wò déédé àti àjẹsára ń gba ẹ̀mí là.\n\nGbé ìgbésẹ̀ lónìí. Tẹ bọ́tìnnì ìsàlẹ̀ yìí láti yan ọjọ́ àyẹ̀wò.",
    },
  },
];
