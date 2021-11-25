module.exports = [
  {
    //0
    label: "Was the client referred to another service?",
    answers: ["Yes", "No"],
    selected: undefined
  },
  {
    //1
    label: "What was the referral point?",
    answers: [
      "Clinic/Day Hospital",
      "Counselling services",
      "Legal services",
      "Preventative services",
      "Rape Crisis",
      "Other",
    ],
    multiple: true
  },
  {
    //2
    label: "Why was the client referred?",
    answers: [
      "Medical Unspecified",
      "TB Screening",
      "STI Screening",
      "PMTCT Services",
      "Support Group",
      "Couples counselling",
      "Testing",
      "Family Planning Services",
      "Legal Services/Advice",
      "Rape",
      "Preventive Information",
      "Other",
    ],
    multiple: true
  },
  {
    //3
    label: "Specify any other referral points"
  },
  {
    //4
    label: "Specify any other reasons why client was referred"
  }
];