import { useEffect, useState } from "react";
import "./answerCss/answer.css"
import Blob2L from '../../assets/blob2L.png'
import Blob2R from '../../assets/blob2R.png'
import he from 'he';
import { useNavigate } from "react-router-dom";
import Logo from '../logo/logo.jsx'
import { BiSolidBinoculars } from "react-icons/bi";

export default function Answer(props){

    const [showContainer ,setShowContainer] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowContainer(true)
        },400)
        return ()=> clearTimeout(timer);
    },[])
    function handleAnswerClique(indexAnswer,indexquizz){
        props.setQuizzes((prev)=>{
            return prev.map((quizz,indexQ)=>{
                if(indexquizz == indexQ){
                    if(indexAnswer == quizz.selected_answer_index ){
                        return {...quizz , selected_answer_index:-1}
                    }
                    return {...quizz , selected_answer_index:indexAnswer}
                }
                return quizz
            })
        })
       
    }

    function checkStateChanger(){
        props.calcul_corect_answer();
        props.setState("checkPage")
        navigate('/check')
    }

   
    return (

        <>
            {showContainer ?  
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
                                    <div className="quizz" key={indexquizz}>
                                        <div className="hintIcon" >
                                            <BiSolidBinoculars />
                                        </div>
                                     
                                        {quizz.hint ? 
                                            <p className="hintTxt">{quizz.hint}</p>
                                            :
                                            <p className="hintTxt">witing for hint ...</p>
                                        }
                                    
                                        
                                        
                                        <p className="question">{he.decode(quizz.question)}</p>
                                        <div className="answers">
                                            {all_inswers.map((answer,indexAnswer)=>{
                                                return (
                                                    <>
                                                        <div className={"answer " + (quizz.selected_answer_index == indexAnswer ? "selected":null)} onClick={()=> handleAnswerClique(indexAnswer,indexquizz)}>{he.decode(answer)}</div>
                                                    </> 
                                                )
                                            })}
                                        </div>
                                        <hr/>
                                    </div> 
                                </>
                                
                            )
                        }) }

                        <button className="checkBtn" onClick={checkStateChanger}>Check answers</button>
                    </div>
                    
                </div>
                : <div className="waiting">the excitement is loading! ...</div>
            }

        </>
    )
}