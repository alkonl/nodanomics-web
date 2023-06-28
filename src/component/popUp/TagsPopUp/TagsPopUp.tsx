import React from 'react';
import {BasePopUp} from "../PopUp";
import {Dialog} from "@headlessui/react";
import {FormAddTags, ITagsInputProps} from "../../form";

export const TagsPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    tagsForm: ITagsInputProps
}> = ({tagsForm, onClose, isShow}) => {
    console.log('TagsPopUp')
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <div style={{
                        padding: '40px',
                        backgroundColor: 'white',
                        borderRadius: 8,
                    }}>
                        <FormAddTags {...tagsForm}/>
                    </div>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
