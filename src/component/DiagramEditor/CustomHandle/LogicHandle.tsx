import React from 'react';
// eslint-disable-next-line import/named
import {HandleProps} from "reactflow";
import {EConnection, EConnectionMode} from "../../../interface";
import {EColor} from "../../../constant";
import {BaseHandle} from "./BaseHandle";

export const LogicHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
    mode: EConnectionMode
}> = (props) => {

    return (<BaseHandle
            connectionMode={EConnection.LogicConnection}
            color={EColor.blue}
            {...props}
        />
    )
};

