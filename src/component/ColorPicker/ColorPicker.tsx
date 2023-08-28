import React from 'react';
import {Box, Button} from "@mui/material";
import {HexColorPicker} from "react-colorful";
import {EColor} from "../../constant";
import {Popover} from '@headlessui/react'

export const ColorPicker: React.FC<{
    onChange?: (newColor: string) => void
    value?: string
}> = ({
          onChange,
          value,
      }) => {
    return (
        <Box sx={{
            width: '100%',
        }}>
            <Popover>
                <Popover.Button style={{
                    width: '100%',
                }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            minHeight: 30,
                            flex: 1,
                            borderColor: EColor.grey2,
                            borderWidth: 3,
                            borderRadius: 0,
                            borderStyle: 'solid',
                            padding: 0,
                        }}
                        style={{
                            backgroundColor: value,
                        }}
                        component={Button}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: value,
                            }}
                        />
                    </Box>
                </Popover.Button>
                <Popover.Panel >
                    <Box sx={{
                        position: 'absolute',
                        zIndex: 999999,
                    }}>
                        <HexColorPicker
                            color={value}
                            onChange={onChange}
                        />
                    </Box>

                </Popover.Panel>
            </Popover>
        </Box>
    );
};
