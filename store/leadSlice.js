import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leads: [],
};

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload
    },
    addLead: (state, action) => {
      state.leads = [...state.leads, action.payload];
    },
    updateLeadStatus: (state, action) => {
      const { id, status } = action.payload;
      const lead = state.leads.find((lead) => lead.id === id);
      if (lead) {
        lead.status = status;
      }
    },
  },
});

export const { setLeads, updateLeadStatus, addLead } = leadSlice.actions;
export default leadSlice.reducer;
