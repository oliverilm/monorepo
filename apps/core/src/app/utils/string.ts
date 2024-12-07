export function slugifyString(str: string): string | undefined {
    return str.match(/[a-zA-Z0-9 ]/g)?.join("").split(" ").join("-")
}