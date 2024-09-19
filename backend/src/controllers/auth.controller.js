import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (request, response) => {
    const { username, email, password } = request.body;
    try {
        const userFound = await User.findOne({ email });
        if (userFound) {
            return response.status(400).json(["The email is already in use"]);
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        response.cookie('token', token);
        //response.json({message:'User created succesfully'});
        response.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const login = async (request, response) => {
    const { email, password,_id, lastLogin } = request.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return response.status(400).json(["User not found"]);
        }
        if(userFound.status === "Blocked"){
            return response.status(400).json(["User blocked"]);
        }
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return response.status(400).json(["Invalid credentials"]);
        }
        const token = await createAccessToken({ id: userFound._id });
        //updateLogin(_id);
        response.cookie('token', token);
        response.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    }
    catch (error) {
        return response.status(500).json([error.message]);
    }
}

export const admin = async (request, response) => {
    const { _id, status } = request.body;
    if (status === "Deleted") {
        try {
            const userFound = await User.findByIdAndDelete(_id);
            if (!userFound) {
                return response.status(400).json(["User not found"]);
            }
            return response.json(userFound);
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        try {
            const userFound = await User.findByIdAndUpdate(_id, { status });
            if (!userFound) {
                return response.status(400).json(["User not found"]);
            }
            return response.json(userFound);
        }
        catch (err) {
            console.log(err);
        }
    }
}

export const logout = (request, response) => {
    response.cookie('token', "", { expires: new Date(0) });
    return response.status(200).json({ message: "Logout OK" });
}

export const verifyToken = async (request, response) => {
    const { token } = request.cookies;
    if (!token) {
        return response.status(401).json(["Unauthorized"]);
    }
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) {
            return response.status(401).json(["Unauthorized"]);
        }
        const userFound = await User.findById(user.id);
        if (!userFound) {
            return response.status(401).json(["Unauthorized"]);
        }
        return response.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}

export const adminGet = async (request, response) => {
    try {
        const usersFound = await User.find({});
        if (!usersFound) {
            return response.status(400).json(["User not found"]);
        }
        return response.json(usersFound);
    }
    catch (err) {
        console.log(err);
    }
}

export const updateLogin = async (request, response) =>{
    const { id, lastLogin } = request.body;
    try{
        const userFound = await User.findByIdAndUpdate(id,{lastLogin});
        if (!userFound) {
            return response.status(400).json(["User not found"]);
        }
        return response.json(userFound);
    }catch(err){
        console.log(err);
    }
}