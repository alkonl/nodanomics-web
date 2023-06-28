import React from 'react';
import style from './TagList.module.scss'
import {TagElement} from "./TagElement";
import {useTagsDashboardView} from "../../../hooks";

export const TagList: React.FC<{
    dashboardViewId: string
}> = ({dashboardViewId}) => {
    const {tags, onTagSelect, isLoaded} = useTagsDashboardView({dashboardViewId})

    return (
        <div className={style.container}>
            {isLoaded && tags.map((params) => <TagElement key={params.name} tag={params} onSelect={onTagSelect}/>)}
        </div>
    );
};
