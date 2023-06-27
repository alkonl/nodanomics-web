import React from 'react';
import style from './TagList.module.scss'
import { TagElement} from "./TagElement";
import {ITag} from "../../../interface";

export const TagList: React.FC<{ tags: ITag[], onSelect: (tag: ITag) => void }> = ({tags, onSelect}) => {
    return (
        <div className={style.container}>
            {tags.map((params) => <TagElement key={params.name} tag={params} onSelect={onSelect}/>)}
        </div>
    );
};
