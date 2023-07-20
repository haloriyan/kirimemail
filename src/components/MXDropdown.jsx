import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import theStyle from "./styles/MXDropdown.module.css";
import { FaAngleDown } from "react-icons/fa";

const defaultOptions = {
    with_search: false,
    multiple: false,
    label: null,
    key: 'name',
    placeholder: "Pilh Data :",
    child: null,
}

const InArray = (needle, haystack, isObject = false, key, source = 'none') => {
    if (isObject) {
        // let key = Object.keys(needle)[0];
        let isFound = false;
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i].hasOwnProperty(key) && haystack[i][key] === needle[key]) {
                isFound = i.toString();
            }
        }
        return isFound;
    } else {
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle) return true;
        }
        return false
    }
}

const MXDropdown = ({options, value, setValue, config = defaultOptions, style, inputStyle, input = null, onChange = null}) => {
    const [isOptionVisible, setOptionVisible] = useState(false);
    const [results, setResults] = useState(options);

    const handleClick = (e) => {
        let target = e.target;
        if (!target.classList.contains('InDropdownArea')) {
            setOptionVisible(false);
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [])

    // useEffect(() => {
    //     if (value === null) {
    //         setValue(options[0]);
    //     }
    // })

    const choose = item => {
        if (config.multiple) {
            let theValue = [...value];
            let hasSelected = InArray(item, theValue, true, config.key, 'action');
            if (hasSelected) {
                let position = parseInt(hasSelected);
                theValue.splice(position, 1);
            } else {
                theValue.push(item);
            }
            setValue(theValue);
        } else {
            setValue(item);
            setOptionVisible(false);
        }
        setResults(options);

        if (onChange !== null) {
            onChange(item);
        }
    }

    const search = q => {
        if (q !== "") {
            let sorted = [...options];
            let theResults = [];
            sorted.map((data, i) => {
                if (data[config.key].match(new RegExp(q+'.*', 'i')) !== null) {
                    theResults.push(data);
                }
                return data;
            });
            setResults(theResults);
        } else {
            setResults(options);
        }
    }

    return (
        <div className={`${theStyle.mx_dropdown} ${style} InDropdownArea`}>
            <div className={`${theStyle.flexing} ${theStyle.mx_input} ${inputStyle} InDropdownArea`} onClick={() => setOptionVisible(true)}>
                {
                    config.label !== null &&
                    <div className={`${theStyle.label}`}>{config.label}</div>
                }
                <div className={`${theStyle.input_value} ${inputStyle} InDropdownArea`}>{value === null || value.length === 0 ? config.placeholder : <div className="InDropdownArea">
                {
                    config.multiple ? 
                        <div className="flex row item-center InDropdownArea">
                            {
                                value.map((val, v) => {
                                    if (v < 2) {
                                        return (
                                            <div className="InDropdownArea text size-14">
                                                {typeof val === 'object' ? val[config.key] : val}
                                                {v !== value.length -1 && ", "}
                                            </div>
                                        )
                                    }
                                    return null;
                                })
                            }
                            {
                                value.length > 2 &&
                                <div className="InDropdownArea text size-14">
                                    &nbsp;+{value.length - 2}
                                </div>
                            }
                        </div>
                    :
                        input === null ?
                            typeof value === 'object' ? value[config.key] : value
                        :
                            input(value)
                }
                </div>}</div>
                <FaAngleDown onClick={() => setOptionVisible(!isOptionVisible)} />
            </div>
            {
                isOptionVisible &&
                <div className={theStyle.mx_option_area}>
                    {
                        config.with_search &&
                        <div className={`${theStyle.flexing} ${theStyle.search_input_area} InDropdownArea`}>
                            <input type="text" className={`${theStyle.search_input} InDropdownArea`} onInput={e => search(e.currentTarget.value)} />
                            <BiSearch className="InDropdownArea" />
                        </div>
                    }
                    <div className={theStyle.mx_option_area_scrollable}>
                        {
                            results.map((item, i) => {
                                let classes = `${theStyle.mx_option_item} InDropdownArea`;
                                let isActive = false;
                                if (typeof item === 'object') {
                                    if (
                                        (!config.multiple && value !== null && item[config.key] === value[config.key]) ||
                                        (config.multiple && InArray(item, value, true, config.key))
                                    ) {
                                        classes += ` ${theStyle.item_selected}`;
                                        isActive = true;
                                    }
                                } else {
                                    if (
                                        (!config.multiple && item === value) ||
                                        (config.multiple && InArray(item, value, true, config.key))
                                    ) {
                                        classes += ` ${theStyle.item_selected}`;
                                        isActive = true;
                                    }
                                }

                                if (config.child === null || typeof config.child === undefined || config.child === undefined) {
                                    return (
                                        <div key={i} className={classes} onClick={() => choose(item)}>
                                            {typeof item === 'object' ? item[config.key] : item}
                                        </div>
                                    )
                                } else {
                                    return config.child(item, choose, isActive);
                                }
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default MXDropdown;