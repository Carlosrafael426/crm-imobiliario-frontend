import { create } from 'zustand';

export const useStore = create((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads }),
  
  selectedLead: null,
  setSelectedLead: (lead) => set({ selectedLead: lead }),

  notifications: [],
  addNotification: (notification) => set((state) => ({ 
    notifications: [...state.notifications, notification]
  })),
  setNotifications: (notifications) => set({ notifications }),
  
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled }))
}));
