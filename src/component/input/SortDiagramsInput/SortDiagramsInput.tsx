import React from 'react';
// eslint-disable-next-line import/named
import {Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {ESortType} from "../../../interface";
import {sortTypesText} from "../../../constant";
import {useAppDispatch, useDashboardViewsState} from "../../../redux";
import {dashboardViewsActions} from "../../../redux/store";

export const SortDiagramsInput = () => {
    const dispatch = useAppDispatch()

    const dashboardViews = useDashboardViewsState()
    const selectedDashboardView = dashboardViews.dashboardViews.find(dashboardView => dashboardView.dashboardViewId === dashboardViews.selectedDashboardViewId)
    const selectedSortType = selectedDashboardView?.sortType || ESortType.NameA2Z
    const handleChange = (event: SelectChangeEvent) => {
        if (dashboardViews.selectedDashboardViewId) {
            dispatch(dashboardViewsActions.updateSortType({
                sortType: event.target.value as ESortType,
                dashboardViewId: dashboardViews.selectedDashboardViewId
            }))
        }
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'end', justifyContent: 'center', gap: 1}}>
            <Typography>
                Sort:
            </Typography>
            <FormControl variant="standard" sx={{minWidth: 120}} size="small">

                <Select
                    value={selectedSortType}
                    onChange={handleChange}
                >
                    {Object.keys(ESortType).map((key) => {
                        return <MenuItem key={key} value={key}>{sortTypesText[key as ESortType]}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    )
        ;
};
