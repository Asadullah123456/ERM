const Credential = require("../models/credentialModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
        const { userName, userPassword, role } = req.body;
        if (!validUserName(userName)) {
        return res.status(400).json({ message: "InValid UserName" });
        }
        if (await isUserExist(userName)) {
        return res.status(401).json({ message: "User Already Exist!" });
        }
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const credential = await Credential.create({
        userName: userName,
        password: hashedPassword,
        role: role,
        active: true,
        });
        const token = generateToken(credential);
        res.cookie('token', token, { sameSite: 'Lax' });
        return res.status(201).json({message: "SIGN UP SUCCESSFULLY"});
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { userName, userPassword } = req.body;
        const credential = await Credential.findOne({ userName: userName });
        if (!credential || credential.active == false) {
        return res.status(404).json({ message: "User Not Found!" });
        }

        if (await !isValidPassword(credential, userPassword)) {
        return res.status(401).json({ message: "Invalid Password" });
        }
        credential.isOnline = true;
        await credential.save();
        const token = generateToken(credential);
        res.cookie('token', token, { sameSite: 'Lax' });
        return res.status(200).json({ message: "Login Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const isCredExist = async (req, res) => {
    try {
        const { userName } = req.query;
        const user = await Credential.findOne({ userName: userName });
        if (user) {
            res.status(200).json({ userID: user._id, message: 'User Exist' });
        }
        else {
            res.status(404).json({ message: 'User Not Found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const changePassword = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const previousCred = await Credential.findOne({ userName: userName });
        if (!previousCred || previousCred.active === false) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        await Credential.findByIdAndUpdate(previousCred._id, { userName:userName, password: password }, { new: true });
        res.status(200).json({ message: 'Upadated Successfully' });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserID = async (req, res) => {
    try{
        const { payLoad } = req.body;
        if(!payLoad){
            res.status(404).json({ message: 'Token Not Found!' });
        }
        res.status(200).json({ userID: payLoad.userID });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
}


function generateToken(credential) {
    const payLoad = {
        userID: credential._id,
        userRole: credential.role,
    };
    // return jwt.sign(payLoad, process.env.SECRET_KEY, { expiresIn: '1h' });
    return jwt.sign(payLoad, process.env.SECRET_KEY);
}

async function isUserExist(userName) {
    const user = await Credential.findOne({ userName: userName });
    return !!user;
}

function validUserName(userName) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@ems\.com$/;
    return gmailRegex.test(userName);
}

async function isValidPassword(credential, password) {
    return (await bcrypt.compare(password, credential.password)) ? true : false;
}

module.exports = {
    signUp,
    login,
    isCredExist,
    changePassword,
    getUserID
};
