import React, {useCallback, useState} from 'react';
import {Box, Menu, MenuItem} from "@mui/material";
import {useToggle} from "../../../hooks";
import {EDiagramManagerType} from "../../form";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../../service";
import {useDiagramEditorState} from "../../../redux";
import {useDeleteDiagramMutation, useGetProjectInfoQuery} from "../../../api";
import {CreateDiagramPopUp} from "../../popUp";
import {DiagramManagerPopUp} from "../../popUp/NewDiagramPopUp";

export const DiagramEditorDropDownMenuContent: React.FC<{
    anchorEl: HTMLElement | null
    close: () => void
}> = ({
          anchorEl,
          close
      }) => {
    const navigate = useNavigate()
    const toggleCreateDiagram = useToggle()

    const {currentDiagramId} = useDiagramEditorState()
    const [deleteDiagram] = useDeleteDiagramMutation()
    const [diagramManagerType, setDiagramManagerType] = useState<EDiagramManagerType>(EDiagramManagerType.new)
    const {
        open: openManagerDiagramPopUp,
        close: closeManagerDiagramPopUp,
        isOpened: isManagerDiagramPopUpShow
    } = useToggle()

    const onNewDiagram = () => {
        toggleCreateDiagram.open()
        close()
    }

    const onRenameDiagram = () => {
        setDiagramManagerType(EDiagramManagerType.rename)
        openManagerDiagramPopUp()
    }

    const onCloseManagerDiagramPopUp = useCallback(() => {
        closeManagerDiagramPopUp()
    }, [])

    const onCopyDiagram = () => {
        setDiagramManagerType(EDiagramManagerType.makeACopy)
        openManagerDiagramPopUp()
    }

    const onProjects = () => {
        navigate(ELinks.project)
    }


    const onDelete = () => {
        if (currentDiagramId) {
            deleteDiagram(currentDiagramId)
        }
    }

    const buttons = [{
        name: 'New',
        onClick: onNewDiagram
    }, {
        name: 'Projects',
        onClick: onProjects
    }, {
        name: 'Save (auto save)',
        onClick: () => {
            //
        }
    }, {
        name: 'Rename-',
        onClick: onRenameDiagram
    }, {
        name: 'Make a copy-',
        onClick: onCopyDiagram
    }, {
        name: 'Delete-',
        onClick: onDelete
    }]

    const {data: projectInfo} = useGetProjectInfoQuery({
        diagramId: currentDiagramId
    })

    return (
        <>
            <Box>
                {projectInfo &&
                    <CreateDiagramPopUp
                        projectId={projectInfo.id}
                        isShow={toggleCreateDiagram.isOpened}
                        onClose={toggleCreateDiagram.close}
                        onSuccess={({id: newDiagramId}) => {
                            navigate(`${ELinks.diagram}/${newDiagramId}`)
                        }}
                    />}
            </Box>

            <Menu
                sx={{mt: '25px'}}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}

                onClose={close}
            >

                <DiagramManagerPopUp
                    type={diagramManagerType}
                    isShow={isManagerDiagramPopUpShow}
                    onClose={onCloseManagerDiagramPopUp}
                />

                {buttons.map((button) => (<MenuItem
                    onClick={button.onClick}
                    key={button.name}
                >{button.name}</MenuItem>))}
            </Menu>
        </>
    );
};

