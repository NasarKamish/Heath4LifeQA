module.exports = [
  {
    //0
    label: "Has the client ever had sex (vaginal, anal or oral)?",
    answers: ["Yes", "No"],
    selected: undefined
  },
  {
    //1
    label: "When did the client last have sex (vaginal, anal or oral)?",
    answers: [
      "In the last 6 weeks",
      "6 weeks to 3 months ago",
      "3 to 6 months ago",
      "6 to 12 months ago",
      "More than 12 months ago",
    ],
    multiple: false
  },
  {
    //2
    label: "What kind of sex has the client had in the last 6 months?",
    answers: ["Vaginal", "Anal", "Oral"],
    multiple: true
  },
  {
    //3
    label:
      "When did the client last have unprotected sex (vaginal, anal or oral)?",
    answers: [
      "In the last 6 weeks",
      "6 weeks to 3 months ago",
      "3 to 6 months ago",
      "6 to 12 months ago",
      "More than 12 months ago",
      "Never had unprotected sex",
    ],
    multiple: false
  },
  {
    //4
    label: "Has the client ever had blood contact?",
    answers: [
      "Yes – in the last 6 weeks",
      "Yes – more than 6 weeks ago",
      "No",
    ]
  },
  {
    //5
    label:
      "When is the end of the window period (give specific date if possible)?"
  },
  {
    //6
    label: "Has the client experienced any of the following symptoms",
    answers: [
      "Discharge (“drop”) from vagina/penis",
      "Sores on vagina/penis",
      "Discharge (“drop”) or blood from anus",
      "Sores on anus",
      "Burning on passing urine",
      "Women only: lower abdominal pain"
    ],
    multiple: true
  },
  {
    //7
    label: "What is the final STI screening result (tick)?",
    answers: ["Negative." , "Positive."],
    selected: undefined
  },
  { //8
    label: "Does the client have any symptoms?",
    answers: ["Yes", "No"],
    selected: undefined
  }
]