const FriendRequest = require("../models/friendRequest.js");
const User = require("../models/user");
const filterObj = require("../utils/filterObj")
exports.updateMe = async (req, res, next) => {
    const { user } = req;
    const filteredBody = filterObj(req.body, "firstName", "lastName", "about", "Avatar")
    const updated_user = await User.findByIdAndUpdate(user._id, filteredBody, {
        new: true,
        validateModifiedOnly: true
    });
    res.status(200).json({
        status: "success",
        data: updated_user,
        message: "Profile updated successfully"
    })
};

exports.getUsers = async (req, res, next) => {
    const all_users = await User.find({
        verified: true
    }).select("firstName lastName _id");

    const this_user = req.user;

    const remaining_users = all_users.filter((user) => !this_user.friends.includes(user.id) && user._id.toString() !== req.user._id.toString())
    res.status(200).json({
        status: "success",
        data: remaining_users,
        message: "Users found successfully!"
    })
}
exports.getRequests = async(req, res, next)=>{
    const requests = await FriendRequest.find({recipient: req.user._id}).populate("sender"," _id firstName lastName");
    res.status(200).json({
        status: "success",
        data: requests,
        message: "Friend Requests Found successfully"
    })
}

exports.getFriends =async(req,res,next)=>{
    const this_user= await User.findById(req.user._id).populate("friends", "_id firstName lastName");

    res.status(200).json({
        status: "success",
        data: this_user.friends,
        message: "Friends Found successfully"
    })
}