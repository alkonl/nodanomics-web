import React from 'react';
// eslint-disable-next-line import/named
import {Handle, HandleProps} from "reactflow";
import {EConnection, EConnectionMode} from "../../../interface";
import {EColor} from "../../../constant";

export const LogicHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
    mode?: EConnectionMode
}> = ({
          isConnectable,
          type,
          style,
          position,
          mode
      }) => {
    const id = `${EConnection.LogicConnection}.${mode}`;

    return (
        <Handle
            type={type}
            position={position}
            isConnectable={isConnectable}
            id={id}
            style={{
                background: EColor.blue,
                width: '10px',
                height: '10px',
                ...style
            }}
        />
    );
};

