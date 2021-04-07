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
            <button v-on:click="showGuide()">Help</button>
            <button v-on:click="setparams()">Set Parameters</button>
            <button v-on:click="call()">Call</button>
            <a href="?page=video" class="btn-end" >End Call</a>
        </div>
    </div>
</template>

<script>

// The usage -
import Peer from 'peerjs';
import Swal from 'sweetalert2'

export default {
    name: "TestVideo",
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

        // Swal.fire({
        //     title: 'Guide',
        //     text: `1. Enter Your peer id and Target peer id.\n 2. Click 'Set Parameter' button.. \n3. Enter your message and click 'Call' `,
        //     type: 'success',
        //     showConfirmButton: true,
        // })

    },
    methods: {
        async setparams() {

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
            
            // answer
            this.mypeer.on('call', async (call) => {

                var stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})

                // set my_stream from our device capture
                document.querySelector('#my_stream').srcObject = stream;

                call.answer(stream); // Answer the call with an A/V stream.
                call.on('stream', (remoteStream) => {
                    // Show stream in some <video> element.
                    document.querySelector('#incoming_stream').srcObject = remoteStream;   
                });
            });

            // check for peer error
            this.mypeer.on('error', (err) => {
                console.log('error occ ', err);

                Swal.fire({
                    title: 'Error occured',
                    text: `${err}`,
                    type: 'error',
                });

                alert(err);
            })

        },
        async call() {
            console.log(document.querySelector('#incoming_stream'));
            try {
                
                // call to connect to 'peer id'
                var stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})

                // set my_stream from our device capture
                document.querySelector('#my_stream').srcObject = stream;
                
                const call = this.mypeer.call(this.connectTo, stream);
                
                call.on('stream', (remoteStream) => {
                    // Show stream in some <video> element.
                    document.querySelector('#incoming_stream').srcObject = remoteStream;      
                });

            } catch (error) {
                console.log(error);

                Swal.fire({
                    title: 'Error occured',
                    text: `${error}`,
                    type: 'error',
                });

            }

        },
        showGuide() {
            
            Swal.fire({
                title: 'Guide',
                text: `1. Enter Your peer id and Target peer id.\n2. Click 'Set Parameters' button. \n3. Enter your message and click 'Call' `,
                type: 'success',
                showConfirmButton: true,
            })

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
    background: #ccc;
    padding: 1rem;
}
.w-100 {
    display: flex;
    direction: row;
    justify-content: space-evenly;

}
button, .btn-end {
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
.btn-end {
    background: rgb(255, 0, 0) !important;
    text-decoration: none;
    color: #ffffff;
}
@media only screen and (max-width: 600px) {
    .videos, form {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

</style>