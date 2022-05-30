import BlogList from "./BlogList";
import useFetch from "./useFetch";
import React, {useState} from "react";
import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";

const Home = () => {
    /*const {data: blogs , isPending , error} = useFetch('http://localhost:8000/blogs');*/


    const yonetici = {
        email : "admin@hotmail.com",
        password : "admin123"
    }
    const kullanici = {
        email : "user@hotmail.com",
        password : "user123"
    }

    const [user,setUser] = useState({name:"",email:""});
    const [error,setError] = useState("");

    const Login = details => {
        console.log(details);

        if((details.email === yonetici.email && details.password === yonetici.password) || (details.email === kullanici.email && details.password === kullanici.password)){
            console.log("Logged IN");
            setUser({
                name : details.email,
                email : details.email
            });
        }else{
            console.log("details do not match");
        }
    }

    const Logout = () => {
        setUser({name:"",email:""});
    }

    

    return ( 
        <div className="home">
            {(user.email === "admin@hotmail.com") ? (
                <div className="create">
                    <a href="/admin">
                        <h2>Admin Paneli</h2>
                    </a>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (user.email === "user@hotmail.com") ? (
                <div className="create">
                    <a href="/kullanici">
                        <h2>Kullanici Paneli</h2>
                    </a>
                    <button onClick={Logout}>Logout</button>
                </div>
            ): (
                <LoginForm Login={Login} error={error}></LoginForm>
            )}
        </div>
    );
}
 
export default Home;