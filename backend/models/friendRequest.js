const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,  // Corrected type definition
            ref: "User"
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,  // Corrected type definition
            ref: "User"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const FriendRequest = mongoose.model("FriendRequest", requestSchema);

module.exports = FriendRequest;
