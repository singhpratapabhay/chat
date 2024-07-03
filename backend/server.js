const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config()
const path = require("path")
const { Server } = require("socket.io");
process.on("uncaughtException", (err) => {
    // console.log(err);
    process.exit(1)
})

const http = require("http");
const User = require("./models/user");
const FriendRequest = require("./models/friendRequest");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


const DB = process.env.DBURI.replace("<password>", process.env.DBPASSWORD);
mongoose.connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedToplogy: true
}).then(() => {
    console.log("DB connection is successful")
}).catch((err) => {
    console.log(err)
})
const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log(`server connected on port ${port}`)
})

io.on("connection", async (socket) => {
    console.log(JSON.stringify(socket.handshake.query))
    console.log(socket);
    const user_id = socket.handshake.query["user_id"];
    const socket_id = socket.id;

    console.log(`User Connected ${socket_id}`);

    if (Boolean(user_id)) {
        await User.findByIdAndUpdate(user_id, { socket_id, status: "Online" })
    }

    //We can write our socket Event Listner here
    socket.on("friend_Request", async (data) => {
        console.log(data.to)

        //data=> {to, from}
        const to_user = await User.findById(data.to).select("socket_id");
        const from_user = await User.findById(data.from).select("socket_id");

        await FriendRequest.create({
            sender: data.from,
            recipient: data.to
        })

        // emit=> a friend request
        io.to(to_user.socket_id).emit("new_friend_request", {
            message: "New Friend Request Received"
        });

        //emit event=> "request sent"
        io.to(from_user.socket_id).emit("request_sent", {
            message: "Request Sent Successfully!"
        });
    });
    //handle text/link messages

    socket.on("text_message", (data) => {
        console.log("Received Message", data);

        //data: {to, from, text}
        // create a new conversation if it doesnt exist yet or add new message to the message list
        // save to db
        //emit incoming_message ->to user
        //emit outgoing_message-> from user

    })
    socket.on("accept_request", async (data) => {
        console.log(data)

        const request_doc = await FriendRequest.findById(data.request_id);
        console.log(request_doc)
        const sender = await User.findById(request_doc.sender);
        const receiver = await User.findById(request_doc.recipient);

        sender.friends.push(request_doc.recipient);
        receiver.friends.push(request_doc.sender);

        await receiver.save({ new: true, validateModifiedOnly: true });
        await sender.save({ new: true, validateModifiedOnly: true });

        await FriendRequest.findByIdAndDelete(data.request_id)
        io.to(sender.socket_id).emit("request_accepted", {
            message: "Friend Request Accepted"
        })
        io.to(receiver.socket_id).emit("request_accepted", {
            message: "Friend Request Accepted"
        })
    });
    socket.on("file_message", (data) => {
        console.log("Received Message", data);
        //data: {to, from, text, file}

        //get the file extension
        const fileExtension = path.extname(data.file.name);
        //generate a unique filename

        const fileName = `${Date.now()}_${Math.floor(Math.random() * 10000)}${fileExtension}`;

        // upload file to AWS s3
        // create a new conversation if it doesnt exist yet or add new message to the message list
        // save to db
        //emit incoming_message ->to user
        //emit outgoing_message-> from user


    })
    socket.on("end", async (data) => {

        if (data.user_id) {
            await User.findByIdAndUpdate(data.user_id, { status: "Offline" })
        };
        //Todo=> broadcast user_disconnected
        console.log("closing connection");
        socket.disconnect(0);
    })
});
process.on("unhandledRejection", (err) => {
    // console.log(err);
    server.close(() => {
        process.exit(1);
    })
})