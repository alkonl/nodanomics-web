import React from 'react';
import {IDiagramListItem} from "../../interface";

export const DiagramList: React.FC<{
    diagrams: IDiagramListItem[]
}> = ({diagrams}) => {
    return (
        <div>
            {diagrams.map((diagram) => {
                return (
                    <div key={diagram.id}>
                        {diagram.name}
                    </div>
                )
            })}
        </div>
    );
};
