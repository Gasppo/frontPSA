import { useEffect } from "react"

const useIsDirty = (modifiableData: any, cleanData: any, callBack: (value: boolean) => void) => {

    useEffect(() => {
        const isDirty = JSON.stringify(modifiableData) !== JSON.stringify(cleanData)
        callBack(isDirty)
    }, [modifiableData, cleanData, callBack])

}

export default useIsDirty