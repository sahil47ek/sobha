import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  source: 'Contact Form' | 'Project Enquiry';
  propertyInterest?: string;
  message?: string;
  projectId?: string;
  projectTitle?: string;
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
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter(lead => lead.id !== action.payload);
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex(lead => lead.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = action.payload;
      }
    },
  },
});

export const { setLeads, addLead, deleteLead, updateLead } = leadsSlice.actions;
export default leadsSlice.reducer; 