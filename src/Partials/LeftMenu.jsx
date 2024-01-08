import { BiSolidEdit, BiSolidInbox, BiLogOut } from "react-icons/bi";
import styles from "./styles/LeftMenu.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LeftMenu = ({active, enctype = 'RC4', setEnctype = null}) => {
    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const [isLoading, setLoading] = useState(true);

    const changeKey = newKey => {
        setKey(newKey);
        window.localStorage.setItem('encryption_key', newKey);
    }

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            let k = window.localStorage.getItem('encryption_key');
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
                    {
                        setEnctype !== null &&
                        <div className="group">
                            <select name="enctype" id="enctype" onChange={e => {
                                let val = e.currentTarget.value;
                                setEnctype(val);
                                window.localStorage.setItem('encryption_type', val);
                                window.location.reload()
                            }}>
                                <option selected={enctype === 'aes'} value="aes">AES</option>
                                <option selected={enctype === 'rc4'} value="rc4">RC4</option>
                                <option selected={enctype === 'aesrc4'} value="aesrc4">AES + RC4</option>
                            </select>
                            <label htmlFor="key" className="active">Tipe Enkripsi :</label>
                        </div>
                    }
                    <div className="group">
                        <input type="text" id="key" value={key} onInput={e => changeKey(e.currentTarget.value)} onChange={e => changeKey(e.currentTarget.value)} />
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