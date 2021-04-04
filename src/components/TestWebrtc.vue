<template>
    <div>
        <h2 v-if="connectTo.length">You are connected to {{ connectTo }}..</h2>
        <h2 v-if="!connectTo.length">Please enter some peerID</h2>
        <h2 v-if="myPeerId.length">Your peer id is {{ myPeerId }}..</h2>
        <h2 v-if="!myPeerId.length">Please enter Your peerID</h2>
        <form >
            <div>
                <label for="connectTo">My Peer ID: </label>
                <input type="text" v-model="myPeerId" name="myPeerId" id="myPeerId">
            </div>
            <div>
                <label for="connectTo">Connect To: </label>
                <input type="text" v-model="connectTo" name="connectTo" id="connectTo">
            </div>
        </form>
        <div class="w-full">
            <label for="connectTo">My message: </label>
            <textarea v-model="message" name="message" id="message" cols="20" rows="10"></textarea>
        </div>
        <hr>
        <div class="videos">
            <div>
                <h4>My Stream</h4>
                <video src="" id="my_stream" controls></video>
            </div>
            <div>
                <h4>Incoming Stream</h4>
                <video src="" id="incoming_stream" controls></video>
            </div>
        </div>
        <div class="w-100">
            <button v-on:click="setparams()">Set Parameters</button>
            <button v-on:click="call()">Call</button>
        </div>
    </div>
</template>

<script>

// The usage -
import Peer from 'peerjs';
import Swal from 'sweetalert2'

export default {
    name: "TestWebrtc",
    data() {
        return {
            my_stream: null,
            incoming_stream: null,
            connectTo: '',
            myPeerId: '',
            mypeer: '',
            conn: '',
            message: '',
        }
    },
    beforeCreate() {
        console.log('Welcome to TestWebRTC');
    },
    methods: {
        setparams() {

            if(this.mypeer._id) {

                Swal.fire({
                    title: `Already connected to ${this.mypeer._id}`,
                    text: '',
                    type: 'success',
                });

                this.mypeer.disconnect();
            }

            // create our peer 
            this.mypeer = new Peer(this.myPeerId);
            
            this.mypeer.on('connection', (inner_conn) => {
                
                inner_conn.on('data', (data) => {

                    Swal.fire({
                        title: `Received: ${data}`,
                        text: '',
                        type: 'success',
                    });

                    console.log(`Received: ${data}`);
                    
                });

            });

            this.mypeer.on('error', (err) => {
                console.log('error occ ', err);
                alert(err);
            })

            
            
        },
        call() {

            try {

                // connect to 
                this.conn = this.mypeer.connect(this.connectTo);

                this.conn.on('open', () => {
                    console.log('conn opened')
                    
                    // send message
                    this.conn.send(this.message);
                });

            } catch (error) {
                console.log(error);
            }

        }
    }
}
</script>

<style scoped>
input {
    width: 25vw;
    height: 2rem;
}
.videos, form {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.w-100 {
    display: flex;
    direction: row;
    justify-content: space-evenly;

}
button {
    background: rgb(72, 255, 0);
    color: black;
    font-weight: 800;
    border-radius: 5px;
    margin: 2rem auto;
    padding: 0.5rem;
    font-family:monospace;
}
.w-full {
    width: 100vw;
    margin-top: 1rem;

}
textarea {
    width: 50%;
    box-sizing: border-box;
}
</style>