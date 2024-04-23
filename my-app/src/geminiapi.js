const chatInput = document.querySelector(".chat-input textarea")
const sendChatBtn = document.querySelector(".chat-input button")
const chatbox = document.querySelector(".chatbox")

let userMessage;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("Li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p>${message}</p>` :  <p>Hi</p>
  chatLi.innerHTML = chatContent;
  return chatLi
}

const handleChat = () => {
  userMessage = chatInput.ariaValueMax.trim();
  if(!userMessage) return;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
}

sendChatBtn.addEventListener("click", handleChat)