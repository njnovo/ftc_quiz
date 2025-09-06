export interface QuizQuestion {
  question: string;
  answer: string[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    "question": "What is the mission of FIRST?",
    "answer": [
      "The mission of FIRST is to provide life-changing robotics programs that give young people the skills, confidence, and resilience to build a better world [1].",
      "To transform our culture by creating a world where science and technology are celebrated and where young people dream of becoming science and technology leaders [1].",
      "FIRST exists to prepare the young people of today for the world of tomorrow [1].",
      "For 30 years, FIRST has combined the rigor of STEM learning with the fun and excitement of traditional sports and the inspiration that comes from community [2]."
    ]
  },
  {
    "question": "What does Gracious Professionalism®, a core credo of FIRST, primarily encourage participants to do?",
    "answer": [
      "To learn to be strong competitors while treating one another with respect and kindness, and avoiding anyone feeling excluded or unappreciated [3, 4].",
      "To achieve a defined goal of ethical behavior that can be measured during competition [5].",
      "To always win their matches, as gracious attitudes are win-win [3].",
      "To use their specialized knowledge to gain an advantage over other teams [3]."
    ]
  },
  {
    "question": "How are key words with specific meanings indicated in the Competition Manual?",
    "answer": [
      "Key words are defined in Section 16 Glossary and indicated in **ALL CAPS** throughout the document [6].",
      "All rule headlines are presented in *bold green text with a leading asterisk [7].",
      "Warnings, cautions, and notes appear in red boxes.",
      "Metric dimensions are the primary measurements, with imperial conversions for reference [8]."
    ]
  },
  {
    "question": "Which of the following is a 'competition ready' requirement for North American teams to compete in official FIRST Tech Challenge events?",
    "answer": [
      "Two adults must be assigned in the Lead Coach 1/Lead Coach 2 roles and have passed Youth Protection Program (YPP) screening [9].",
      "Teams must submit a printed team PORTFOLIO during check-in [10].",
      "The ROBOT must pass an initial inspection before the team can complete its annual registration [9, 11].",
      "All team members, including adults, must be registered on the FIRST dashboard [9, 12]."
    ]
  },
  {
    "question": "Who has the final authority on the legality of any component, mechanism, or ROBOT during a competition?",
    "answer": [
      "The **Lead ROBOT INSPECTOR (LRI)** [13].",
      "The Head REFEREE [13, 14].",
      "The Event Director [15].",
      "The team's Lead Coach 1."
    ]
  },
  {
    "question": "What are the two broad categories for most Team Judged Awards in the FIRST Tech Challenge, in addition to the Think, Judges' Choice, and Inspire Awards?",
    "answer": [
      "**Machine, Creativity, and Innovation (MCI)**, and **Team Attributes (TA)** [16].",
      "Design, Control, and Innovate Awards [17].",
      "Engineering Notebook and Outreach Awards [18].",
      "Qualification Round Performance and Playoff Performance [19]."
    ]
  },
  {
    "question": "What are the specific page limits and content requirements for a team's PORTFOLIO submission for judging?",
    "answer": [
      "It must consist of one cover page and no more than 15 pages of judged content (equivalent to 8 sheets of paper if printing front and back, including the cover page) [20, 21].",
      "It must consist of exactly 15 pages, excluding the cover page and table of contents [20, 21].",
      "The PORTFOLIO must use only US Letter (8.5\" x 11\") size paper [21].",
      "It must only include progress, challenges, and accomplishments from the current event [21]."
    ]
  },
  {
    "question": "What are the starting configuration size and support requirements for a ROBOT?",
    "answer": [
      "In the **STARTING CONFIGURATION**, the ROBOT must be fully self-contained within an **18-inch wide, by 18-inch long, by 18-inch-high volume** [22].",
      "The ROBOT must fit within a 24-inch cube to allow for minor protrusions [22].",
      "ROBOTS may use external supports or exert force on the sizing tool to maintain their STARTING CONFIGURATION [23].",
      "Preloaded SCORING ELEMENTS must also be contained within the 18-inch starting volume [22]."
    ]
  },
  {
    "question": "What types of traction devices are prohibited from contacting the TILE floor directly, and why?",
    "answer": [
      "Traction devices that have surface features known to damage the TILE floor, such as high traction wheels or high grip tread, are prohibited from direct contact with the floor because they cause damage [24].",
      "Only traction devices made of metal are prohibited from contacting the TILE floor directly [24].",
      "All traction devices are prohibited from direct contact with the TILE floor; they must be lifted [24].",
      "Traction devices are prohibited from contacting the TILE floor to prevent excessive grip that makes the ROBOT too difficult to move [24]."
    ]
  },
  {
    "question": "What are the maximum limits on the total number of motors and servos a ROBOT may have?",
    "answer": [
      "A ROBOT may not have more than **8 motors** and **10 servos** from the allowable actuator lists per R501 and R502 for all MECHANISMS used in all configurations [25].",
      "A ROBOT may have up to 12 motors and 8 servos for all configurations [25].",
      "The limits of 8 motors and 10 servos apply only to the configuration used for a single MATCH, not across all potential configurations [25].",
      "There is no limit on the number of motors or servos, as long as the ROBOT stays within the overall weight limit [25, 26]."
    ]
  }
];
