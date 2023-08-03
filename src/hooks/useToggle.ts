import {useState} from "react";

export const useToggle = (props?: {
    initialState?: boolean
}) => {
    const [isShow, setIsShow] = useState(props?.initialState || false)

    const close = () => {
        setIsShow(false)
    }
    const open = () => {
        setIsShow(true)
    }
    const toggle = () => {
        setIsShow(prevState => !prevState)
    }

    return {
        isExpanded: isShow,
        close,
        open,
        toggle,
    }
}
