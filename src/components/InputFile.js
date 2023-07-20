import InArray from "./InArray";

const getExtension = (name) => {
    let n = name.split('.');
    return n[n.length - 1].toLowerCase();
}

const imageExtensions = ['png','jpg','bmp','gif','jpeg'];

const InputFile = (event, preview, callback = null, removeInput = true, props = {}) => {
    let input = event.currentTarget;
    let file = input.files[0];
    let prevArea = document.querySelector(`${preview}`);

    if (InArray(getExtension(file.name), imageExtensions)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', e => {
            prevArea.style.backgroundImage = `url(\'${reader.result}\')`;
            prevArea.style.backgroundPosition = 'center center';
            prevArea.style.backgroundSize = 'cover';
            prevArea.innerHTML = "";
        });
    } else {
        prevArea.style.background = "none";
        // prevArea.style.border = "1px solid #ddd";
        prevArea.innerHTML = file.name;
    }

    if (props.onRead !== undefined) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        props.onRead(reader);
        reader.onload = function () {
            props.onRead(reader);
        }
    }

    if (callback !== null) {
        callback();
    }

    if (removeInput) {
        input.setAttribute('disabled', 'disabled');
    }
}

export default InputFile;