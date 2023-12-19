import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageProps {
  value: Map<string, string>;
  name: string;
}

const initialState: LanguageProps = {
  value: new Map<string, string>(),
  name: "",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageProps>) => {
      state.value = action.payload.value;
      state.name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
