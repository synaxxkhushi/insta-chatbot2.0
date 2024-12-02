const Insta = require('./insta.js'); //importing INSTA.JS package
const client = new Insta.Client(); //installing client
const chatbot = require("node-fetch").default; //importing node-fetch to fetch replies from api

// LOG MESSAGE ONCE BOT IS ONLINE
client.on('connected', () => {
    console.log(`${client.user.username} Is Ready Now For Chats`);
});

// HANDELING MESSAGES
client.on('messageCreate', (message) => {
    if (message.author.id === client.user.id) return
    message.markSeen();

    if(message.content.toLowerCase().includes('hi') || message.content.toLowerCase().includes('hello')){ 
        return message.chat.sendMessage('abhishek IS MY DEVELOPER @maybe__abhii');
    } else
    chatbot(`http://api.brainshop.ai/get?bid=${process.env.API_ID}&key=${process.env.API_KEY}&uid=[uid]&msg=${encodeURIComponent(message.content)}`)
    .then(res => res.json())
    .then(json => {
      message.chat.sendMessage(json.cnt);
    }).catch(err => {});
});

// BOT LOGIN
client.login(process.env.USERNAME, process.env.PASSWORD);
