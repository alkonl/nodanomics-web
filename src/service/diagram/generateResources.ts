import {nanoid} from "nanoid";
import {IResource} from "../../interface";

const genResourceId = () => `resource_${nanoid()}}`

export const generateResource = (countOfResource: number): IResource=>{
    return {
        value: countOfResource,
    }
}
