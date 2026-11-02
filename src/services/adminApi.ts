import { store } from '../store';
import { apiSlice, AdminStats, AdminSchool } from '../store/api/apiSlice';
import type { User } from '../store/api/authApi';

export type { AdminStats, AdminSchool };

export const adminApi = {
  /**
   * Fetches overall platform statistics via RTK Query
   */
  async getStats(): Promise<AdminStats> {
    return await store.dispatch(apiSlice.endpoints.getAdminStats.initiate()).unwrap();
  },

  /**
   * Lists all users with optional filters via RTK Query
   */
  async getUsers(params?: { search?: string; role?: string; grade?: number }): Promise<User[]> {
    return await store.dispatch(apiSlice.endpoints.getAdminUsers.initiate(params)).unwrap();
  },

  /**
   * Retrieves single user details via RTK Query
   */
  async getUserById(id: string): Promise<{ user: User; stats: any; attempts: any[] }> {
    return await store.dispatch(apiSlice.endpoints.getAdminUserById.initiate(id)).unwrap();
  },

  /**
   * Updates user role or attributes via RTK Query
   */
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    return await store.dispatch(apiSlice.endpoints.updateAdminUser.initiate({ id, updates })).unwrap();
  },

  /**
   * Deletes a user account via RTK Query
   */
  async deleteUser(id: string): Promise<void> {
    await store.dispatch(apiSlice.endpoints.deleteAdminUser.initiate(id)).unwrap();
  },

  /**
   * Lists all schools with enrollment stats via RTK Query
   */
  async getSchools(search?: string): Promise<AdminSchool[]> {
    return await store.dispatch(apiSlice.endpoints.getAdminSchools.initiate(search)).unwrap();
  },

  /**
   * Adds a new school via RTK Query
   */
  async createSchool(payload: {
    name: string;
    city: string;
    isPopular?: boolean;
  }): Promise<AdminSchool> {
    return await store.dispatch(apiSlice.endpoints.createAdminSchool.initiate(payload)).unwrap();
  },

  /**
   * Updates an existing school via RTK Query
   */
  async updateSchool(
    id: string,
    payload: Partial<{ name: string; city: string; isPopular: boolean }>,
  ): Promise<AdminSchool> {
    return await store.dispatch(apiSlice.endpoints.updateAdminSchool.initiate({ id, payload })).unwrap();
  },

  /**
   * Deletes a school via RTK Query
   */
  async deleteSchool(id: string): Promise<void> {
    await store.dispatch(apiSlice.endpoints.deleteAdminSchool.initiate(id)).unwrap();
  },
};
