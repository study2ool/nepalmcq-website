import { store } from '../store';
import { apiSlice, CollegeItem } from '../store/api/apiSlice';

export type { CollegeItem };

export const collegeApi = {
  /**
   * Fetches official list of secondary schools / colleges across Nepal via RTK Query
   */
  async getColleges(search?: string): Promise<CollegeItem[]> {
    try {
      return await store.dispatch(apiSlice.endpoints.getColleges.initiate(search)).unwrap();
    } catch (err) {
      console.warn('Colleges fetch notice:', err);
      return [];
    }
  },
};
