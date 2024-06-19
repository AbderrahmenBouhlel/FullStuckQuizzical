import { useEffect, useState } from 'react'
import Game from './components/game/game.jsx';
import Answer from './components/answer/answer';
import './App.css'
import Check from './components/check/check';
import { BrowserRouter as Router ,Routes ,Route,Navigate ,useLocation,useNavigate, json} from 'react-router-dom'
import  Login  from './components/login/login.jsx'
import SignUp from './components/login/signUp.jsx';
import MainContent from './components/MainContent/MainCont.jsx';
import Home from './components/home/home.jsx';
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

  
export default function App() {
  const [state, setState] = useState("homePage")
  const [quizzes, setQuizzes] = useState([]);
  const [nbr_correct_answer , setNbr_correct_answer] = useState(-1)
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [user, setUser] = useState(null)
  const [score, setScore] = useState(user?.score)
  const [loading, setLoading] = useState(false)
  const [darkMood , setDarkMood] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const [hint, setHint] = useState('');

  function calcul_corect_answer(){
      let nbr =0;
      quizzes.forEach((quizz,indexQuizz)=>{
          let selected_index = quizz.selected_answer_index
          if(quizz.all_inswers[selected_index] == quizz.correct_answer ){
              nbr++;
          }
      })
      setNbr_correct_answer(nbr)
      
  }
  function addScore(score){
    fetch(`http://localhost:3000/api/auth/openai/addScore`, {
      method:'POST',
      headers: { 
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token') 
      },
      body: JSON.stringify({ 
        score: JSON.stringify(score),
        id : JSON.stringify(user.id)
      })

  })
    .then((resp)=>{
      if (!resp.ok){
        throw new Error(`Error: ${resp.status}`)
      }
      return resp.json()
    })
    .then((data)=>{
      setScore(prev => prev + parseInt(data.score))
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  async function fetchQuizzApi(){
    try{
      setLoading(true)
      let response
      if(category != "" && difficulty!=""){
        response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}`)
      }
      else if(category == "" && difficulty !=""){
        response = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}`)
      }
      else if(category != "" && difficulty ==""){
        response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}`)
      }
      else{
        response = await fetch(`https://opentdb.com/api.php?amount=5`)
      }
        

      if (!response.ok){
        throw new Error(`Error: ${response.status}`)
      }
      setLoading(false)
      const data = await response.json()
      return data.results;
    }catch(error){
      console.log("error fetching quizzes ", error)
    }
    
  }


  async function handleStartGame(){
    if (state === "homePage"){
      let quizzesArray = await fetchQuizzApi()
        quizzesArray = quizzesArray?.map((quizz , index)=>{
        let correctanswer = quizz.correct_answer
        let incorect_answers = quizz.incorrect_answers
        let random_index = Math.floor(Math.random() * (incorect_answers.length +1 ))
        let all_answers = []
        if (random_index == incorect_answers.length ){
          all_answers = [...incorect_answers,correctanswer]
        }
        else{
          for(let i =0 ; i<incorect_answers.length; i++ ){
            if (i == random_index){
              all_answers.push(correctanswer)
              all_answers.push(incorect_answers[i])
            }
            else{
              all_answers.push(incorect_answers[i])
            }

          }
        }
      
        return {...quizz , all_inswers:all_answers,selected_answer_index:-1}
      })

    setQuizzes(quizzesArray)

    fetch('http://localhost:3000/api/auth/openai/getHint', {
        method:'POST',
        headers: { 
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('token') 
        },
        body: JSON.stringify({ 
          questions: JSON.stringify(quizzesArray.map((quizz => quizz.question)))
        })
    })
    .then((resp)=>{
      if (!resp.ok){
        throw new Error('error fetching the response from openApi')
      }
      return resp.json()
    })
    .then((data)=>{
 
      let arrayHint = JSON.parse(data.text)
      setQuizzes(prev => prev.map((quiz , index)=>{
          return {...quiz , hint:arrayHint[index]}
        })
      )
    })
    .catch((err)=>{
      console.log(err)
    })
      

    }
  }

  function handleLogout(){
    localStorage.removeItem('token')
    navigate('/home')
    setUser(null)
  }
  const checkUser = async () => {
    setLoading(true)
    const token = localStorage.getItem('token');
    console.log(token)
    console.log('checking user !!!')
    if(token) {
        fetch('http://localhost:3000/api/auth/protected', {
                method:'GET',
                headers: { 'authorization': token }
        })
        .then((response)=>{
          if(!response.ok){
            throw new Error('eror verifying the token')
          }
          return response.json()
        })
        .then((data)=>{
          setUser(data.user)
          setScore(data.user.score)
        })
        .catch((err) =>{
          console.error('Error verifying token:', err);
          localStorage.removeItem('token')
          setUser(null);
        })
        .finally((err)=>{
          setLoading(false)
        })
       
    }
    else{
      setUser(null)
      localStorage.removeItem('token')
      setLoading(false)
    }
  };

  // cheking the user in each render of the app
  useEffect(()=>{
    console.log("gggggggggggggggg")
    if (localStorage.getItem('token')){
      checkUser()
    }
    
  },[localStorage.getItem('token')])


  useEffect(()=>{
    if (user === null && !['/home','/signup','/login'].includes(location.pathname)){
      navigate('/signup')
    }
    
    else if (user !== null && location.pathname==="/signup"){

      navigate('/')
    }
  },[user,location.pathname]);

  useEffect(()=>{
    // select all elements in the DOM
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element =>{
      if (darkMood) {
        element.classList.add('darkMood')
      }else{
        element.classList.remove('darkMood')
      }
    })
  })
  

  function handleToggleMood(e){
    setDarkMood(e.target.checked)
  }

  if (loading){
    return (
      <div className='loadingPage'>
        <h1>Loading ...</h1>
      </div>
    )
  }
  
  return (
    <>
      {
        ["/login","/signup"].includes(location.pathname) &&
        <MainContent user={user} handleLogout={handleLogout}/>
      }
      

      {["/home"].includes(location.pathname) ? null : 
        <>
          <div class="bgCover"></div>
          <label htmlFor="toggleBtn" className='buttonContainer'>
            <input checked={darkMood} type="checkbox" name="toggleBtn" id="toggleBtn" className='check'  onChange={handleToggleMood}/>
            <FaMoon className='moonIcon'/>
            <FaSun className='sunIcon'/>
            <span className="toogle"></span>
            <span className='animateBg'></span>
          </label>
        </>
       }
  
      <Routes>
          <Route 
              path='/'
              element={
                        <Game setState={setState}
                        score={score}
                        user={user}
                        category={category}
                        difficulty={difficulty}
                        setCategory={setCategory}
                        setDifficulty={setDifficulty}
                        handleStartGame={handleStartGame}
                        darkMood={darkMood}
                        handleLogout={handleLogout}/>
                      }
          />
          <Route path='/home' element={<Home />}/>

          <Route path='/answer' element={<Answer calcul_corect_answer={calcul_corect_answer} 
                                            setState={setState}  
                                            quizzes={quizzes}  
                                            handleLogout={handleLogout}
                                            setQuizzes={setQuizzes}
                                            darkMood={darkMood}
                                            />}
          />

          <Route path='/check'   element={<Check nbr_correct_answer={nbr_correct_answer} 
                                          setState={setState} quizzes={quizzes}
                                          setCategory={setCategory} setDifficulty={setDifficulty} 
                                          handleLogout={handleLogout}
                                          addScore={addScore}
                                          darkMood={darkMood}
                                          />}
                                          
          />
          <Route path='/login' element={<Login setUser={setUser}  darkMood={darkMood}/>}/>
          <Route path='/signup' element={<SignUp darkMood={darkMood}/>}/>
       
  
        
      </Routes>
    </>
    
 
  )
}

