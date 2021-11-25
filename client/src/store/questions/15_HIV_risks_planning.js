module.exports = [
  {
    //0
    label:
      "How many risks does the client have?",
    answers: ['0', '1', '2', '3'],
    question: 48,
  },
  {
    //1
    label: "What is the client's plan for maintaining their risk low?",
    question: 49,
  },
  {
    //2
    label: "RISK ",
    answers: [
      "Unprotected sex",
      "Multiple partners",
      "Doesn’t know partners’ status",
      "Doesn’t test regularly",
      "Drug use",
      "Alcohol",
      "Other (specify in action plan)",
    ],
    multiple: false,
    question: 50,
  },
  {
    //3
    label: "Stage for Risk 1",

    answers: [
      "1 - Precontemplation",
      "2 - Contemplation",
      "3 - Preparation",
      "4 - Action",
      "5 - Maintenance",
    ],
    multiple: false,
    question: 51,
  },
  {
    //4
    label: "Action plan 1",
    type: "input-text",
    question: 52,
  },
  {
    //5
    label: `PLAN FOR CLIENTS TESTING HIV POSITIVE :
      Which step/s the client agrees to follow?`,
    placeholder: "Which step/s the client agrees to follow?",
    answers: [
      "Step 1: Dealing with fears and feelings",
      "Step 2: Go to clinic for tests",
      "Step 3: Disclosure and support",
      "Step 4: Risk reduction",
    ],
    selected: [],
    multiple: true,
    question: 53,
  },
  {
    //6
    label: "State client action plans for each step",
    answers: [
      { text: "", label: "Step 1 action plan" },
      { text: "", label: "Step 2 action plan" },
      { text: "", label: "Step 3 action plan" },
      { text: "", label: "Step 4 action plan" },
    ],
    question: 54,
  },
  {
    //7
    label: "RISK ",
    answers: [
      "Unprotected sex",
      "Multiple partners",
      "Doesn’t know partners’ status",
      "Doesn’t test regularly",
      "Drug use",
      "Alcohol",
      "Other (specify in action plan)",
    ],
    multiple: false,
    question: 55,
  },
  {
    //8
    label: "RISK ",
    answers: [
      "Unprotected sex",
      "Multiple partners",
      "Doesn’t know partners’ status",
      "Doesn’t test regularly",
      "Drug use",
      "Alcohol",
      "Other (specify in action plan)",
    ],
    multiple: false,
    question: 56,
  },
  {
    //9
    label: "Stage for Risk 2",
    answers: [
      "1 - Precontemplation",
      "2 - Contemplation",
      "3 - Preparation",
      "4 - Action",
      "5 - Maintenance",
    ],
    multiple: false,
    question: 57,
  },
  {
    //10
    label: "Action plan 2",
    question: 58,
  },

  //risk reduction plan 3
  {
    //11
    label: "Stage for Risk 3",
    answers: [
      "1 - Precontemplation",
      "2 - Contemplation",
      "3 - Preparation",
      "4 - Action",
      "5 - Maintenance",
    ],
    multiple: false,
    question: 59,
  },
  {
    //12
    label: "Action plan 3",
    question: 60,
  },
]