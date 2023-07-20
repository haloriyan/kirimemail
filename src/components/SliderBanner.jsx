import React, { useEffect, useState } from "react";
import config from "../config";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import theStyle from "./styles/SlideBanner.module.css";

const SliderBanner = ({datas}) => {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        if (index === datas.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

    const prevSlide = () => {
        if (index !== 0) {
            setIndex(index - 1);
        }
    }

    useEffect(() => {
        let intervalId = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(intervalId);
    });

    return (
        <div>
            {
                datas.map((data, d) => {
                    if (d === index) {
                        return (
                            <a href={data.link} className="w-100 bg-grey ratio-5-2">
                                <img 
                                    src={`${config.baseUrl}/storage/banner_images/${data.image}`} alt={`Slide ${d}`} 
                                    className="w-100 bg-grey ratio-5-2 rounded-more"
                                />
                            </a>
                        )
                    }
                    return null;
                })
            }

            <div className={`${theStyle.SlideControl} absolute hover-to-show pointer left-5 bg-white transparent h-50 ratio-1-1 rounded-max flex row item-center justify-center`} onClick={() => prevSlide()}>
                <FaAngleLeft />
            </div>
            <div className={`${theStyle.SlideControl} absolute hover-to-show pointer right-5 bg-white transparent h-50 ratio-1-1 rounded-max flex row item-center justify-center`} onClick={() => nextSlide()}>
                <FaAngleRight />
            </div>

            <div className="absolute bottom-0 mb-05 rounded-bottom-left rounded-bottom-right left-0 right-0 h-40 flex row item-center justify-center gap-10" style={{backgroundColor: '#00000030'}}>
                {
                    datas.map((data, d) => (
                        <div 
                            className={`rounded-max pointer h-10 ${d !== index ? 'border border-2 white ratio-1-1' : 'bg-white ratio-5-2'}`}
                            onClick={e => {
                                setIndex(d);
                            }}
                        >
                            &nbsp;
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SliderBanner;