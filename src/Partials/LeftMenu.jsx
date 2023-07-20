import { BiSolidEdit, BiSolidInbox, BiLogOut } from "react-icons/bi";
import styles from "./styles/LeftMenu.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LeftMenu = ({active}) => {
    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            let k = window.localStorage.getItem('encryption_key');
            console.log(k);
            setKey(window.localStorage.getItem('encryption_key'));
        }
    }, [isLoading]);

    const loggingOut = () => {
        window.localStorage.removeItem('google_access_token');
        navigate('/login');
    }

    return (
        <nav className={`${styles.LeftMenu} fixed left-0 bottom-0 w-20 p-2 flex column`}>
            <div className="flex column grow-1">
                <a href="/compose" className={`${styles.MenuItem} rounded-max flex row item-center h-50 gap-20 ${active === 'compose' ? styles.ItemActive : ''}`}>
                    <BiSolidEdit />
                    <div>Tulis Pesan</div>
                </a>
                <a href="/inbox" className={`${styles.MenuItem} rounded-max flex row item-center h-50 gap-20 ${active === 'inbox' ? styles.ItemActive : ''}`}>
                    <BiSolidInbox />
                    <div>Kotak Masuk</div>
                </a>

                <div className="p-2">
                    <div className="group">
                        <input type="text" id="key" value={key} />
                        <label htmlFor="key">Kunci Enkripsi :</label>
                    </div>
                </div>
            </div>
            <div className={`${styles.MenuItem} pointer rounded-max flex row item-center h-50 gap-20 text red`} onClick={loggingOut}>
                <BiLogOut />
                <div>Logout</div>
            </div>
        </nav>
    )
}

export default LeftMenu