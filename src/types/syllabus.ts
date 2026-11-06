export interface SubjectSummary {
  name: string;
  code: string;
  category: 'science' | 'commerce' | string;
  isNepaliLang: boolean;
  grades: number[];
  totalChapters: number;
  totalTopics: number;
  chaptersByGrade: Record<number, string[]>;
  branchesByGrade: Record<number, string[]>;
}

export interface SyllabusTopic {
  id: string;
  topicNumber: number;
  topic: string;
  brief: string;
}

export interface SyllabusChapter {
  id: string;
  chapterNumber: number;
  chapterName: string;
  topics: SyllabusTopic[];
}

export interface SyllabusBranch {
  id: string;
  branchNumber: number;
  branchName: string;
  chapters: SyllabusChapter[];
  weightageMarks?: number;
  teachingHours?: number;
}

export interface BloomTaxonomy {
  knowledgePercent: number;
  understandingPercent: number;
  applicationPercent: number;
  higherAbilityPercent: number;
}

export interface UnitWeightageItem {
  unitName: string;
  weightageMarks: number;
  teachingHours: number;
  mcqMarks?: number;
  shortAnswerMarks?: number;
  longAnswerMarks?: number;
}

export interface NebSpecificationGrid {
  subject: string;
  grade: 11 | 12;
  theoryMarks: number;
  practicalMarks: number;
  passMarksTheory: number;
  creditHours: number;
  teachingHours: number;
  examDurationMinutes: number;
  questionFormat: {
    groupA: { count: number; marksPerQuestion: number; totalMarks: number; type: string };
    groupB: { count: number; marksPerQuestion: number; totalMarks: number; type: string };
    groupC: { count: number; marksPerQuestion: number; totalMarks: number; type: string };
  };
  bloomTaxonomy: BloomTaxonomy;
  units: UnitWeightageItem[];
}

export interface SyllabusGrade {
  id: string;
  grade: number;
  subject: string;
  branches: SyllabusBranch[];
}

export interface SyllabusFile {
  metadata: {
    country: string;
    curriculum: string;
    subject: string;
    subjectCode: string;
    description?: string;
  };
  grades: {
    '11': SyllabusGrade;
    '12': SyllabusGrade;
  };
}

