module.exports = [
  {
    //0
    label: "Is client currently on TB medication?",
    answers: ["Yes", "No"],
    selected: undefined
  },
  {
    //1
    label: "Has client experienced any of the following symptoms",
    answers: [
     "Cough for more than 2 weeks",
     "Weight loss more than 1.5 kg in a month",
     "Fever more than 2  weeks",
     "Abnormal night sweats",
     "TB contact in house",
     "Blood in sputum",
    ],
    multiple: true
  },
  {
    //2
    label: "What is the final TB screening result?",
    answers: ["Results show screening is negative.", "Results show screening is positive."],
    selected: undefined
  },
  { 
    //3
    label: "Does the client have any symptoms?",
    answers: ["Yes", "No"],
    selected: undefined
  }
]