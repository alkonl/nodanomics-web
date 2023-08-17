import React from 'react';
import {BaseNodeContainer} from "../container";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {IDatasetDatafield} from "../../../../interface";
import {Box} from "@mui/material";
import {NodeStyle} from "../styledComponent";
import {EColor} from "../../../../constant";

export const DatasetNode: React.FC<NodeProps<IDatasetDatafield>> = (props) => {

    const isDatasetConnected = props.data.datasetId !== undefined;

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
                backgroundColor: EColor.black,
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        position: 'relative'
                    }}>
                        {isDatasetConnected && <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: isDatasetConnected ? EColor.darkPurple06 : '',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: isDatasetConnected ? EColor.darkPurple : '',
                        }}/>}
                        <NodeStyle.Name sx={{
                            padding: 1,
                        }}>
                            {props.data.name}
                        </NodeStyle.Name>
                    </Box>

                </Box>
                <NodeStyle.Name type='small'>
                    Tag: {props.data.tag}
                </NodeStyle.Name>
            </Box>

        </BaseNodeContainer>
    );
};
