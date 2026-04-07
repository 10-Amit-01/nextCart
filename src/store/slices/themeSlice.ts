import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeState = "light" | "dark";

interface ThemeSliceState {
  theme: ThemeState;
}

// Check local storage for initial theme, default to system preference or 'light'
const getInitialTheme = (): ThemeState => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }
  // Check system preference
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

const initialState: ThemeSliceState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
    setTheme(state, action: PayloadAction<ThemeState>) {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
