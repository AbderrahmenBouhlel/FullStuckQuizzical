import { useEffect, useRef, useState } from "react";
import "./gameCss/game.css"
import Blob1L from '../../assets/blob1L.png'
import Blob1R from '../../assets/blob1R.png'
import {quizCategories,difficulties} from '../../assets/category.js'
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Logo from "../logo/logo.jsx";
import LogOut from "../logout/logout.jsx";
import levelNames from "./level.js"
import LevleIcon from "../levelIcon/levelIcon.jsx";
import LevelBar from "../levelBar/levelBar.jsx";



export default function Game(props){
    const optionDiff = useRef("")
    const optionCat = useRef("")
    const [categoryTopic,setCategoryTopic] = useState("select a category")
    const navigate = useNavigate()
    const [score , setScore] = useState(props.user?.score)
    
    let currentLevel = levelNames.find(level => score >= level.minScore && score <= level.maxScore)
  
    useEffect(()=>{

        outerloop:
        for(let item of quizCategories){
            if (item.id){
                if(item.id == props.category ){
                    setCategoryTopic(item.topic)
                    break outerloop;
                }
            }
            else{
                for (let cat of item.categories){
                    if(cat.id === props.category ){
                        setCategoryTopic(cat.topic)
                        break outerloop;
                    }
                }
            }
        }

        
    },[props.category])

    useEffect(()=>{
        setScore(props.score)
    },[props.score])


    function handleStartBtnClique(){
        props.setState('answerPage')
        props.handleStartGame()
        navigate('/answer')
    }


    function handleDiffChoice(e, difficulty) {
        let inputDiff = optionDiff.current.querySelector('input')
        inputDiff.checked = false;
        props.setDifficulty(difficulty);
    }


    function handleCatChoice(e, catId) {
        let inputsCat = optionCat.current.querySelectorAll('input')
        inputsCat.forEach((input,index)=>{
            if(input.checked){
                input.checked=false
            }
        })
        props.setCategory(catId);
    }
    
    return (
        <div className="gameContainer">
            <div className="logoContainer">
                <Logo/>
            </div>
            <div className="logoutContainer"> 
                <LogOut handleLogout={props.handleLogout} />
            </div>
            <div className="score"> 
                <div className="levelIconCont">
                    <LevleIcon levelNumber={currentLevel?.level}/>
                    <p className="level">level: {currentLevel?.name}</p>
                </div>
                <div className="levelBarCont">
                    <LevelBar  maxScore={currentLevel?.maxScore} minScore={currentLevel?.minScore} score={score}/>
                    <p className="score">current score : {score}/{currentLevel?.maxScore}</p>
                </div>
            </div>
            
            <img src={Blob1R} alt="" className="blob right" />
            {props.darkMood ? <img src={Blob1R} alt="" className="blob leftYello" /> : <img src={Blob1L} alt="" className="blob left" />  }

            <div className="intro-section">
                <h1 className="title">Quizzical</h1>
                <p className="description">Your go-to for fun quizzes! Test your knowledge, challenge your friends, and enjoy a world of trivia excitement. Start playing now!</p>

                <div className="options">
                    <div className="option categories" ref={optionCat}>
                        <label htmlFor="gameBtn-selectChekBox" className="catLabel">
                            {categoryTopic}
                            <IoMdArrowDropdown  className="dropDownIcon"/>
                        </label>
                        <input type="checkbox"  id="gameBtn-selectChekBox" />
                        <ul className="menu">
                            {
                                quizCategories.map((element , index)=>{
                                    if (element.categoryGroup != undefined){
                                        return (
                                            <li key={index}>
                                                <label htmlFor={"gameBtn-"+element.categoryGroup} className={element.categoryGroup}>
                                                    {element.categoryGroup}
                                                    <IoMdArrowDropdown  className="dropDownIcon"/>
                                                </label>
                                                <input type="checkbox"  id={"gameBtn-"+element.categoryGroup}/>
                                                <ul>
                                                    {element.categories.map((cat,indexCat)=>{
                                                        return <li key={indexCat} onClick={(e)=>handleCatChoice(e,cat.id)}  value={cat.id} >{cat.topic}</li>
                                                    })}
                                                </ul>
                                            </li>
                                        )
                                        

                                    }
                                    else{
                                        return <li key={index} onClick={(e)=>handleCatChoice(e,element.id)} >{element.topic}</li>
                                    }
                                    
                                })
                            }
                        </ul>

                    </div>
                    <div className="option difficulties" ref={optionDiff}>
                        <label htmlFor="gameBtn-select-diff" className="Label">
                            {props.difficulty ? props.difficulty : "select a difficulties"}
                            <IoMdArrowDropdown  className="dropDownIcon"/>
                        </label>
                        <input type="checkbox"  id="gameBtn-select-diff" />
                        <ul className="menu">
                            {
                                difficulties.map((diff , index)=>{
                                    return <li key={index} onClick={(e)=>{handleDiffChoice(e,diff.difficulty)}}>{diff.difficulty}</li> 
                                })
                            }
                        </ul>

                    </div>

                </div>
                
               
                <button onClick={handleStartBtnClique} className="startBtn">Start quiz</button>
            </div>

        </div>
    )

}