import React, {useEffect, useMemo, useRef} from 'react';
import {Box, Typography} from "@mui/material";
import style from './ProjectDetails.module.scss'
import {EColor, EFontColor} from "../../../constant";
import {formatDate} from "../../../utils";
import {MButton} from "../../base";
import {useToggle} from "../../../hooks";
import {useProjectDashboardState} from "../../../redux";
import {LandingRightPanelLayout} from "../../layout";
import {Link} from "react-router-dom";
import {ELinks} from "../../../service";
import {useGetDiagramsByProjectIdQuery} from "../../../api";

export const ProjectDetails = () => {
    const projectDashboardState = useProjectDashboardState()

    // now we don't have interface to select certain diagram
    const {data: projectDiagrams} = useGetDiagramsByProjectIdQuery(projectDashboardState?.selectedProjectId || '')
    const diagram = projectDiagrams?.diagrams?.[0]
    const projectInfo = useMemo(() => {
        return projectDashboardState.projects.find(project => project.id === projectDashboardState.selectedProjectId)
    }, [projectDashboardState])

    const prevProjectId = useRef(projectDashboardState.selectedProjectId)

    const manageProjectTab = useToggle()

    useEffect(() => {
        if (prevProjectId.current !== projectInfo?.id) {
            manageProjectTab.close()
            prevProjectId.current = projectDashboardState.selectedProjectId
        }
    }, [projectInfo])


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
                        {projectInfo?.name}
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
                    <Box className={style.projectInfo}>
                        <Typography className={style.projectInfoKey}>
                            Created By
                        </Typography>
                        <Typography>
                            {projectInfo?.createdBy}
                        </Typography>
                        <Typography className={style.projectInfoKey}>
                            Creation Date
                        </Typography>
                        <Typography fontSize={14}>
                            {projectInfo && formatDate(projectInfo.createdAt, 'v1')}
                        </Typography>
                        <Typography className={style.projectInfoKey}>
                            Last Edited
                        </Typography>
                        <Typography>
                            {projectInfo && formatDate(projectInfo.editedAt, 'v1')}
                        </Typography>
                        <Typography className={style.projectInfoKey}>
                            Last Edited By
                        </Typography>
                        <Typography>
                            {projectInfo?.lastEditedBy}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'row-reverse'
                }}>
                    {manageProjectTab.isOpened ? <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <MButton.Submit
                            onClick={manageProjectTab.open}
                            variant="border">
                            File Histroy
                        </MButton.Submit>
                        <MButton.Submit
                            onClick={manageProjectTab.open}
                            sx={{
                                color: EColor.red,
                            }}
                            variant="border">
                            Delete
                        </MButton.Submit>
                    </Box> : <MButton.Submit
                        onClick={manageProjectTab.open}
                        variant="border">
                        Manage
                    </MButton.Submit>}
                    <Link to={`${ELinks.diagram}/${diagram?.id}`}>
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

