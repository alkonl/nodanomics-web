import React from 'react';
import {Chip} from "@mui/material";
import {ITag} from "../../../../interface";

export const SelectedTag: React.FC<{
    tag: ITag
    onDelete: (tag: ITag) => void
}> = ({
          tag,
          onDelete
      }) => {

    const onDeleteHandler = () => {
        onDelete(tag)
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
