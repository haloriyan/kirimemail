const getFromPayloads = (key, payloads) => {
    let toReturn = null;
    payloads.map((load, l) => {
        if (load.name.toLowerCase() == key.toLowerCase()) {
            toReturn = load.value;
        }
    });
    return toReturn;
}

export default getFromPayloads;