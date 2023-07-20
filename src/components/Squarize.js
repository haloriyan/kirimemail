const Squarize = () => {
    let doms = document.querySelectorAll(".squarize");
    doms.forEach(dom => {
        let classes = dom.classList;
        let computedStyle = getComputedStyle(dom);
        if (classes.contains('rectangle')) {
            let width = computedStyle.width.split("px")[0];
            let widthRatio = parseFloat(width) / 16;
            let setHeight = 9 * widthRatio;
            dom.style.height = `${setHeight}px`;
        } else {
            if (classes.contains('use-lineHeight')) {
                dom.style.lineHeight = computedStyle.width;
            } else if (classes.contains('use-height')) {
                dom.style.width = computedStyle.height;
            } else {
                dom.style.height = computedStyle.width;
            }
        }
    });
}

export default Squarize