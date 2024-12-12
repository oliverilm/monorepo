import { NationalId, NationalIDUtils } from "@monorepo/utilities";

export const monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
export const ID_OPTIONS = [{
    label: "Estonian ID",
    value: NationalId.Est
},
{
    label: "Finland ID",
    value: NationalId.Fin
}]
const YOUNGEST_YEAR = new Date().getFullYear() - 13
export const years = new Array(85).fill("").map((_, i) => (YOUNGEST_YEAR - i).toString())

export interface UserForm {
    firstName: string
    lastName: string
    nationalId: string
    day: string
    month: string
    year: string
    nationalIdType: NationalId
}

export function idValidator(value: string, type: NationalId): string | null {
    try {
        if (type === "estid") {
            const result = NationalIDUtils.parseEstonianIdCode(value)
            if (result) return null
            return "Invalid Estonian ID"
        }
        if (type === "finid") {
            const result = NationalIDUtils.parseFinnishIdCode(value)
            if (result) return null
            return "Invalid Finnish ID"
        }
        return "Unknown id type"
    } catch (e) {
        return (e as Error).message
    }
}
