import React from 'react';
import {ITagElementProps, TagElement} from "./TagElement";

export const TagList: React.FC<{ tags: ITagElementProps[] }> = ({tags}) => {
    return (
        <div>
            {tags.map((params) => <TagElement key={params.name} {...params}/>)}
        </div>
    );
};
