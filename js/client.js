const socket=io("http://localhost:8000");

const form = document.getElementById('send-container');

const messageInput=document.getElementById('messageInp');
// const user=document.getElementById('username');
const messageContainer=document.querySelector('.chat');
// const usersList=document.querySelector('.friends');


const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


const username=prompt("Please enter your username to join");

// const userList=(user)=>{
//     const useElement=document.createElement('div');
//     userElement.innerText=user;
//     usersList.userList(userElement);
// }
// const add=()=>{
//     const username=prompt("Please enter your username to join");
//     user.innerText=username;
// }
// add();


socket.emit('new-user-joined',username);

socket.on('user-joined',username=>{
    append(`${username} joined the chat`,'right');
    userList(`${username}`);
})

socket.on('recieve',data=>{
    append(`${data.username}: ${data.message}`,'left');
})

socket.on('left',username=>{
    append(`${username} left the chat`,'right');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})