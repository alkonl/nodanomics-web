import React from 'react';
// eslint-disable-next-line import/named
import {Handle, HandleProps} from "reactflow";
import {EConnection, EConnectionMode} from "../../../interface";
import {EColor} from "../../../constant";
import {Box} from "@mui/material";
import {createHandleId} from "../../../service";

export const LogicHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
    mode: EConnectionMode
}> = ({
          isConnectable,
          type,
          style,
          position,
          mode
      }) => {

    const id = createHandleId(EConnection.LogicConnection, mode, type);

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
                    background: EColor.blue,
                    width: '10px',
                    height: '10px',
                    transform: `translate(${translateLeftCoefficient}%, -50%)`,
                    ...style
                }}
            />
        </Box>
    );
};

