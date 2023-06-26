import React from 'react';
import {BasePopUp} from "../PopUp";
import {Dialog} from "@headlessui/react";
import {ITagsInputProps, TagsForm} from "../../input";

export const TagsPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    tagsInput: ITagsInputProps
}> = ({tagsInput, onClose, isShow}) => {
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
                        <TagsForm {...tagsInput}/>
                    </div>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
