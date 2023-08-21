import React from 'react';
// eslint-disable-next-line import/named
import {HandleProps} from "reactflow";
import {EColor} from "../../../constant";
import {EConnection, EConnectionMode} from "../../../interface";
import {BaseHandle} from "./BaseHandle";

export const ChainHandle: React.FC<Pick<HandleProps, 'isConnectable' | 'type' | 'position'> & {
    style?: React.CSSProperties
    mode?: EConnectionMode
    isActive?: boolean
}> = ({isActive = true, ...props}) => {

    return (<BaseHandle
            connectionMode={EConnection.ChainConnection}
            color={isActive ? EColor.orange : EColor.grey4}
            {...props}
        />
    )
};

