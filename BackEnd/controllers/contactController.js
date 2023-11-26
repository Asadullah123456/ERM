const Contact = require('../models/contactModel');
const Credential = require('../models/credentialModel');

const createContact = async (req, res) => {
    try{
        const { contactName, contactEmail, phoneNumber, tag, photoPath, address ,payLoad } = req.body;
        const user = await Credential.findOne({ userName: contactEmail });
        if(!user){
            return res.status(404).json({ message: "User Not Found!" });
        }
        const contact = await Contact.create({
            contactOf: payLoad.userID,
            contactIs: user._id,
            contactName: contactName,
            contactEmail: contactEmail,
            phoneNumber: phoneNumber,
            address: address,
            tag: tag,
            photo: photoPath
        });
        res.status(201).json({ message: "Contact Created Successfully" });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateContact = async (req, res) => {
    try{
        const { id } = req.params;
        const { contactIs, contactName, contactEmail, phoneNumber, tag, photoPath ,payLoad } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(id, { 
            contactOf: payLoad.userID,
            contactIs: contactIs,
            contactName: contactName,
            contactEmail: contactEmail,
            phoneNumber: phoneNumber,
            tag: tag,
            photo: photoPath
         },{ new: true });
        if(!updatedContact || updatedContact.active === false){
            return res.status(404).json({ message: "CONTACT NOT FOUND!" });
        }
        res.status(200).json({ message: "CONTACT UPDATED SUCCESSFULLY" });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const delContact = async (req, res) => {
    try{
        const { id } = req.params;
        const contact = await Contact.findOneAndUpdate(
            { _id: id },
            { $set: { active: false } },
            { new: true }
        );
        if(!contact){
            return res.status(404).json({ message: "Contact Not Found" });
        }
        res.status(200).json({ message: "Contact Deleted Successfully" });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const getAllContact = async (req, res) => {
    try{
        const { payLoad } = req.body;
        const allContact = await Contact.find({
            active: true,
            contactOf: payLoad.userID,
        });
        if(!allContact){
            return res.status(404).json({ message: "NO CONTACT FOUND!" });
        }
        res.status(200).json({ contacts: allContact });
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    createContact,
    getAllContact,
    updateContact,
    delContact
};