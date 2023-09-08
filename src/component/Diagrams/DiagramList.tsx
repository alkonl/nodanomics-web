import React from 'react';
import {IBaseDiagramInfo} from "../../interface";
import {MAccordion, MView} from "../base";

export const DiagramList: React.FC<{
    diagrams: IBaseDiagramInfo[]
}> = ({diagrams}) => {

    return (
        <MAccordion.Standard title="title">
            {diagrams.map((diagram) => (
                <MView.Simple
                    key={diagram.id}
                    title={diagram.name}
                />
            ))}
        </MAccordion.Standard>
    );
};
