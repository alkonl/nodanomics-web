import React from 'react';
import {useDiagramEditorState} from "../../../../../../redux";
import {Box, Typography} from "@mui/material";
import {useGroupNodesByTag} from "../../../../../../hooks";
import {GroupTagItem} from "./GroupTagItem";
import {EColor, EFontColor} from "../../../../../../constant";

export const GroupedNodes = () => {

    const {diagramNodes} = useDiagramEditorState()

    const groupedNodesByTag = useGroupNodesByTag(diagramNodes)

    return (
        <Box sx={{
            padding: 1,
            position: 'relative',
            overflowY: 'auto',
            height: '100%',
            backgroundColor: EColor.darkMarineLight,

        }}>
            <Typography sx={{
                fontWeight: 'bold',
                color: EFontColor.lightMarine4,
            }}>
                Groups by tags
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                {Object.values(groupedNodesByTag).map((group) => <GroupTagItem
                        group={group}
                        key={group.tag}
                    />
                )
                }
            </Box>
        </Box>
    );
};

