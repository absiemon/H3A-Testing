import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import { registerRoute } from '../utills/APIRoutes';
import styled from "styled-components";

function Register() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        name:"",
        email: "",
        password:"",
        description: "",
    }) 
    const {name, email, password, description} = values;

 
    //IF THE USER IS ALREADY LOGGED IN ITS CREDENTIALS WILL BE IN localStorage then nevigate the user to hame page and we want to run this only once when the component is loaded
    useEffect(()=>{

      if(localStorage.getItem('test-user')){
        navigate('/');
      }
    }, [])

    const onSubmit = async (e)=>{
        e.preventDefault();
        // after just submission call the handleValidation and if this comes true means each field has been given correctly
        // call the API
        if(handleValidation()){
            //API call
            const {name, email , password , description} = values; 
            const {data} = await axios.post(registerRoute, {
                name, 
                email,
                password,
                description
            });

            // data will have the response
            if(data.status === false){
                window.alert("error registering the user")
            } 
            
            if(data.status === true){
                console.log(data);
                localStorage.setItem("test-user", JSON.stringify(data.user));  // saving the user info into the local storage
                navigate("/");

            }
        }
    }
    
    const handleValidation = ()=>{
        const {name, email, password } = values;
        
        if(name.length <3){
            window.alert("length of the name must be at least 3 characters");
            return false;
        }
        
        
        else if( password.length < 5){
            window.alert("password should be at least 5 characters");
            return false;
        }
        else if( email ===""){
            window.alert("password should be at least 5 characters");
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
        <h1> Register Ther User</h1>
            <form onSubmit={ (e) => onSubmit(e)} className = "form">
                
                <div >
                    <label >name</label>
                    <input type="text"  name="name" value={name} onChange={onChange} />
                </div>

                <div >
                    <label >Email</label>
                    <input type="email" name="email"  value={email} onChange={onChange} />
                </div>
                <div >
                    <label >Password</label>
                    <input type="password"  name="password"  value={password} onChange={onChange} />
                </div>
                <div >
                    <label > Description</label>
                    <input type="text"  name="description"  value={description} onChange={onChange} />
                </div>
                
                {/* For error */}
                <button type="submit" className="submit-btn"> Register </button>
                <p >Already have an account? <Link to="/login">Login</Link></p>

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
 

export default Register