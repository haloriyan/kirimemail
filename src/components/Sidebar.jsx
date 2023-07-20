import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiStar, BiUser } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';

import '../styles/Sidebar.css';
import axios from "axios";
import config from "../config";

const Sidebar = ({active = 'home', parent = null, user = null}) => {
    const [isActive, setActive] = useState(false);
    const [organizers, setOrganizers] = useState([]);
    const [booths, setBooths] = useState([]);
    const [isLoadingOrganizer, setLoadingOrganizer] = useState(true);
    const [isLoadingBooth, setLoadingBooth] = useState(true);

    const { org_username } = useParams();

    useEffect(() => {
        if (isLoadingOrganizer && user !== null) {
            setLoadingOrganizer(false);
            axios.post(`${config.baseUrl}/api/user/organizer`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setOrganizers(res.organizers);
            })
        }
    }, [isLoadingOrganizer, user])

    useEffect(() => {
        if (isLoadingBooth && user !== null) {
            setLoadingBooth(false);
            axios.post(`${config.baseUrl}/api/user/booth`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setBooths(res.booths);
            })
        }
    }, [isLoadingBooth, user])

    return (
        <>
            <div className={`Sidebar flex column ${isActive ? 'active' : ''}`}>
                <div className="SidebarToggler" onClick={() => setActive(!isActive)}>
                    <div className="inner"></div>
                </div>
                <div className="flex column grow-1">
                    <a href="/events">
                        <li className={`MenuItem flex row item-center ${active === 'events' ? 'active' : ''}`}><BiStar size={18} className="icon" /> Events</li>
                    </a>
                    <a href="/tickets">
                        <li className={`MenuItem flex row item-center ${active === 'tickets' ? 'active' : ''}`}><HiOutlineTicket size={18} className="icon" /> Tickets</li>
                    </a>
                    <a href="/profile">
                        <li className={`MenuItem flex row item-center ${active === 'profile' ? 'active' : ''}`}><BiUser size={18} className="icon" /> Profile</li>
                    </a>

                    {
                        user !== null &&
                        <div className="border-top pt-2 mt-2">
                            {
                                booths.length > 0 &&
                                <div>
                                    <div className="text small muted">Booth</div>
                                    {
                                        booths.map((booth, b) => (
                                            <a href={`/booth/${booth.id}`} className="flex row item-center mt-2" key={b}>
                                                <img 
                                                    src={`${config.baseUrl}/storage/event/${booth.event_id}/booth_logos/${booth.logo}`} 
                                                    alt={booth.name}
                                                    className='h-30 rounded-max' 
                                                />
                                                <div className="text small ml-2">
                                                    {booth.name}
                                                </div>
                                            </a>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    }

                    {
                        user !== null &&
                        <div className="border-top pt-2 mt-2">
                            <div className="text small muted">Organizer</div>
                            {
                                organizers.length > 0 &&
                                organizers.map((organizer, o) => (
                                    <a 
                                        key={o}
                                        href={`/organizer/${organizer.username}`} 
                                        className={`flex row item-center h-50 ${organizer.username === org_username ? 'bg-primary transparent pl-2 pr-2 rounded' : ''}`}
                                    >
                                        <img 
                                            src={
                                                organizer.icon === null ?
                                                    '/images/default_organizer_logo.png'
                                                :
                                                    `${config.baseUrl}/storage/organizer_icons/${organizer.icon}`
                                            } 
                                            alt={organizer.name}
                                            className='h-30 rounded-max' 
                                        />
                                        <div className="text small ml-2">
                                            {organizer.name}
                                        </div>
                                    </a>
                                ))
                            }
                        </div>
                    }

                    <a href="/organizer/create">
                        <div className="w-100 mt-2 primary text border flex row item-center justify-center pointer h-40 small rounded">
                            Buat Organizer
                        </div>
                    </a>

                    {/* <a href="/settings">
                        <li className={`MenuItem HasSub flex row item-center ${parent === 'settings' ? 'active' : ''}`}>
                            <BiCog size={18} className="icon" />
                            <div className="flex grow-1">Pengaturan</div>
                            <BiChevronDown />
                            <ul>
                                <a href="/bot/personalize">
                                    <li className={`MenuItem flex row item-center ${active === 'personalize-bot' ? 'active' : ''}`}>
                                        Umum
                                    </li>
                                </a>
                                <a href="/settings/custom-field">
                                    <li className={`MenuItem flex row item-center ${active === 'custom-field' ? 'active' : ''}`}>
                                        Custom Field Customer
                                    </li>
                                </a>
                            </ul>
                        </li>
                    </a> */}
                </div>

                <div className="border-top pt-2 flex row wrap">
                    <a href="https://company.agendakota.id" className="text small muted flex grow-1">
                        Bantuan
                    </a>
                    <a href="https://company.agendakota.id" className="text small muted flex grow-1">
                        Panduan
                    </a>
                    <a href="https://company.agendakota.id" className="text small muted flex grow-1">
                        Blog
                    </a>
                </div>
            </div>
        </>
    )
}

export default Sidebar;