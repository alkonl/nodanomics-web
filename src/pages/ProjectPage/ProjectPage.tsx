import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {
    DashboardPageLayout,
    ProjectDetails,
    ProjectsList
} from "../../component";
import {EColor} from "../../constant";
import {useAppDispatch, useProjectDashboardState} from "../../redux";
import {projectDashboardAction} from "../../redux/store";
import {MOCK_PROJECTS} from "../../mock/MOCK_PROJECT";
import moment from "moment";
import {useDidMountEffect} from "../../hooks";

export const ProjectPage = () => {
    const dispatch = useAppDispatch()



    useEffect(() => {
       const sortedProjects = [...MOCK_PROJECTS].sort((a, b) => {
            return moment(a.createdAt).diff(b.createdAt);
        })
        dispatch(projectDashboardAction.setProjects({
            projects: sortedProjects
        }))
    }, [dispatch])

    const projects = useProjectDashboardState().projects

    useDidMountEffect(() => {
        if (projects.length > 0) {
            const projectId = projects[0].id
            dispatch(projectDashboardAction.setSelectedProjectId({
                projectId: projectId
            }))
        }
    }, [projects])


    return (
        <DashboardPageLayout pageName="Projects">
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-between',
                    gap: 4,
                    paddingBottom: 4,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    position: 'relative',
                }}>


                    <Box sx={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderColor: EColor.grey2,
                        borderWidth: 2,
                        borderStyle: 'solid',
                        boxSizing: 'border-box',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flex: 1,
                            minHeight: '0px',
                        }}>
                            <Box sx={{
                                flex: 1,
                                overflow: 'auto',
                            }}>

                                <ProjectsList/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <ProjectDetails/>
            </Box>
        </DashboardPageLayout>
    );
};
