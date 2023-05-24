import React, { useEffect, useState } from 'react';
import "./css/Feed.css";
import { Avatar } from './QuoraHeader';
import { RxThickArrowDown, RxThickArrowUp } from "react-icons/rx";
import { TbMessageCircle2 } from "react-icons/tb";
import { TiArrowSync } from "react-icons/ti";
import { HiOutlineShare, HiDotsHorizontal } from "react-icons/hi";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactHtmlParser from "html-react-parser";
import { useSelector } from 'react-redux';
import { selectUser } from '../feature/userSlice';

const TimeStamp = (date) => {
  let dt = new Date(date);
  console.log(dt)
  TimeAgo.addDefaultLocale(en)
  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US')
  // "1 minute ago"
  let time = timeAgo.format(dt - 60 * 1000, 'mini')

  return (<>{time}</>)
}


const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/questions")
      .then((res) => {
        console.log(res.data.reverse());
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className='feed'>
      <QuoraBox />

      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}

    </div>
  )
}


function QuoraBox() {

  return (
    <div className='quoraBox'>
      <div className='quoraBox-info'>
        <Avatar />
      </div>
      <div className='quoraBox__quora'>
        <h5>What is Your Question or link ?</h5>
      </div>
    </div>
  )
}




function Post({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const user = useSelector(selectUser);

  const handelQuill = (value) => {
    setAnswer(value);
  }
  const handelSubmit = async () => {

    if (post?._id && answer !== "") {
      const body = {
        answer: answer,
        questionId: post._id,
        user: user,
      }

      const config = {
        headers: {
          "Contenct-Type": "aplication/json"
        }
      }

      await axios.post("/api/answers", body, config)
        .then(() => {
          alert("Answer aded sucessfully");
          setIsModalOpen(false);
          window.location.href = "/"
        }).catch((e) => console.log(e));

    }
  }
  return (
    <div className='post'>

      <div className='post__info'>
        <Avatar />
        <h4>{user?.userName}</h4>
        <small>{TimeStamp(post?.createdAt)}</small>
      </div>

      <div className='post__body'>
        <div className='post__question'>
          <p>{post?.questionName}</p>
          <button className='post__btnAnswer' onClick={() => setIsModalOpen(true)}>Answer</button>
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
            <div className='modal__question'>
              <h1>{post?.questionName}</h1>
              <p>
                asked by {" "} <span className='name'>{user?.userName}</span> on

                <span className='name'> {new Date(post?.createdAt).toLocaleString()}</span>

              </p>

            </div>
            <div className='modal__answer' style={{ marginBottom: "10px", }}>
              <ReactQuill value={answer} placeholder='Enter your answer' onChange={handelQuill} />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="add" onClick={handelSubmit}>
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        {post.questionUrl !== "" && <img src={post.questionUrl} />}
      </div>

      <div className='post__footer'>
        <div className='post__footerAction'>
          <RxThickArrowUp />
          <RxThickArrowDown />
        </div>
        <div className='post__footerActionmiddle' >
          <TbMessageCircle2 />
          <TiArrowSync />
        </div>

        <div className='post__footerLeft'>
          <HiOutlineShare />
          <br></br>
          <HiDotsHorizontal />
        </div>
      </div>

      <p style={{
        color: "rgb(0,0,0)",
        fontSize: "12px",
        fontWeight: "bold",
        margin: "1rem 0rem"

      }}
      >{post?.allAnswers.length} Answer(s)</p>

      {post?.allAnswers?.map((_a) => (
        <>
          <div style={{
            margin: "5px 0px 0px 0px",
            padding: "5px 0px 0px 20px",
            borderTop: "1px solid lightgray"
          }} className='post__answer'>

            <div style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "0.7rem  0.5rem",
              borderTop: "1px solid lightgray",
            }} className='post-answer-container'>

              <div style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",

              }} className='post__answered'>

                <div className='post__info'>
                  <Avatar />
                  <h4>{_a.user?.userName}</h4>
                  <small>{TimeStamp(_a.createdAt)}</small>
                </div>
                <div style={{
                  fontWeight: 600,
                  color: "#888",
                }} className='post-answer'>
                  {ReactHtmlParser(_a?.answer)}
                </div>

              </div>
            </div>
          </div>
        </>

      ))}

    </div>
  )

}






export default Feed
