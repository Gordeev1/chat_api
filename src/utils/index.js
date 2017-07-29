export const getRoomKey = payload => {

    if (!payload || !payload.type) {
        throw new Error('room type is required');
    }

    const { type, id } = payload;

    let key = type.toUpperCase();

    if (id) {
        key += `_${id}`;
    }

    return key;
}