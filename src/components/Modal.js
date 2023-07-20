
const Modal = (sel = '') => {
    let selector = typeof sel == 'string' ? document.querySelector(`.modal${sel}`) : sel;
    selector.show = () => {
        selector.style.display = "flex";
    }
    selector.hide = () => {
        if (typeof sel != 'string') {
            selector = selector.parentNode.parentNode.parentNode;
        }
        selector.style.display = "none";
    }
    selector.hideAll = (force = false) => {
        document.querySelectorAll(".modal").forEach(mod => {
            if (force) {
                Modal(`#${mod.getAttribute('id')}`).hide();
            } else {
                if (!mod.classList.contains('nox')) {
                    Modal(`#${mod.getAttribute('id')}`).hide();
                }
            }
        });
    }
    return selector;
}

let keyboards = {
    Escape: () => {
        Modal().hideAll();
    },
};
// document.addEventListener('keydown', e => {
//     if (keyboards.hasOwnProperty(e.key)) {
//         keyboards[e.key]();
//     }
// });

export default Modal;