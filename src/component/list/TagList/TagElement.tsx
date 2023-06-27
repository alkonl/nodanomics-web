import React from 'react';
import {Chip} from "@mui/material";
import {ITag} from "../../../interface";



export interface ITagElementProps {
    tag: ITag
    onSelect: (tag: ITag)=> void
}

export const TagElement: React.FC<ITagElementProps> = ({tag, onSelect}) => {

    const onSelectHandle = ()=>{
        onSelect(tag)
    }

    return (
        <Chip
            onClick={onSelectHandle}
            label={tag.name}
            variant={tag.isSelected ? 'filled' : 'outlined'}
            size="small"
        />
    );
};
