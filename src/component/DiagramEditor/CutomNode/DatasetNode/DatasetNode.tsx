import React from 'react';
import {BaseNodeContainer} from "../container/BaseNodeContainer";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {IDatasetDatafield} from "../../../../interface";
import {Box} from "@mui/material";
import {NodeText} from "../styledComponent";

export const DatasetNode: React.FC<NodeProps<IDatasetDatafield>> = (props) => {
    return (
        <BaseNodeContainer node={props}>
            <Box sx={{
                padding: 0.5,
                width: 120,
                height: 60,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <NodeText.Name >
                        {props.data.name}
                    </NodeText.Name>
                </Box>
                <NodeText.Name sx={{
                    alignSelf: 'flex-start',
                }} type='small'>
                    Tag: {props.data.tag}
                </NodeText.Name>
            </Box>

        </BaseNodeContainer>
    );
};
