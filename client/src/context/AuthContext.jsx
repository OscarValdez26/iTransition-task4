import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest, getUsersRequest, updateUserRequest, updateLastLogin } from "../api/auth.js";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AutnProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [allUsers,setAllUsers] = useState([])

    const signup = async (user) => {
        try {
            const response = await registerRequest(user);
            console.log(response.data);
            setUser(response.data);
            setIsAuth(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    }
    const signin = async (user) => {
        try {
            const response = await loginRequest(user);
            console.log(response.data);
            setUser(response.data);
            setIsAuth(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    }
    const signout = async () =>{
        try{
            const response = await logoutRequest();
            console.log(response);
            setUser(null);
            setIsAuth(false);
        }catch(error){
            setErrors(error.response.data);
        }
    }
    const getusers = async () =>{
        try{
            const response = await getUsersRequest();
            setAllUsers(response.data);
        }catch(error){
            setErrors(error.response.data);
        }
    }
    const updateuser = async (user) =>{
        try{
            const response = await updateUserRequest(user);
            console.log(response.data);
        }catch(error){
            setErrors(error.response.data);
        }
    }
    const updateLog = async (user) =>{
        try{
            const response = await updateLastLogin(user);
            console.log(response.data);
        }catch(error){
            setErrors(error.response.data);
        }
    }
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuth(false);
                setUser(null);
                return;
            }
            try {
                const response = await verifyTokenRequest(cookies.token);
                if (!response.data) {
                    return setIsAuth(false);
                }
                else {
                    setIsAuth(true);
                    setUser(response.data);
                }
            } catch (error) {
                setIsAuth(false);
                setUser(null);
            }
        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{ signup, signin, signout, getusers, updateuser,updateLog, allUsers, user, isAuth, errors }}>
            {children}
        </AuthContext.Provider>
    )
}