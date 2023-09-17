import {IBrand, IType} from "../types";

interface Result {
    label: string;
    value: string
}

export const toSelectType = (arr: IType[] | IBrand[] | undefined) => {
    let result: Result[] = []

    if (arr) {
        arr.map(item =>
            result.push({label: item.name, value: item.name})
        )
    }

    return result
}