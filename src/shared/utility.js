export const updateObject = (oldObj, newObj) => {
    return {
        ...oldObj,
        ...newObj
    };
}

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
};