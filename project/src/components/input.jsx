import {React, useContext, useEffect, useState, useRef, useLayoutEffect} from 'react'
import Img from '../images/img.png'
import {AuthContext} from "../context/AuthContext"
import { ChatContext } from '../context/ChatContext'
import { arrayUnion, updateDoc, doc, Timestamp, serverTimestamp, getDoc } from 'firebase/firestore'
import {v4 as uuid} from "uuid"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

const Input = () => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const [queue, setQueue] = useState(false)
  // const [enter, setEnter] = useState(false)
  // const [qImg, setQImg] = useState(null)
  const {currentUser} =useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const image = null;
  const [enter, setEnter] = useState(false)
  // const [loading, setLoading] = useState(false);
  const handleQueue = (imgURL) =>{
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = document.getElementById("queue");
      img.src = e.target.result;
    };
    reader.readAsDataURL(imgURL);
  }
  
  // close img in queue (when press x)
  const reset = () => {
    var element = document.getElementById("file");
    element.value = "";
    setQueue(false)
    setImg(null);
  }
  const handleKeyDown = (e) => {
    if(e.key === "Enter"){  
      e.preventDefault()
      handleSend()
    }
  }

    // Get country from firestore
    const [textTranslated, setTextTranslated] = useState("")
    const [country, setCountry] = useState("")
    const getData = async (user, setCountry) => {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);
      setCountry(docSnap.data().country)
    }
    getData(currentUser.uid, setCountry);
    const userID = currentUser.uid;
    const chatID = data.chatId;
    let userID_re = chatID.replace(userID, "");
    const [country_re, setCountry_re] = useState("");
    getData(userID_re, setCountry_re);
    // console.log(country);
    const handleTranslate = async (text, country, country_re) => {
      if (text !== "" && country!==country_re){
        let urlAPI = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${country}|${country_re}`;
        await fetch(urlAPI)
            .then((response) => response.json())
            .then((data) => {          
                setTextTranslated(data.responseData.translatedText);
            })
            .catch((error) => {
              console.log(error);
            });
      } else {
        setTextTranslated(text);
      }
      
    }
  const handleZoomImg = (e) => {
    e.target.classList.toggle("imgQueue--zoom")
  }
  useEffect(() => {
    handleTranslate(text,country,country_re);
    // setTextTranslated(textTranslated);
   }, [text])
  const handleSend = async()=>{
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
              textTranslated: textTranslated,
            }),
          });
        });
        setImg(null)
      })
    } else 
      if(text!==""){
      // console.log(textTranslated);
    // console.log(txtTranslated.current);

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          textTranslated: textTranslated,
        }),
      });
    }else{
      return
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
          {/* <img src={Attach} alt="" /> */}
          <input type="file" style={{display:"none"}} id="file" onChange={e=>{setImg(e.target.files[0]); setQueue(true); handleQueue(e.target.files[0])}}/>
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Input