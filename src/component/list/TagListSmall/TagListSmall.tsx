import React from 'react';
import {ITag} from "../../../interface";
import {TagListSmallItem} from "./TagListSmallItem";

export const TagListSmall: React.FC<{
    selectedTags?: (Omit<ITag, 'id'>)[],
    onDelete?: (tag: Omit<ITag, 'id'>) => void
}> = ({selectedTags,onDelete}) => {
    return (
        <div>
            {selectedTags && selectedTags.length > 0 && (
                selectedTags.map((tag) => (
                    <TagListSmallItem key={tag.name} tag={tag} onDelete={onDelete}/>
                ))
            )}
        </div>
    );
};
