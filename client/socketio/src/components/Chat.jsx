import React, { useEffect, useState } from "react";

function Chat  ({socket,username,roomId})  {

    const [message,setMessage] = useState()
    const [messageList,setmessageList] = useState([])

    const sendMessage = async() => {

        if(message!==""){
            const msgData = {
                username:username,
                room:roomId,
                message:message,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_msg",msgData)
            setmessageList((list) => [...list,msgData])
        }
    

}

useEffect(() =>{
        socket.on("recieve_msg",(message) =>{
            setmessageList((list) => [...list,message])
        })
    },[socket])
    return ( 
    <div className="chatContainer">
        <div className="chat-header"></div> 
        <div className="chat-body">
            {messageList.map((messages) => {
                return (
                    <div className="message"
                        id={username === messages.username ?"you" :"other"}>
                            <div className="message-content">
                                <p>{messages.message}</p>
                            </div>
                            <div className="timeStamp">
                                <p>{messages.time}</p>
                            </div>
                        
                    </div>
                )
            })}
        </div>
        <div className="chat-footer">
            <input type="text" placeholder="send a message...." onChange={(event) => 
            setMessage((event.target.value))} />
            <button onClick={sendMessage}>send</button>
        </div>
    </div>
    )

}

export default Chat