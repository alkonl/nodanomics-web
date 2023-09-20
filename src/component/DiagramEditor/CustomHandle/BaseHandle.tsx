import React from 'react';
// eslint-disable-next-line import/named
import {Handle, HandleProps, Position} from "reactflow";
import {EConnection, EConnectionMode} from "../../../interface";
import {Box} from "@mui/material";
import {EColor} from "../../../constant";
import {createHandleId} from "../../../service";

const transformStyles: { [key in Position]: string } = {
    left: 'translate(25%, -50%)',
    right: 'translate(-25%, -50%)',
    top: 'translate(-50%, 25%)',
    bottom: 'translate(-50%, -25%)',
}

export const BaseHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
    connectionMode: EConnection
    color: EColor
    mode?: EConnectionMode
}> = ({
          isConnectable,
          type,
          style,
          position,
          mode,
          connectionMode,
          color
      }) => {
    // const id = `${connectionMode}.${mode}.${position}`;
    const id = createHandleId(connectionMode, position, mode);

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
                    background: color,
                    width: '10px',
                    height: '10px',
                    transform: transformStyles[position],
                    ...style
                }}
            />
        </Box>
    );
};

