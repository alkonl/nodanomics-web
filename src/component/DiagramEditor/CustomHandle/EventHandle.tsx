import React from 'react';
// eslint-disable-next-line import/named
import {Handle, HandleProps} from "reactflow";
import {EColor} from "../../../constant";
import {EConnection, EConnectionMode} from "../../../interface";
import {Box} from "@mui/material";

export const EventHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
    mode?: EConnectionMode
}> = ({
          isConnectable,
          type,
          style,
          position,
          mode
      }) => {
    const id = `${EConnection.EventConnection}.${mode}`;
    const translateLeftCoefficient = position === 'left' ? 25 : -25
    return (
        <Box sx={{
            position: 'relative',
            height: '10px',
            width: '10px',
        }}>
            <Handle
                type={type}
                position={position}
                isConnectable={isConnectable}
                id={id}
                style={{
                    background: EColor.orange,
                    width: '10px',
                    height: '10px',
                    transform: `translate(${translateLeftCoefficient}%, -50%)`,
                    ...style
                }}
            />
        </Box>
    );
};

