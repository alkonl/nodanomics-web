import React from 'react';
// eslint-disable-next-line import/named
import {Handle, HandleProps} from "reactflow";
import {EConnection} from "../../../interface";
import {EColor} from "../../../constant";

export const LogicHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
}> = ({
          isConnectable,
          type,
          style,
          position
      }) => {
    return (
        <Handle
            type={type}
            position={position}
            isConnectable={isConnectable}
            id={EConnection.LogicConnection}
            style={{
                background: EColor.blue,
                width: '10px',
                height: '10px',
                ...style
            }}
        />
    );
};

