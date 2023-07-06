import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {
    DashboardPageLayout,
    ProjectDetails,
    ProjectsList
} from "../../component";
import {EColor} from "../../constant";
import {useAppDispatch} from "../../redux";
import {projectDashboardAction} from "../../redux/store";
import {MOCK_PROJECTS} from "../../mock/MOCK_PROJECT";


export const ProjectPage = () => {
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(projectDashboardAction.setProjects({
            projects: MOCK_PROJECTS
        }))
    },[])


    return (
        <DashboardPageLayout pageName="Projects">
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-between',
                    gap: 5,
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
