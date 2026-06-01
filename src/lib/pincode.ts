export const VALID_PINCODES = [
  // Durgapur & Asansol (Paschim Bardhaman)
  "713201", "713202", "713203", "713204", "713205", "713206", "713207", "713208", "713209", "713210",
  "713211", "713212", "713213", "713214", "713215", "713216", "713301", "713302", "713303", "713304",
  "713305", "713324", "713325", "713331", "713362",
  // Purba Bardhaman
  "713101", "713102", "713103", "713104", "713401", "713422", "713428",
  // Kolkata (Sample range)
  "700001", "700002", "700003", "700004", "700005", "700006", "700007", "700008", "700009", "700010",
  "700011", "700012", "700013", "700014", "700015", "700016", "700017", "700018", "700019", "700020",
  "700025", "700026", "700027", "700028", "700029", "700030", "700031", "700032", "700033", "700034",
  // Howrah (Sample)
  "711101", "711102", "711103", "711104", "711105", "711106", "711107", "711108", "711109",
  // Hooghly (Sample)
  "712101", "712102", "712103", "712201", "712232", "712258", "712401", "712409",
  // Siliguri / Darjeeling (Sample)
  "734001", "734002", "734003", "734004", "734005", "734011", "734013",
  // Malda (Sample)
  "732101", "732102", "732103", "732142",
  // Murshidabad (Sample)
  "742101", "742102", "742103", "742149",
  // Nadia (Sample)
  "741101", "741102", "741103", "741201"
];

export function isValidWestBengalPin(pin: string): boolean {
  if (!pin || pin.length !== 6) return false;
  // Accept any pin starting with 7 (broad rule for WB) or specific check against VALID_PINCODES list
  // For this strict luxury requirement, we'll check against our known good list.
  return VALID_PINCODES.includes(pin);
}
