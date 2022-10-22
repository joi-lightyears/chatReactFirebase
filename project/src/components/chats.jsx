import {React, useState, useEffect, useContext} from 'react'
// import cyno from "../images/cyno.jpg"
import {AuthContext} from "../context/AuthContext"
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import {db} from "../firebase"
import { ChatContext } from '../context/ChatContext'
const Chats = () => {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)
  // const test = async () => {
  //   const docRef = doc(db, "users", currentUser.uid);
  //   docRef.update({
  //     "onlineState": false
  //   })
  //   docRef.onDisconnect().update({
  //     "onlineState": false
  //   })
  // }
  // test()
// var uid = currentUser.uid;
// var userStatusDatabaseRef = db.database().ref('/status/' + uid);
// var isOfflineForDatabase = {
//     state: 'offline',
//     last_changed: db.database.ServerValue.TIMESTAMP,
// };
// var isOnlineForDatabase = {
//     state: 'online',
//     last_changed: db.database.ServerValue.TIMESTAMP,
// };
// db.database().ref('.info/connected').on('value', function(snapshot) {
//     if (snapshot.val() == false) {
//         return;
//     };
//     userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
//         userStatusDatabaseRef.set(isOnlineForDatabase);
//     });
// });

  // updateDoc(doc(db, "users", currentUser.uid),{
  //   "onlineState": false
  // });
  // onDisconnect().updateDoc(doc(db, "users", currentUser.uid),{
  //   "onlineState": false
  // })

//   var ref = db.database().ref("users/ada");

  useEffect(()=>{
    const getChats =()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
      return () =>{
        unsub();
      };
    };
    currentUser.uid && getChats()
  }, [currentUser.uid])
  // console.log(Object.entries(Chats));
  const handleSelect=(user)=>{
    dispatch({type:"CHANGE_USER",payload:user});
  };
            
  {/* add method .substring(0, 25) to limit text */}
  const handleShowChat = (text) =>{
    if (text === ""){
      return <i>Hình ảnh</i>;
    }
    else if (text === undefined){
      return ""
    } else if (text.length > 25){
      return text.substring(0,25) + "..."
    } else {
      return text
    }
  }
  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{handleShowChat(chat[1].lastMessage?.text)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats