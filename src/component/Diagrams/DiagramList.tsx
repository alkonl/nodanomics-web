import React from 'react';
import {IBaseDiagramInfo} from "../../interface";
import {MAccordion} from "../base";
import {DiagramListItem} from "./DiagramListItem";

export const DiagramList: React.FC<{
    diagrams: IBaseDiagramInfo[]
}> = ({diagrams}) => {

    return (
        <MAccordion.Standard title="title">
            {diagrams.map((diagram) => (
                <DiagramListItem
                    key={diagram.id}
                    diagram={diagram}
                />
            ))}
        </MAccordion.Standard>
    );
};
