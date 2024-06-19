import { useState ,useRef,useEffect} from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaStarOfLife } from "react-icons/fa6";
import './authCss/auth.css'
import SignUpImg from '../../assets/signUp.jpg'
import { useNavigate } from "react-router-dom";
import ImageProcessor from "../imageProcessor/imagePro";


export default function Login(props){
    const togglePasswordRef = useRef(null)
    const passwordInputRef = useRef(null)
    const navigate = useNavigate()
    const [error,setError] = useState('')
    const errorRef = useRef(null)
    const [loginFormData,setLoginFormData] = useState({email:"",password:""})

    useEffect(()=>{
        const handleTogglePassword = (inputRef)=>{
            if(inputRef.current){
                const type = inputRef.current.type === 'password' ? 'text' : 'password'
                inputRef.current.type = type
            }
        }
        const handleToggleClique = (e)=>{
            const target = e.currentTarget.dataset.target;
            if (target == "password"){
                handleTogglePassword(passwordInputRef)
            }
            else if (target === "confirmPassword"){
                handleTogglePassword(passwordConfirmationRef)
            }
        }
        if (togglePasswordRef.current ){
            togglePasswordRef.current.addEventListener('click' ,handleToggleClique)
        }
       
        return ()=>{
            if (togglePasswordRef.current){
                togglePasswordRef.current.removeEventListener('click',handleToggleClique)
            }
        }

    },[])

    function createAccount(){
        navigate('/signup')
    }
    async function handleSubmit(e){
        e.preventDefault();
        const isNotEmpty = Object.values(loginFormData).every((attr)=> attr.trim() !== "")
        if (!isNotEmpty) {
            setError('There are one or more empty fields.');
            return ;
        } 

        setError('');
        fetch('http://localhost:3000/api/auth/login',{
            method:"POST",
            headers:{
                'content-Type':'application/json',
            },
            body: JSON.stringify(loginFormData)
        })
        .then(response =>{
            return response.json();
        })
        .then(data=>{
            setError(data.message)
            if(data.status === 'fail' || data.status === 'error'){
                throw new Error(`Network response ${data.status}`)
            }
            errorRef.current.classList.add('success');
            localStorage.setItem('token', data.token);
            props.setUser(data.user)
            navigate('/')
        })
        .catch(error =>{
            console.error('There was a probleme with the fetch operation:',error)
        })

    }

    return (
        <div className="mainContainer">
            <div className="authContainer">
                <div className="imgContainer">
                    <ImageProcessor src={SignUpImg} change={props.darkMood}/>
                </div>
                <form className="formConatiner login" onSubmit={handleSubmit}>
                    <div className="error" ref={errorRef}>{error}</div>
                    <h2 >Sign In</h2>
                    <p>Unlock your world</p>
                    <div className="inputField">
                        <label htmlFor="loginEmail">
                                <FaStarOfLife className="faStar" />
                                Email
                        </label>
                        <input type="email" name="email" 
                                id="loginEmail" placeholder="Enter your Email"
                                onChange={(e) => setLoginFormData(prev => ({...prev , [e.target.name]:e.target.value}))}
                        />
                    </div>
                    <div className="inputField">
                        <label htmlFor="loginPassword">
                                <FaStarOfLife className="faStar"  />
                                Password
                        </label>
                        <div className="withEyeSlash">
                            <input type="password" name="password" id="loginPassword" 
                                    ref={passwordInputRef} placeholder="Enter you password"
                                    onChange={(e) => setLoginFormData(prev => ({...prev , [e.target.name]:e.target.value}))}
                            />
                            <div ref={togglePasswordRef} className="faEye" data-target="password">
                                <FaEyeSlash  />
                            </div>
                        </div>
                    </div>
                    
                    <button className="signBtn"> Sign In</button>
                    <button className="createAccBtn" onClick={createAccount}> Create an account </button>
                </form>
        
            </div>
        </div>
        
    )
}