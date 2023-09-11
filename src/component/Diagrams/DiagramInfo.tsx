import React, {useMemo} from 'react';
import {LandingRightPanelLayout} from "../layout";
import {Box, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../constant";
import {MButton, Parameter} from "../base";
import {Link} from "react-router-dom";
import {ELinks} from "../../service";
import {useDiagramDashboardState} from "../../redux";

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
                    <Parameter.Container columns={9} gap={1}>
                        <Parameter.ElementContainer label="Created By">
                            <Parameter.Text  >
                                TODO
                            </Parameter.Text>
                        </Parameter.ElementContainer>
                        <Parameter.ElementContainer label="Created By">
                            <Parameter.Text  >
                                TODO
                            </Parameter.Text>
                        </Parameter.ElementContainer>
                        <Parameter.ElementContainer label="Created By">
                            <Parameter.Text  >
                                TODO
                            </Parameter.Text>
                        </Parameter.ElementContainer>
                    </Parameter.Container>
                    {/*<Box className={style.projectInfo}>*/}
                    {/*    <Typography className={style.projectInfoKey}>*/}
                    {/*        Created By*/}
                    {/*    </Typography>*/}
                    {/*    <Typography>*/}
                    {/*        /!*{diagramInfo?.createdBy}*!/*/}
                    {/*    </Typography>*/}
                    {/*    <Typography className={style.projectInfoKey}>*/}
                    {/*        Creation Date*/}
                    {/*    </Typography>*/}
                    {/*    <Typography fontSize={14}>*/}
                    {/*        /!*{diagramInfo && formatDate(projectInfo.createdAt, 'v1')}*!/*/}
                    {/*    </Typography>*/}
                    {/*    <Typography className={style.projectInfoKey}>*/}
                    {/*        Last Edited*/}
                    {/*    </Typography>*/}
                    {/*    <Typography>*/}
                    {/*        /!*{diagramInfo && formatDate(projectInfo.editedAt, 'v1')}*!/*/}
                    {/*    </Typography>*/}
                    {/*    <Typography className={style.projectInfoKey}>*/}
                    {/*        Last Edited By*/}
                    {/*    </Typography>*/}
                    {/*    <Typography>*/}
                    {/*        /!*{diagramInfo?.lastEditedBy}*!/*/}
                    {/*    </Typography>*/}
                    {/*</Box>*/}
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
