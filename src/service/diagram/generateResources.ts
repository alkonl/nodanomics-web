import {nanoid} from "nanoid";

const genResourceId = () => `resource_${nanoid()}}`

export const generateResourceFromSource = (countOfResource: number) => Array(countOfResource).fill(0).map(() => ({
    color: 'red',
    id: genResourceId(),
}));
