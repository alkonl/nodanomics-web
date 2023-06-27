import React from 'react';
import {Box, Typography} from "@mui/material";
import style from "./DashboardHeader.module.scss";
import {DiagramSearchBar} from "../../searchBar";
import {NewDiagramButton} from "../../button";
import {TagList} from "../../list";

const mockTags = [{
    name: 'Mock tag_1',
    id: '1',
}, {
    name: 'Mock tag_2',
    id: '2',
}]

export const DashboardHeader = () => {
    return (
        <div>
            <div className={style.topContainer}>
                <Typography>
                    My Diagrams
                </Typography>
                <div>
                    <DiagramSearchBar/>
                </div>
            </div>
            <div className={style.bottomContainer}>
                <NewDiagramButton/>
                <TagList tags={mockTags}/>
            </div>

        </div>
    );
};
