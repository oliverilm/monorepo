export function slugifyString(str: string): string {
    return str.match(/[a-zA-Z0-9 ]/g).join("").split(" ").join("-")
}