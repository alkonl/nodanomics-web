import React, {createContext, RefObject, useReducer} from "react";
// eslint-disable-next-line import/named
import {ReactFlowInstance} from "reactflow";


interface IReactFlowInstance {
    reactFlowInstance?: ReactFlowInstance
    reactFlowWrapper?: RefObject<HTMLDivElement>
}

interface IReactFlowInstanceContext {
    data: IReactFlowInstance
    actions: {
        setReactFlowInstanceAndWrapper: (payload: IReactFlowInstance) => void
    }
}

export enum EReactFlowInstanceAction {
    setReactFlowInstanceAndWrapper = "setReactFlowInstanceAndWrapper",
}

interface IReactFlowInstanceActionPayload {
    payload: IReactFlowInstance
    type: EReactFlowInstanceAction.setReactFlowInstanceAndWrapper
}

type IReactFlowInstanceAction = IReactFlowInstanceActionPayload

const reactFlowInstanceReducer = (state: IReactFlowInstance, action: IReactFlowInstanceAction): IReactFlowInstance => {
    const {type, payload} = action;

    switch (type) {
        case "setReactFlowInstanceAndWrapper":
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
};

const ReactFlowInstanceContext = createContext<undefined | IReactFlowInstanceContext>(undefined)

export const useReactFlowInstance = () => {
    const context = React.useContext(ReactFlowInstanceContext);
    if (context === undefined) {
        throw new Error(
            "useReactFlowInstance must be used within a ReactFlowInstanceProvider"
        );
    }
    return context;
}


export const ReactFlowInstanceProvider = ({children}: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reactFlowInstanceReducer, {});

    const setReactFlowInstanceAndWrapper = (payload: IReactFlowInstance) => {
        dispatch({
            type: EReactFlowInstanceAction.setReactFlowInstanceAndWrapper,
            payload,
        });
    }

    return (
        <ReactFlowInstanceContext.Provider
            value={{
                data: state,
                actions: {
                    setReactFlowInstanceAndWrapper,
                },
            }}
        >
            {children}
        </ReactFlowInstanceContext.Provider>
    );
};

