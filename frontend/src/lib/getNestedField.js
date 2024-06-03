function getValue(obj, nestedField) {
    if (typeof obj === 'undefined' || obj === null) return "Not found";
    if (!nestedField) return obj;
    const properties = nestedField.split('.');
    return getValue(obj[properties.shift()], properties.join('.'))
}

export default getValue;