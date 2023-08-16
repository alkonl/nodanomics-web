import React from 'react';
// eslint-disable-next-line import/named
import {HandleProps} from "reactflow";
import {EColor} from "../../../constant";
import {EConnection, EConnectionMode} from "../../../interface";
import {BaseHandle} from "./BaseHandle";

export const EventHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
    mode?: EConnectionMode
}> = (props) => {

    return (<BaseHandle
            connectionMode={EConnection.EventConnection}
            color={EColor.orange}
            {...props}
        />
    )
};

