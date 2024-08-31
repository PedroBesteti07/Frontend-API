import React, {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LogoLogin from "..assets/logologin.png"
import {useNavigate} from 'react-router-dom';
import {Eye, EyeSlash} from "@phosphor-icons/react";

const SignIn = ({onSignUpClik}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);//Estado para controlar visibilidade da senha

    const handSubmit = async(event) => {
        event.preventDefault();

        try{
            const response = await axios.post('https://localhost:7266/api/User/Login', {
                email,
                password,
            });
            if(response.status === 200){
                Cookies.set('login', 'ativo', {expires: 1}); //O cookie expira em 1 dia
                navigate('/inicio');
            }
        }catch(error){
            setError('Falha ao realizar login.Verifique suas credenciais e tente novamente.');
        }
    };
    return(
        <div className = 'flex flex-col w-3/4 min-h-screen px-12 justify-center'>
            <div className = 'flex justify-center mb-14'>
                <h1 className = 'text-4x1 text-[#2D2D2D] font-semibold'>Bem vindo(a)!</h1>
                <div className='flex text-lg'>
                    <h2 className =''>
                        <span className = "underline hover:cursor-pointer hover:text-[#BD1A37]" onClick={onSignClick}>
                            Clique aqui para criar a sua conta
                        </span>
                        É de graça, leva poucos minutos.
                    </h2>
                </div>
                {error && <div className = 'text-red-500 mb-4'>{error}</div>}
                <form onSubmit = {handleSubmit} className='flex flex-col gap-y-4 mt-8 text-[#2D2D2D]'>
                    <h3 className = 'text-2x1'>Email:</h3>
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='h-[50px] border-[2px] border-[#D9D9D9] rounded-md px-3 text-lg'
                    required 
                    />
                </form>
            </div>   
        </div>
            
    )

}