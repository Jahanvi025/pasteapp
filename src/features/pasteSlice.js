import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
  pastes: localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
     const paste = action.payload;
     state.pastes.push(paste);
     localStorage.setItem("pastes", JSON.stringify(state.pastes));
    toast('Paste created Successfully. ☑️');

    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      
      // Debugging: Log incoming paste data
      console.log("Updating Paste:", paste);
    
      // Find the index correctly
      const index = state.pastes.findIndex((item) => item._id === paste._id);
    
      // Debugging: Log index result
      console.log("Found index:", index);
    
      if (index !== -1) { 
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated ✅");
      } else {
        toast.error("Paste not found ❌");
      }
    },
    
   resetAllPastes: (state, action) => {

    state.pastes = [];
    localStorage.removeItem("pastes");
     
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log("Deleting Paste ID:", pasteId);
    
      state.pastes = state.pastes.filter((item) => item._id !== pasteId);
      
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste deleted");
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer