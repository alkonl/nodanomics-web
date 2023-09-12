import React from 'react';
import {EDateMarker, IBaseProject, dataMarkerTitle} from "../../../interface";
import {ProjectsListElement} from "./ProjectsListElement";
import {MAccordion} from "../../base";


export const ProjectListAccordion: React.FC<{
    projectDateGroup: EDateMarker,
    projects: IBaseProject[]
}> = ({projectDateGroup, projects}) => {
    return (
        <MAccordion.Standard title={dataMarkerTitle[projectDateGroup]}>
            {projects.map((project) => (
                <ProjectsListElement
                    projectName={project.name}
                    projectId={project.id}
                    key={project.id}
                    isBig={projectDateGroup === EDateMarker.DAY}
                />
            ))}
        </MAccordion.Standard>
    );
};
