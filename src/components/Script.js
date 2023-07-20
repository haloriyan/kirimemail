const Script = (...attributes) => {
    let obj = {
        dom: document.createElement('script'),
    };
    obj.src = (source) => {
        obj.dom.src = source;
        for (let i = 0; i < attributes.length; i++) {
            obj.dom.setAttribute(attributes[i], true);
        }
        document.body.appendChild(obj.dom);
        return obj;
    }
    obj.eject = () => {
        document.body.removeChild(obj.dom);
    }

    return obj;
}

export default Script;