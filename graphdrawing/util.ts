export const parseSafe = (serialized: string) => {
    try {
        return JSON.parse(serialized)
    } catch(e) {
        return null
    }
}