import React from 'react';
import {
    Box,
    Checkbox, FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    MenuItem,
    Select,
    // eslint-disable-next-line import/named
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {BaseSection} from "./BaseSection";
import {ColorPicker} from "../../../../ColorPicker";
import {AlignButtons, FormattingButtons} from "../../../../button";

const mockFontFamily = [
    'Arial',
    'Times New Roman',
    'Courier New',
]

export const RightToolbarStyleSection = () => {

    const [fontFamily, setFontFamily] = React.useState('Arial');
    const selectFontFamily = (event: SelectChangeEvent) => {
        setFontFamily(event.target.value)
    }
    return (
        <BaseSection title="styles">
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}>
                <Box>
                    <Typography>
                        Color
                    </Typography>
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <FormControlLabel control={<ColorPicker/>} label="Border color"/>
                        <FormControlLabel control={<Input
                            type="number"
                            sx={{
                                width: 50,
                            }}/>} label="pt"/>
                    </Box>
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <FormControlLabel control={<Checkbox/>} label="Fill"/>
                        <FormControlLabel control={<ColorPicker/>} label="Color"/>
                    </Box>
                </Box>
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                }}
                >
                    <Typography>
                        Text
                    </Typography>
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <FormControl style={{
                            flex: 1,
                            marginRight: 20
                        }} size='small'>
                            <InputLabel id="demo-simple-select-label">Font family</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fontFamily}
                                label="Age"
                                onChange={selectFontFamily}
                            >
                                {mockFontFamily.map((font) => (
                                    <MenuItem key={font} value={font}>{font}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControlLabel control={<Input
                            type="number"
                            sx={{
                                width: 50,
                            }}/>} label="pt"/>
                    </Box>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10,
                        justifyContent: 'space-between',
                    }}>
                        <FormattingButtons/>
                        <AlignButtons/>
                    </Box>

                </Box>
            </Box>
        </BaseSection>
    );
};
