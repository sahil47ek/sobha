import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
}

interface LeadsState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

const initialState: LeadsState = {
  leads: [],
  loading: false,
  error: null,
};

export const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Omit<Lead, 'id' | 'date' | 'status'>>) => {
      const newLead: Lead = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'new'
      };
      state.leads.unshift(newLead);
    },
    updateLeadStatus: (state, action: PayloadAction<{ id: string; status: Lead['status'] }>) => {
      const lead = state.leads.find(l => l.id === action.payload.id);
      if (lead) {
        lead.status = action.payload.status;
      }
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter(lead => lead.id !== action.payload);
    },
  },
});

export const { addLead, updateLeadStatus, deleteLead } = leadsSlice.actions;
export default leadsSlice.reducer; 