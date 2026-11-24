// Study details shown to participants. Fill these in from the researcher before
// study use. Empty values are hidden in the app (nothing is shown as a placeholder).

type Bilingual = { en: string; yo: string };

export const studyInfo = {
  researcherName: "Oyedero Lolade Comfort",
  institution: "University of Ibadan",
  // Shown on the consent screen as the contact for questions and withdrawal.
  researcherPhone: "",
  researcherEmail: "",
  // e.g. committee: "Osun State Ministry of Health Research Ethics Committee"
  ethicsCommittee: "",
  ethicsApprovalNumber: "",
};

// Screening sites for the intervention group. `details` holds the verified
// clinic days, opening hours and cost in each language, for example
// { en: "Tuesdays and Thursdays, 8am–2pm. Free during the study.", yo: "..." }.
// While it is empty the app asks the participant to check with the research assistant.
export const screeningFacilities: { id: string; name: string; details: Bilingual }[] = [
  { id: "asubiaro", name: "State Specialist Hospital, Asubiaro, Osogbo", details: { en: "", yo: "" } },
  { id: "oke-ogbo", name: "State Hospital, Oke-Ogbo, Ile-Ife", details: { en: "", yo: "" } },
];

export const facilityName = (id: string) => screeningFacilities.find((f) => f.id === id)?.name || id;
