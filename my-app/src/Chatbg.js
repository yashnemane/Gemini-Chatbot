import React, { useState, useRef, useEffect } from "react";
import axios from 'axios'


function Chatbg() {
  const [userinput,setUserInput]=useState("")
  const [list, setList]=useState([{
    id: 0,
    message: 'Hello, how can I help you today?',
    class: 'chat incoming',
  }])
  const [isThinking, setIsThinking] = useState(false);

  const chatboxRef = useRef(null);
  const counterRef = useRef(1);

  const HandleInputChange = (e) => {
    setUserInput(e.target.value);
  }

  const HandleClick = async () => {
    console.log(userinput);
    const newId = Date.now() + counterRef.current; // Combine Date.now() and counter for unique ID
    counterRef.current += 1;
    setList(prevList => [
      ...prevList,
      {
        id: newId,
        message: userinput,
        class: 'chat outgoing'
      }
    ]);

    setIsThinking(true);

    try {
      const response = await axios.post('http://localhost:5000/ChatBot', {
        query: userinput,
      });
      setIsThinking(false);
      console.log(response);
      if (response.data && response.data) {
        const generatedText = response.data.generatedText;
        setList(prevList => [
          ...prevList,
          {
            id: Date.now(),
            message: generatedText,
            class: 'chat incoming' // Assuming 'outgoing' represents bot messages
          }
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setList(prevList => [
        ...prevList,
        {
          id: Date.now(),
          message: 'Error occured',
          class: 'chat incoming' // Assuming 'outgoing' represents bot messages
        }
      ]);
    }
  }

  useEffect(() => {
    if (chatboxRef && chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [list]);

  return (
    <div className="chatbot">
      <header>
        <h2>Chatbot</h2>
      </header>
        <ul ref={chatboxRef} className="chatbox">
          {
            list.map(item => 
              <li key={item.id} className={item.class}>{item.message}</li>
            )
          }
          {isThinking && <li key="thinking" className="chat incoming">Thinking...</li>}
        </ul>
        <div className="chat-input">
          <input 
          placeholder="Ask anything..."
          onChange={HandleInputChange}
          required/>
          <button onClick={HandleClick} value={userinput} type='submit'>Send</button>
        </div>
    </div>
  );
}

export default Chatbg;