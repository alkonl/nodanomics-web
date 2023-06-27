import React from 'react';
import {Chip} from "@mui/material";
import {ITag} from "../../../interface";

export const TagListSmallItem: React.FC<{
    tag: Omit<ITag, 'id'>
    onDelete?: (tag: Omit<ITag, 'id'>) => void
}> = ({
          tag,
          onDelete
      }) => {

    const onDeleteHandler = () => {
        if (onDelete) {
            onDelete(tag)
        }
    }
    return (
        <Chip
            key={tag.name}
            label={tag.name}
            variant="filled"
            onClick={onDeleteHandler}
        />
    );
};
