import React from 'react';
import {Tooltip, Box} from "@mui/material";
import {ELeftToolbarSideMenu} from "../../../../interface";
import {MButton} from "../../../base";

export const LeftToolbarItem: React.FC<{
    name: ELeftToolbarSideMenu;
    onClick: (name: ELeftToolbarSideMenu) => void;
    Component: React.FC;
    isSelected: boolean;
}> = ({name, onClick, Component}) => {

    const onClickHandler = () => {
        onClick(name);
    }

    return (
        <Tooltip title={name}>
          <Box>
              <MButton.Submit
                  style={{
                      minWidth: 35,
                      height: 44,
                      width: 44,
                      padding: 6,
                      margin: 0,
                      display: 'inline-block',
                  }}
                  onClick={onClickHandler}
              >
                  <Component/>
              </MButton.Submit>
          </Box>
        </Tooltip>
    );
};

