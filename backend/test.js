import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;
    
    /*const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: input })
    });*/
    try {
      const response = await axios.post('http://localhost:5000/generate', {
        prompt: inputMessage,
      });
      const generatedText = response.data.generatedText;
      setOutputMessages([...outputMessages, generatedText]);
      setInputMessage('');
    } catch (error) {
      console.error('Error:', error);
    }

    if (!response.ok) {
      console.error('Failed to send message to server.');
      return;
    }

    const data = await response.json();
    setMessages([...messages, { text: input, fromUser: true }]);
    setMessages([...messages, { text: data.reply, fromUser: false }]);
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      <div className="chat-container">
        {messages.map((msg, index) => (
          <p key={index} className={msg.fromUser ? 'user-message' : 'bot-message'}>{msg.text}</p>
        ))}
      </div>
      <input type="text" value={input} onChange={handleChange} placeholder="Type your message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;