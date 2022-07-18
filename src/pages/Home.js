import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'


function Home() {

    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        const data = localStorage.getItem('test-user');
        const finalData = JSON.parse(data);
        setUser(finalData);
        console.log(finalData);
    }, [])

    const handleLogout = async () => {

        localStorage.clear();
        navigate('/login');
    }


    return (
        <>
            { user &&

                <Container>
                    <div className=" userInfo">
                        <h1 className="heading"> User information</h1>

                        <div >
                            <p><strong>Name: </strong>  <span>{user.name}</span></p>
                        </div>
                        <div >
                            <p> <strong>Email: </strong>  <span>{user.email}</span></p>
                        </div>
                        <div >
                            <p> <strong>Description: </strong> <span>{user.description}</span></p>
                        </div>

                    </div>
                    <button className="logout" onClick={handleLogout}>Logout</button>

                </Container>
            }
        </>
    )
}

const Container = styled.div`
.userInfo{
    margin: 50px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
}
.heading{
    text-align: center;
}
.logout{
    padding: 10px;
    background: #8f7ca0;
    position: absolute;
    left: 35rem;
    @media screen and (max-width: 800px){
        left: 20rem;

    }
    @media screen and (max-width: 600px){
        left: 10rem;

    }
}

`

export default Home