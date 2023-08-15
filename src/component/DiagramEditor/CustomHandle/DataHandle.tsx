import React from 'react';
// eslint-disable-next-line import/named
import {HandleProps} from "reactflow";
import {EConnection, EConnectionMode} from "../../../interface";
import {BaseHandle} from "./BaseHandle";
import {EColor} from "../../../constant";

export const DataHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
    mode?: EConnectionMode
}> = (props) => {

    return (<BaseHandle
            connectionMode={EConnection.DataConnection}
            color={EColor.green}
            {...props}
        />
    )
};

