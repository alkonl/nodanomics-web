import {useState} from "react";

export const useSimplePopUpManager = (props?:{
    initialState?: boolean
                                      }) => {
    const [isPopUpShow, setIsPopUpShow] = useState(props?.initialState || false)

    const closePopUp = () => {
        setIsPopUpShow(false)
    }
    const openPopUp = () => {
        setIsPopUpShow(true)
    }
    return {
        isPopUpShow,
        closePopUp,
        openPopUp,
    }
}
