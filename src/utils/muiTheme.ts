import {createTheme, ThemeOptions} from "@mui/material";

export const themeOptions: ThemeOptions = {
    palette: {
        // type: 'light',
        primary: {
            main: '#f5f5f5',
        },
        secondary: {
            main: '#c64bff',
        },
        text: {
            primary: '#000000d6',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    color: '#000000d6',
                }
            }
        }
    }
};

export const theme = createTheme(themeOptions);
