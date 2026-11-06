import { Question } from "../../types/question";

export const hotelManagementQuestions: Question[] = [
  // --- GRADE 11 HOTEL MANAGEMENT ---
  {
    id: "hm-11-01",
    grade: 11,
    subject: "Hotel Management",
    topic: "Introduction to Hospitality",
    difficulty: "Easy",
    question:
      'In the hotel industry, which department is universally considered the "nerve centre" of all guest communications, room reservations, and billing?',
    options: [
      { id: "A", text: "Food and Beverage Service" },
      { id: "B", text: "Front Office" },
      { id: "C", text: "Human Resources" },
      { id: "D", text: "Engineering and Maintenance" },
    ],
    correctAnswer: "B",
    explanation:
      "The Front Office is the central hub and public face of a hotel, handling reservations, registration, room status, guest inquiries, mail, and departure settlement.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "model_question",
  },
  {
    id: "hm-11-02",
    grade: 11,
    subject: "Hotel Management",
    topic: "Food and Beverage Service",
    difficulty: "Medium",
    question:
      "What is the standard culinary and dining term for French-style service where food is partially cooked or carved on a rolling trolley (Guéridon) by the guest table?",
    options: [
      { id: "A", text: "Silver Service (English Service)" },
      { id: "B", text: "Guéridon Service (French Service)" },
      { id: "C", text: "American Service (Plated)" },
      { id: "D", text: "Buffet Service" },
    ],
    correctAnswer: "B",
    explanation:
      "Guéridon service involves presenting, carving, flambéing, or finishing gourmet dishes on a movable cart beside the guests table.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
  {
    id: "hm-11-03",
    grade: 11,
    subject: "Hotel Management",
    topic: "Food Production Operations",
    difficulty: "Easy",
    question:
      "In classical French kitchen hierarchy (Brigade de Cuisine), what is the specific title of the executive second-in-command chef directly under the Chef de Cuisine?",
    options: [
      { id: "A", text: "Chef de Partie" },
      { id: "B", text: "Sous Chef" },
      { id: "C", text: "Commis Chef" },
      { id: "D", text: "Aboyeur" },
    ],
    correctAnswer: "B",
    explanation:
      "The Sous Chef (under-chef) is the direct assistant and second-in-command to the Executive Chef / Chef de Cuisine, managing daily kitchen staff and operations.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "model_question",
  },

  // --- GRADE 12 HOTEL MANAGEMENT ---
  {
    id: "hm-12-01",
    grade: 12,
    subject: "Hotel Management",
    topic: "Housekeeping Operations",
    difficulty: "Easy",
    question:
      "In hotel housekeeping operations, what term refers to a room status where the guest has left for the day but has not yet checked out?",
    options: [
      { id: "A", text: "Vacant Dirty (VD)" },
      { id: "B", text: "Occupied (OCC)" },
      { id: "C", text: "Sleep Out (SO)" },
      { id: "D", text: "Out of Order (OOO)" },
    ],
    correctAnswer: "B",
    explanation:
      "An Occupied (OCC) room status signifies that a guest is registered to the room and currently holding it, although they may be out sightseeing or working.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "hm-12-02",
    grade: 12,
    subject: "Hotel Management",
    topic: "Food Safety and HACCP",
    difficulty: "Medium",
    question:
      "In international food safety standards, what does the acronym HACCP represent?",
    options: [
      { id: "A", text: "Health And Culinary Cleanliness Program" },
      { id: "B", text: "Hazard Analysis and Critical Control Point" },
      { id: "C", text: "Hotel Administration and Customer Care Protocol" },
      {
        id: "D",
        text: "Hygiene Assessment and Catering Certification Procedure",
      },
    ],
    correctAnswer: "B",
    explanation:
      "HACCP stands for Hazard Analysis and Critical Control Point, an internationally recognized systematic approach to food safety and biological/chemical hazard prevention.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "model_question",
  },
  {
    id: "hm-12-03",
    grade: 12,
    subject: "Hotel Management",
    topic: "Beverage Studies",
    difficulty: "Medium",
    question:
      "Fermentation of grape must without distillation produces wine. When wine is subsequently distilled in copper pot stills, which spirit is produced?",
    options: [
      { id: "A", text: "Vodka" },
      { id: "B", text: "Brandy (Cognac/Armagnac)" },
      { id: "C", text: "Whisky" },
      { id: "D", text: "Rum" },
    ],
    correctAnswer: "B",
    explanation:
      "Brandy is an alcoholic beverage produced by distilling fermented fruit mash, predominantly grape wine. Notable high-grade varieties include Cognac and Armagnac.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
];
