export const COLORS = {
  WHITE: "#fffffe",
  FOREST_BLUE: "#094067",
  BLUE_MIRAGE: "#5f6c7b",
  ADAMANTINE_BLUE: "#3da9fc",
  INNOCENT_BLUE: "#90b4ce",
  ICE_CASTLE: "#d8eefe",
  SMUDGED_LIPS: "#ef4565",
};

export const THEMES = {
  background: COLORS.WHITE,
  headline: COLORS.FOREST_BLUE,
  paragraph: COLORS.BLUE_MIRAGE,
  highlight: COLORS.FOREST_BLUE,
  card: {
    background: COLORS.FOREST_BLUE,
    headline: COLORS.WHITE,
    paragraph: COLORS.ICE_CASTLE,
    tagBackground: COLORS.ADAMANTINE_BLUE,
    tagText: COLORS.WHITE,
    highlight: COLORS.SMUDGED_LIPS,
  },
  button: {
    background: COLORS.FOREST_BLUE,
    foreground: COLORS.WHITE,
  },
  secondary: {
    background: COLORS.ICE_CASTLE,
    headline: COLORS.FOREST_BLUE,
    paragraph: COLORS.BLUE_MIRAGE,
    highlight: COLORS.FOREST_BLUE,
    card: {
      background: COLORS.WHITE,
      headline: COLORS.FOREST_BLUE,
      paragraph: COLORS.BLUE_MIRAGE,
    },
  },
  border: {
    radius: 1000,
  },
};
