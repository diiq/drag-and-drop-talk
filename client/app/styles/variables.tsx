// Breakpoints
const radius = 2;
const focusColor = "rgba(133, 191, 253, 1)";
export const vars = {
  smallScreen: 500,
  fontFamily: '"Open Sans", sans',
  fontSize: 16,
  lineHeight: 1.5,
  spacing: 24,
  smallSpacing: 12,
  color: {
    focus: focusColor,
    font: "#333",
    fontLight: "#777",
    theme: "#60524d",
    themeLight: "#444444",
    background: "#999",
    lightest: "#f5f5f5",
    action: "#556c9c",
    actionLight: "#044e81",
    warn: "#ae4553",
    warnLight: "#7e273a",
    success: "#55712c",
    successLight: "#255015",
    white: "#fff",
    whiteLight: "#dfeafa",
    light: "ddd"
  },
  border: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: radius,
  },
  borderSimple: "1px solid #ddd",
  shadow: {
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25), 0px 0px 4px rgba(0, 0, 0, 0.1)",
    insetBoxShadow: "inset 2px 2px 3px rgba(0, 0, 0, 0.1)",
    deepShadow: "0px 0px 2px rgba(0, 0, 0, 0.15), 5px 5px 5px rgba(0, 0, 0, 0.3)"
  },

  focus: {
    position: 'relative',
    ':focus': {
      outline: "none",
      boxShadow: `0 0 10px ${focusColor}, 0 0 1px ${focusColor}, 0 0 0px ${focusColor}`,
      zIndex: 3
    }
  },

  inputFocus: {
    ':focus': {
      outline: "none",
      boxShadow: `inset 2px 2px 3px rgba(0,0,0, 0.1), 0 0 10px ${focusColor}, 0 0 1px ${focusColor}, 0 0 0px ${focusColor}`,
      zIndex: 1
    }
  },
  clearFix: {
    ':after': {
      clear: 'both',
      content: '""',
      display: 'table'
    }
  },
  screenreaderOnly: {
    position: 'absolute',
    left: -10000,
    top: 'auto',
    width: 1,
    height: 1,
    overflow: 'hidden'
  },

  scrollbars: {
    WebkitOverflowScrolling: 'touch',
    '::-webkit-scrollbar-track': {
      backgroundColor: "#ddd",
    },

    '::-webkit-scrollbar': {
      width: 6,
      height: 6,
      backgroundColor: "#ccc"
    },

    '::-webkit-scrollbar-thumb': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: "#999"
    }
  }
}

export const centeredBox = {
  position: 'relative',
  margin: `${vars.spacing}px auto`,
  maxWidth: 600,
  backgroundColor: vars.color.white,
  ...vars.border,
  ...vars.clearFix,
}

export const clearfix = {
  ':after': {
    content: '""',
    display: 'table',
    clear: 'both'
  }
}


