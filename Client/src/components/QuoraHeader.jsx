import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "./css/QuoraHeader.css";
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { BsPatchQuestionFill, BsPeople } from 'react-icons/bs';
import { RxAvatar } from "react-icons/rx";
import { MdExpandMore, MdOutlineFeaturedPlayList, MdAssignmentTurnedIn, MdPeopleAlt, MdOutlineNotifications } from 'react-icons/md';
import axios from 'axios';
import { signOut } from "firebase/auth"
import { auth } from '../firebase';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from '../feature/userSlice';





/** Quora Navbar*/
const QuoraHeader = () => {
    const dispatch = useDispatch()
    const handelLogout = () => {
        if (window.confirm("Are you sure to logout ?")) {
            signOut(auth)
                .then(() => {
                    dispatch(logout())
                    console.log("logOut")
                }).catch((e) => console.log("Err in logout", e))
        }
    }
    return (
        <div className='qHeader'>
            <div> <Logo /></div>
            <div>  <Icon /></div>
            <div><Search /></div>
            <div onClick={handelLogout}> <Avatar /></div>
            <div>
                <AddQuestion />
            </div>

        </div>
    )
}


/**Navbar Logo */
const Logo = () => {
    return (<div className="qHeader__logo">
        <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
        />
    </div>)
};

/**Navbar icons
 * 1.Home
 * 2.Playlist
 * 3.Pepole
 * Notification
 */

const Icon = () => {
    return (<div className='qHeader__icons'>
        <div className="qHeader__icon"><AiFillHome /></div>
        <div className="qHeader__icon"><MdOutlineFeaturedPlayList /></div>
        <div className="qHeader__icon"><MdAssignmentTurnedIn /></div>
        <div className="qHeader__icon"><MdPeopleAlt /></div>
        <div className="qHeader__icon"><MdOutlineNotifications /></div>
    </div>)
}
/** NavbarUser Avatar
 */

export const Avatar = () => {
    const user = useSelector(selectUser)
    return (
        <div className="qHeader__rem avatar">
            <span className='qHeader__avatar'>{user ? <img src={user?.photo} className='avatar__img' /> : <RxAvatar />}</span>


        </div>
    )
}

/** Navbar Search Button */
const Search = () => {
    return (<div className="qHeader__input">
        <AiOutlineSearch />
        <input type="text" placeholder='Seach questions' />
    </div>)
}

/**Navbar New Question add Button */

const AddQuestion = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputurl, setInputurl] = useState("");
    const [question, setQuestion] = useState("");

    const handleSubmit = async () => {

        if (question !== "") {

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = {
                questionName: question,
                questionUrl: inputurl,
                user: user
            };
            await axios
                .post("/api/questions", body, config)
                .then((res) => {
                    alert(res.data.message);
                    window.location.href = "/";
                    setIsModalOpen(false);
                })
                .catch((e) => {
                    console.log(e);
                    alert("Error in adding question");
                });

        }

    };
    return (
        <div className='qHeaderButton'>
            { }
            <Button onClick={() => setIsModalOpen(true)}>
                Add Question
            </Button>

            <Modal
                open={isModalOpen}

                onClose={() => setIsModalOpen(false)}
                closeOnEsc
                center
                closeOnOverlayClick={false}
                styles={{
                    overlay: {
                        height: "auto",

                    }
                }}
            >
                <div className='modal_box'>
                    <div className="modal__title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>
                    <div className="modal__info">
                        <Avatar className="avatar" />
                        <div className="modal__scope">
                            <p><BsPeople /></p>
                            <p>Public</p>
                            <p><MdExpandMore /></p>
                        </div>
                    </div>
                    <div className="modal__Field">
                        <input
                            onChange={(e) => {
                                setQuestion(e.target.value)
                            }}
                            value={question}
                            type=" text"
                            placeholder="Start your question with 'What', 'How', 'Why', etc. "
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <input
                                type="text"
                                value={inputurl}
                                onChange={(e) => setInputurl(e.target.value)}
                                style={{
                                    margin: "5px 0",
                                    border: "1px solid lightgray",
                                    padding: "10px",
                                    outline: "2px solid #000",
                                }}
                                placeholder="Optional: inclue a link that gives context"
                            />
                            {inputurl !== "" && <img style={{
                                height: "40vh",
                                objectFit: "contain"
                            }} src={inputurl} alt="image not found" />}


                        </div>
                    </div>
                    <div className="modal__buttons">
                        <button className="cancle" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button type='submit' className='add' onClick={handleSubmit}>
                            Add Question
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}




export default QuoraHeader;