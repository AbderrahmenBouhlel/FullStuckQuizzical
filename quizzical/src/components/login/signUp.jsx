import { useState ,useRef, useEffect} from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaStarOfLife } from "react-icons/fa6";
import './authCss/auth.css'
import SignUpImg from '../../assets/signUp.jpg'
import { useNavigate } from "react-router-dom";
import ImageProcessor from "../imageProcessor/imagePro";



export default function SignUp(props){

    const togglePasswordRef = useRef(null)
    const toggleConfPassword = useRef(null)
    const passwordInputRef = useRef(null)
    const passwordConfirmationRef = useRef(null)
    const [formData,setFormData] = useState({email:"",name:"",password:"",password2:""})
    const [error,setError] = useState('')
    const errorRef = useRef(null)
    const navigate = useNavigate()
    
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
        if (toggleConfPassword.current ){
            toggleConfPassword.current.addEventListener('click' ,handleToggleClique)
        }
        return ()=>{
            if (togglePasswordRef.current){
                togglePasswordRef.current.removeEventListener('click',handleToggleClique)
            }
            if (toggleConfPassword.current){
                toggleConfPassword.current.removeEventListener('click',handleToggleClique)
            }
        }
    },[])

    function handleLogIn(){
        navigate('/login')
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const isNotEmpty = Object.values(formData).every((attr) => attr.trim() !== "");
      
        if (!isNotEmpty) {
          setError('There are one or more empty fields.');
          return ;
        } else if (formData.password !== formData.password2) {
          setError('The two passwords do not match.');
          return ;
        }

        setError('');
        const { password2:_, ...reqData} = formData
        fetch('http://localhost:3000/api/auth/signup',{
            method:"POST",
            headers:{
                'content-Type':'application/json',
            },
            body: JSON.stringify(reqData)
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
            navigate('/')
           
        })
        .catch(error =>{
            console.error('There was a probleme with the fetch operation:',error)
        })


    }
        
    
    return (
        <div className="mainContainer">
            <div className="authContainer">
                <form  className="formConatiner" onSubmit={handleSubmit}>
                    <div className="error" ref={errorRef}>{error}</div>
                    <h2 >Create an account</h2>
                    <p>join for exclusive access!</p>

                    <div className="inputField">
                        <label htmlFor="sigfullName">
                                <FaStarOfLife className="faStar" />
                                Full Name
                        </label>
                        <input type="text" name="name" 
                               id="sigfullName"  
                               placeholder="Enter your full name"
                               value={formData.name}
                               onChange={(e)=> setFormData(prev => ({...prev , [e.target.name]:e.target.value}))}
                               
                               />
                    </div>
                    <div className="inputField">
                        <label htmlFor="sigEmail">
                                <FaStarOfLife className="faStar" />
                                Email
                        </label>
                        <input type="email" name="email" id="sigEmail" 
                               placeholder="Enter your email"
                               value={formData.email}
                               onChange={(e)=> setFormData(prev => ({...prev , [e.target.name]:e.target.value}))}
                        />
                    </div>
                
                    <div className="inputField">
                        <label htmlFor="sigPassword">
                                <FaStarOfLife className="faStar"  />
                                Password
                        </label>
                        <div className="withEyeSlash">
                            <input type="password" name="password" id="sigPassword" 
                                    placeholder="Enter your password" 
                                    ref={passwordInputRef}
                                    value={formData.password}
                                    onChange={(e)=> setFormData(prev => ({...prev , [e.target.name]:e.target.value}))}
                                    />
                            <div ref={togglePasswordRef} className="faEye" data-target="password">
                                <FaEyeSlash  />
                            </div>
                            
                        </div>
                    </div>
                    <div className="inputField">
                        <label htmlFor="sigPasswordCon">
                                <FaStarOfLife className="faStar"  />
                                Password Confirmation
                        </label>
                        <div className="withEyeSlash">
                            <input type="password" name="password2" 
                                    id="sigPasswordCon" placeholder="Re-enter your password"
                                    ref={passwordConfirmationRef}
                                    value={formData.password2}
                                    onChange={(e)=> setFormData(prev => ({...prev , [e.target.name]:e.target.value}))}
                                    />
                            <div ref={toggleConfPassword} className="faEye" data-target="confirmPassword">
                                <FaEyeSlash />
                            </div>
                            
                        </div>
                    </div>
                    
                    <button className="signBtn"  type="submit"> Create Account</button>
                    <button className="SignInBtn" onClick={handleLogIn}> Sign In </button>
                </form>
                <div className="imgContainer">
                    <ImageProcessor src={SignUpImg} change={props.darkMood}/>
                </div>
        
            </div>
        </div>
        



    )
}