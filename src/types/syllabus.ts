export interface SubjectSummary {
  name: string;
  code: string;
  category: 'science';
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

