import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import { loginRoute } from '../utills/APIRoutes';
import styled from "styled-components";


function Login() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email:"",
        password:"",
    }) 
    const {email, password} = values;

    useEffect(()=>{

      if(localStorage.getItem('test-user')){
        navigate('/');
      }
    }, [])

    const onSubmit = async (e)=>{
        e.preventDefault();

        if(handleValidation()){
            //API call
            const {email, password } = values; 
            const {data} = await axios.post(loginRoute, {
                email, 
                password,
            });

            // data will have the response
            if(data.status === false){
                window.alert("error login the user")
            } 
            if(data.status === true){
                console.log(data.findUser);
                localStorage.setItem("test-user", JSON.stringify(data.findUser));  // saving the user info into the local storage
                navigate("/");

            }
        }
    }
    
    const handleValidation = ()=>{
        const {email,  password } = values;
        
        if(email.length ===""){
            window.alert("name is required");
            return false;
        }
       
        else if(password === ""){
            window.alert("password is required");
            return false;
        }
        return true;
    }

    const onChange =(e)=>{
        setValues({...values, [e.target.name]: e.target.value})

    }

    return (
        <>
        <Container>
        <div className="container my-4">
            <h1> Login Ther User</h1>
            <form onSubmit={onSubmit} className="form">
                
                <div >
                    <label >Email</label>
                    <input type="email" name="email"  value={email} onChange={onChange} />
                </div>
                <div >
                    <label >Password</label>
                    <input type="password"  name="password"  value={password} onChange={onChange} />
                </div>
                
                {/* For error */}
                <button type="submit" className="submit-btn"> Login </button>
                <p >Don't have an account? <Link to="/register">Register New User</Link></p>

            </form>
        </div>
        </Container>
        
        </>
    )
}

const Container = styled.div`
.form div{
    display: flex;
    flex-direction: column;
    margin-top: 10px;

}
.submit-btn{
    margin-top: 20px;
}

`

export default Login