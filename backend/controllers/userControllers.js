import User from "../models/userModel.js"
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs"

const getUser = async (req, res) => {
        const {username} = req.params;
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        if(!user) return res.status(400).json({error: "User not found!"});

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Error in getUser: ", err.message);
    }
}
const signupUser = async(req, res) => {
    try {
        const {name, username, email, password} = req.body;
        const user =await User.findOne({$or:[{email},{username}]});

        if (user){
            return res.status(400).json({error: "Email/Username is already taken!"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt );

        const newUser = new User({
            name,
            username,
            email,
            password:hashedPassword
        })
        await newUser.save()

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);

            res.status(200).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }else{
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Error in signing up user: ", err.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) return res.status(400).json({error: "Invalid username or passord"});
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Error in logging in user: ", err.message);
    }
};

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "",{maxAge:1});
        res.status(200).json({message: "User logged out successfully!"});
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Error logging out user: ", err.message);
    }
};

const followUnfollowUser = async (req,res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id)

        if(id===req.user._id.toString()) return res.status(400).json({error: "You cannot follow yourself!"});

        if(!userToModify || !currentUser) return res.status(400).json({error: "User not found!"});

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // Unfollow user
            // Modify currentUser following and followers of userToModify
            await User,findByIdAndUpdate(req.user._id, {$pull: {following: id }});
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            res.status(200).json({message: "User unfollowed successfully"});
        }else{
            // Follow user
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}});
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}});
            res.status(200).json({message: "User followed successfully"});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const updateUser= async (req, res)=>{
    const {name,email,username,password,profilePic,bio} = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if(!user) return res.status(400).json({error: "User not found!"});

        if(req.params.id !== userId.toString()) return res.status(400).json({error: "You cannot update other user's profile!"});

        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user.password =hashedPassword;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username =username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user =await user.save();

        res.status(200).json({message: "Profile updated successfully", user});
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Error updateUser: ", err.message);
    }
}

const getProfile = async (req, res) => {
    const {username} = req.params;
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        if(!user) return res.status(400).json({error: "User not found!"});

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Error getProfile: ", err.message);
    }
}

export {signupUser, getUser, loginUser, logoutUser, followUnfollowUser, updateUser, getProfile};