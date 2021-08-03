const socket = io();

new Vue({
    el: '#app',
    data: {
        step: 'nick',
        nick: null,
        message: null,
        messages: [],
    },
    methods: {
        send() {/* metodo que se encarga de comunicar al socket que se produjo un message */
            socket.emit('chat-message',{
                nick: this.nick,/* nick del usuario */
                message: this.message,/* mensaje escrito */
                date: new Date().getTime()/* fecha actual */
            })

            this.message = null;
        },
        signIn() {
            if (!this.nick) {
                return;
            }

            this.step = 'chat';
        }
    },
    mounted() {
        socket.on('chat-message', msg => {
            this.messages.push(msg);

            setTimeout(() => {
                const chatContainer = document.querySelector('.chat-container');
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 10)
        })
    }
})