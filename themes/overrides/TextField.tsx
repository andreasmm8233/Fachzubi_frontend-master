export default function TextField() {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            background: "#fff",
            border: "1px solid #0096A4",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 400,

            "&:hover": {
              background: "#fff",
            },

            "&:before": {
              display: "none",
            },
            "&:after": {
              display: "none",
            },
          },
          "& .MuiInputBase-input": {
            padding: "26.5px 14px",
          },
          "& .MuiFormLabel-root": {
            fontSize: "14px",
          },
          "& .MuiInputLabel-shrink": {
            textTransform: "uppercase",
            color: "#834331",
            fontSize: "14px",
            letterSpacing: " 0.04em",
            background: "#fff",
            padding: "0px 4px",
          },
        },
      },
    },
  };
}
