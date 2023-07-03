import React from 'react';
import {BasePopUp} from "../PopUp";
import {Dialog} from "@headlessui/react";
import {FormAddTags, ITagsInputProps} from "../../form";
import {Box} from "@mui/material";

export const TagsPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    tagsForm: ITagsInputProps
}> = ({tagsForm, onClose, isShow}) => {

    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <Box sx={{
                        padding: '40px',
                        backgroundColor: 'white',
                        borderRadius: 8,
                    }}>
                        <FormAddTags {...tagsForm}/>
                    </Box>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
