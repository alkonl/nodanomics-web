import {MouseEvent as ReactMouseEvent, useCallback, useState} from "react";
import {IReactFlowNode} from "../interface";
import {useReactFlowInstance} from "./useReactFlowInstance";

export const useOnNodeContextMenu = () => {
    const {reactFlowWrapper} = useReactFlowInstance().data
    const [menu, setMenu] = useState<{
        id: string;
        top: number;
        left: number;
        right: number;
        bottom: number;
    }>();
    const onPaneClick = useCallback(() => setMenu(undefined), [setMenu]);

    const onNodeContextMenu = useCallback((event: ReactMouseEvent, node: IReactFlowNode) => {
            console.log('onNodeContextMenu', event, node)
            if (reactFlowWrapper?.current) {
                console.log('onNodeContextMenu', reactFlowWrapper.current)
                // Prevent native context menu from showing
                event.preventDefault();

                // Calculate position of the context menu. We want to make sure it
                // doesn't get positioned off-screen.
                const pane = reactFlowWrapper.current.getBoundingClientRect();
                const top = event.clientY < pane.height - 200 && event.clientY
                const left = event.clientX < pane.width - 200 && event.clientX
                const right = pane.width - event.clientX
                const bottom =  pane.height - event.clientY
                console.log('onNodeContextMenu', top, left, right, bottom)
                if (top && left && right && bottom) {
                    setMenu({
                        id: node.id,
                        top,
                        left,
                        right,
                        bottom,
                    });
                }
            }

        }, [setMenu, reactFlowWrapper]
    );
    return {onNodeContextMenu, onPaneClick, menu}
}
