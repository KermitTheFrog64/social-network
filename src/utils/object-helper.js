export const updateObjectInArray = (items, itemId, onjPropName, mewObjProps) => {
    return items.map(u => {
        if (u[onjPropName] === itemId) {
            return { ...u, ...mewObjProps }
        }
        return u
    })
}