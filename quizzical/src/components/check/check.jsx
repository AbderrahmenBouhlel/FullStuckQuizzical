import { useState } from "react";
import "./checkCss/check.css"
import Blob2L from '../../assets/blob2L.png'
import Blob2R from '../../assets/blob2R.png'
import he from 'he';
import { useNavigate } from "react-router-dom";
import Logo from '../logo/logo'

export default function Check(props){
    const navigate = useNavigate()
    

    function handleReplayState(){
        if (props.nbr_correct_answer !=0 ){
            props.addScore(props.nbr_correct_answer)
        }
        
        props.setState("homePage")
        props.setDifficulty("")
        props.setCategory("")
        navigate('/')
    }

    return (
        <div className="answerContainer">
            <img src={Blob2R} alt="" className="blob right" />
            {props.darkMood ? null : <img src={Blob2L} alt="" className="blob left" />  }

            <div className="logoContainer">
                <Logo/>
            </div>
            <div className="quizzes-section">
                {props.quizzes?.map((quizz , indexquizz)=>{
                    let all_inswers = quizz.all_inswers
                    return (
                        <>
                            <div className="quizzCheck">
                                <p className="question">{he.decode(quizz.question)}</p>
                                <div className="answers">
                                    {all_inswers.map((answer,indexAnswer)=>{
                                        let secondClasseName =""
                                        if (all_inswers[indexAnswer] == quizz.correct_answer){
                                            secondClasseName="correctAnswer"
                                        }
                                        else if(indexAnswer == quizz.selected_answer_index){
                                            secondClasseName = "selecedAnswer"
                                        }
                                        
                                        return (
                                            <>
                                                <div className={"answer " + secondClasseName} >{he.decode(answer)}</div>
                                            </> 
                                        )
                                    })}
                                </div>
                                <hr/>
                            </div>
                            
                        </>
                         
                    )
                }) }

                <div className="scrore-section">
                    <p className="score">You scored {props.nbr_correct_answer != -1 ? props.nbr_correct_answer : 0 }/5 correct answers</p>
                    <button className="checkBtn" onClick={handleReplayState}>play again</button>
                </div>
                
            </div>

            

        </div>
    )
}