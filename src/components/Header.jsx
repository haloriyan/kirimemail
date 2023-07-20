import { useState } from 'react';
import { BiSearch, BiStar, BiGroup, BiUser } from 'react-icons/bi';

import '../styles/Header.css';
import useSubmit from './Header/useSubmit';
import { HiOutlineTicket } from 'react-icons/hi';

const Header = ({user = null, SearchBar = false, color = 'bg-white'}) => {
    const [isProfileActive, setProfileActive] = useState(false);

    const tierColors = ['grey', 'red', 'yellow', 'green'];

    return (
        <>
            <div className={`Header flex row item-center pl-2 pr-2 ${color}`}>
                <a href="/">
                    <img src="/images/logo.png" alt="Logo Agendakota" className='h-40' />
                </a>
                {
                    SearchBar &&
                    <form action='/explore' className="bg-grey w-30 pl-2 pr-2 h-45 ml-2 rounded flex row item-center">
                        <input type="text" name='q' id='SearchInput' />
                        <button className='ml-1'>
                            <BiSearch />
                        </button>
                    </form>
                }
                <div className='flex row grow-1 item-center justify-end '>
                    <img 
                        src="https://agendakota.id/storage/profile_photos/sam.JPG" 
                        alt="Profile" 
                        className='rounded-max h-40 pointer'
                        onClick={() => setProfileActive(!isProfileActive)}
                    />
                </div>

                {
                    user !== null ?
                    <div className={`ProfileArea bordered p-4 ${isProfileActive ? 'active' : ''}`}>
                        <div className="flex row">
                            <img 
                                src="https://agendakota.id/storage/profile_photos/sam.JPG" 
                                alt="Profile Pict Big" 
                                className='h-80 rounded-max'
                            />
                            <div className="flex column grow-1 ml-2">
                                <div className="text bold">{user.name}</div>
                                <div className="flex row mt-1">
                                    <div className={`p-05 pl-2 pr-2 text small mr-1 bg-${tierColors[user.package_id - 1]}`}>
                                        Premium
                                    </div>
                                    <a href='/upgrade' className="text small red mt-05 mr-1">Upgrade</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex row mt-3">
                            <a href='/events' className="bordered rounded p-1 flex row grow-1 item-center mr-1 basis-2 text black">
                                <BiStar size={18} />
                                <div className="text ml-1 small">Events</div>
                            </a>
                            <a href='/profile' className="bordered rounded p-1 flex row grow-1 item-center ml-1 basis-2 text black">
                                <BiUser size={18} />
                                <div className="text ml-1 small">Profile</div>
                            </a>
                        </div>
                        <div className="flex row mt-1">
                            <a href='/tickets' className="bordered rounded p-1 flex row grow-1 item-center mr-1 basis-2 text black">
                                <HiOutlineTicket size={18} />
                                <div className="text ml-1 small">Tickets</div>
                            </a>
                            <a href='/connections' className="bordered rounded p-1 flex row grow-1 item-center ml-1 basis-2 text black">
                                <BiGroup size={18} />
                                <div className="text ml-1 small">Connection</div>
                            </a>
                        </div>

                        <div className="mt-3 mb-3">
                            <hr size={1} color={'#ddd'} />
                        </div>

                        <a href="/organizer/switch">
                            <div className="pointer bg-primary rounded h-40 text small flex item-center justify-center">
                                Switch to Organizer
                            </div>
                        </a>
                    </div>
                    :
                    <div className={`ProfileArea bordered p-4 ${isProfileActive ? 'active' : ''}`}>
                        <a href="/login">
                            <div className="bg-primary text small center rounded pointer p-1">
                                Login
                            </div>
                        </a>
                        <a href="/register">
                            <div className="mt-1 border primary text small center rounded pointer p-1">
                                Register
                            </div>
                        </a>
                    </div>
                }
            </div>
        </>
    )
}

export {
    Header, useSubmit
}
export default Header;