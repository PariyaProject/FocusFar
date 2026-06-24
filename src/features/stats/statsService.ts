import type { TrainingRecord } from '../training/types';

const STORAGE_KEY = 'focusfar_training_records';

export const statsService = {
  getRecords(): TrainingRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse training records', e);
      return [];
    }
  },

  saveRecord(record: TrainingRecord): void {
    const records = this.getRecords();
    records.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  },

  getTodayRecords(): TrainingRecord[] {
    const records = this.getRecords();
    const today = new Date().toISOString().split('T')[0];
    
    return records.filter(record => {
      const recordDate = new Date(record.startedAt).toISOString().split('T')[0];
      return recordDate === today;
    });
  },

  getTodayCompletedCount(): number {
    return this.getTodayRecords().filter(r => r.completed).length;
  },

  clearRecords(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};
