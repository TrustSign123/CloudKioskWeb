import keepPreset from "keep-react/src/keep-preset.js";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "my": "#00000000"
    }
  },
  variants: {
    extend: {
      backgroundOpacity: ["active"],
    },
  },
  plugins: [],
  presets: [keepPreset],
};
