import React, {useMemo} from 'react';
import {LandingRightPanelLayout} from "../layout";
import {Box, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../constant";
import {InfoParameter, MButton} from "../base";
import {Link} from "react-router-dom";
import {ELinks} from "../../service";
import {useDiagramDashboardState} from "../../redux";
import {formatDate} from "../../utils";

export const DiagramInfo = () => {
    const {diagrams, selectedDiagramId} = useDiagramDashboardState()


    const diagramInfo = useMemo(() => {
        return diagrams.find(diagram => diagram.id === selectedDiagramId)
    }, [diagrams])

    return (
        <LandingRightPanelLayout>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                paddingTop: 4,
                paddingBottom: 2,
                px: 3,
            }}>
                <Box>
                    <Typography
                        sx={{
                            fontSize: 22,
                            fontWeight: 600,
                            color: EFontColor.grey2,
                        }}
                    >
                        {diagramInfo?.name}
                    </Typography>
                    <Box sx={{
                        marginTop: 3,
                        borderWidth: 1,
                        borderColor: EColor.black,
                        backgroundColor: EColor.grey2,
                        borderStyle: 'solid',
                        width: '100%',
                        height: 160,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Typography
                            sx={{
                                fontSize: 26,
                                fontWeight: 600,
                            }}
                        >
                            Preview Image
                        </Typography>
                    </Box>
                    {diagramInfo && <InfoParameter.Container>
                        {diagramInfo.creator && <InfoParameter.Element label="Created By">
                            <InfoParameter.Text>
                                {diagramInfo.creator.firstName} {diagramInfo.creator.lastName}
                            </InfoParameter.Text>
                        </InfoParameter.Element>}
                        <InfoParameter.Element label="Creation Date">
                            <InfoParameter.Text>
                                {formatDate(diagramInfo.createdAt, 'v1')}
                            </InfoParameter.Text>
                        </InfoParameter.Element>
                        <InfoParameter.Element label="Last Edited">
                            <InfoParameter.Text>
                                {formatDate(diagramInfo.updatedAt, 'v1')}
                            </InfoParameter.Text>
                        </InfoParameter.Element>
                        {diagramInfo.lastEditor && <InfoParameter.Element label="Last Edited By">
                            <InfoParameter.Text>
                                {diagramInfo.lastEditor.firstName} {diagramInfo.lastEditor.lastName}
                            </InfoParameter.Text>
                        </InfoParameter.Element>}
                    </InfoParameter.Container>}
                </Box>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-end'
                }}>

                    <Link to={`${ELinks.diagram}/${selectedDiagramId}`}>
                        <MButton.Submit sx={{
                            alignSelf: 'flex-end'
                        }} variant="border">
                            Open
                        </MButton.Submit>
                    </Link>

                </Box>
            </Box>
        </LandingRightPanelLayout>
    );
};
