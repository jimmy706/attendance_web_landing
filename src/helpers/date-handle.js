export function getDay(day = 1) {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + day)

    return tomorrow;
}