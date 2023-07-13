// eslint-disable-next-line import/named
import {createTheme, ThemeOptions} from "@mui/material";
import {EFontColor} from "../constant";

export const themeOptions: ThemeOptions = {
    palette: {
        // type: 'light',
        primary: {
            main: EFontColor.grey,
        },
        secondary: {
            main: EFontColor.purple,
        },
        text: {
            primary:EFontColor.grey2,
            secondary:EFontColor.purple,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    color: EFontColor.black,
                    borderRadius: 0,
                    "&.MuiButtonBase-root:hover": {
                        backgroundColor: "inherit",
                    }
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    color: EFontColor.black,
                }
            }
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: 'inherit',
                        }
                    }
                }
            }
        }
    }
};

export const theme = createTheme(themeOptions);
