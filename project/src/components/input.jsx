import {React, useContext, useState} from 'react'
import Img from '../images/img.png'
import Attach from '../images/attach.png'
import {AuthContext} from "../context/AuthContext"
import { ChatContext } from '../context/ChatContext'
import { arrayUnion, updateDoc, doc, Timestamp, serverTimestamp } from 'firebase/firestore'
import {v4 as uuid} from "uuid"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import cyno from "../images/cyno.jpg"

const Input = () => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const [queue, setQueue] = useState(false)
  // const [qImg, setQImg] = useState(null)
  const {currentUser} =useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const image = null;
  // const [loading, setLoading] = useState(false);
  const handleQueue = (imgURL) =>{
    // var element = document.getElementById("input");
    // element.classList.toggle("queue--show");
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = document.getElementById("queue");
      img.src = e.target.result;
    };
    reader.readAsDataURL(imgURL);
  }
  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      e.preventDefault()
      handleSend()
    }
  }
  const handleZoomImg = (e) => {
    e.target.classList.toggle("imgQueue--zoom")
  }
  const reset = () => {
    var element = document.getElementById("file");
    element.value = "";
    setQueue(false)
  }
  const handleSend = async()=>{
    var element = document.getElementById("input");
    element.classList.remove("queue--show");
    setText("")
    if(img){
      setQueue(false)
      // setLoading(true);
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      })
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db,"userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
    await updateDoc(doc(db,"userChats", data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
    // await updateDoc(doc(db,"userChats",currentUser.uid),{
    //   [data.chatId+".lastMessage"]:{
    //     text
    //   },
    //   [data.chatId+".data"]: serverTimestamp()
    // })
    // await updateDoc(doc(db,"userChats",data.user.uid),{
    //   [data.chatId+".lastMessage"]:{
    //     text
    //   },
    //   [data.chatId+".data"]: serverTimestamp()
    // })
  }
  return (
    <div className='input' id='input'>
      {/* {loading && <span className="loader"></span>} */}
      {/* <div className="messageInput"> */}
      {queue &&
      <div className='queueContain'>
        < img className="queueImg" id='queue' onClick={handleZoomImg} src="" alt="" />
        <div className="gg-close-o" onClick={reset}></div>
      </div>}
      <div className='inputField'>
        <input id='input' type="text" placeholder='Message' autoComplete="off" onKeyDown={handleKeyDown} onChange={e=>setText(e.target.value)} value={text}/>
        <div className="send">
          <img src={Attach} alt="" />
          <input type="file" style={{display:"none"}} id="file" onChange={e=>{setImg(e.target.files[0]); setQueue(true); handleQueue(e.target.files[0])}}/>
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default Input