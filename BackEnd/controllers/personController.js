const Person = require('../models/personModel');

const registerPerson = async (req, res) => {
    try {
        const { firstName, lastName, address, phoneNumber, cnic, photoPath, payLoad } = req.body;
        await Person.create({
            userID: payLoad.userID,
            firstName: firstName,
            lastName: lastName,
            personCNIC: cnic,
            phoneNumber: phoneNumber,
            address: address,
            photo: photoPath
        });
        res.status(201).json({ message: 'Person Registered Successfully' });
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
};


const getUserName = async (req, res) => {
    try{
        const { payLoad } = req.body;
        const person = await Person.findOne({ userID: payLoad.userID });
        if(!person){
            return res.status(404).json({ message: 'USER NOT FOUND!' });
        }
        return res.status(200).json({ UserName: person.firstName });
    }
    catch(err){
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getPhoto = async (req, res) => {
    try{
        const { payLoad } = req.body;
        const person = await Person.findOne({ userID: payLoad.userID });
        if(!person){
            return res.status(404).json({ message: 'USER NOT FOUND!' });
        }
        return res.status(200).json({ Photo: person.photo });
    }
    catch(err){
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    registerPerson,
    getUserName,
    getPhoto
}