import moment from "moment";
import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import Initial from "../components/Initial";

const HeadNavigation = ({right = null, title = null, middle = null, date, backTo = "/inbox", from = ''}) => {
    return (
        <nav className="HeadNavigation fixed left-20 right-0 pr-4 flex row item-center h-70 gap-20 index-4 bg-white" style={{top: 70}}>
            <a href={backTo}>
                <BiLeftArrowAlt size={28} color="#333" />
            </a>
            {
                middle === null ?
                <h3 className="m-0 flex grow-1">{title}</h3>
                : middle
            }
            {
                right === null ?
                <div className="flex row item-center gap-10">
                    <div className="h-40 ratio-1-1 rounded-max bg-gold flex centerize text bold size-14">{from === '' ? '' : Initial(from)}</div>
                    <div className="flex column">
                        <div className="text size-12">{from}</div>
                        <div className="text size-12 muted">
                            {moment(date).format('DD MMM, HH::mm')}
                        </div>
                    </div>
                </div>
                :right
            }
        </nav>
    )
}

export default HeadNavigation;