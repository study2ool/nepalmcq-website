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

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const syllabusApi = {
  /**
   * Fetches list of all subjects with curriculum metadata from backend syllabus folder
   */
  async getSubjects(category: 'science' = 'science'): Promise<SubjectSummary[]> {
    const res = await fetch(`${API_BASE}/subjects?category=${category}`);
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to fetch science subjects');
    }
    return json.data;
  },

  /**
   * Fetches topics dictionary by Grade (11 and 12) from backend syllabus
   */
  async getTopicsByGrade(): Promise<Record<number, Record<string, string[]>>> {
    const res = await fetch(`${API_BASE}/syllabus/topics`);
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to fetch topics');
    }
    return json.data;
  },

  /**
   * Fetches all complete syllabus trees from backend
   */
  async getAllSyllabi(): Promise<Record<string, SyllabusFile>> {
    const res = await fetch(`${API_BASE}/syllabus`);
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to fetch all syllabi');
    }
    return json.data;
  },

  /**
   * Fetches complete syllabus tree for a subject from backend
   */
  async getSyllabus(subject: string): Promise<SyllabusFile> {
    const res = await fetch(`${API_BASE}/syllabus/${encodeURIComponent(subject)}`);
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || `Failed to fetch syllabus for ${subject}`);
    }
    return json.data;
  },
};

