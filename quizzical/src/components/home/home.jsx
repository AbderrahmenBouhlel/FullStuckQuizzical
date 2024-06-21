import { useState, useRef } from "react";
import homeBg from '../../assets/homeBg.jpg'
import './homeCss/home.css'
import { IoLogoGameControllerB } from 'react-icons/io';
import { FaFacebook ,FaTwitter,FaLinkedin,FaInstagram,FaPhone} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export default function Home(props){
    const gameInfoRef = useRef(null)
    const contactUsRef = useRef(null)
    const homeRef = useRef(null)
    const navigate = useNavigate()


    function scrollToConcept(e){
        e.preventDefault()
        gameInfoRef.current.scrollIntoView({behavior:'smooth'})
    }
    function scrollToContatUs(e){
        e.preventDefault()
        contactUsRef.current.scrollIntoView({behavior:'smooth'})
    }
    function scrollToHome(e){
        e.preventDefault()
        homeRef.current.scrollIntoView({behavior:'smooth'})
    }
    function handleGameStart(){
        navigate('/')
    }



    function handleSignUp(){
        navigate('/')
    }


    return (
        <div className="homePage">
            <nav className="HomeNav">
                <div className="homeLogo">
                    <IoLogoGameControllerB className="logoImg" />
                    <p className="title">Quiz Arena</p>
                </div>
                <div className="options">
                    <div className="option">
                        <a href="" onClick={scrollToConcept}>Our Concept</a>
                    </div>
                    <div className="option">
                        <a href="" onClick={scrollToContatUs}>contact Us</a>
                    </div>
                    <div className="option">
                        <a onClick={handleSignUp}>signUp</a>
                    </div>
                </div>
            </nav>
            <section className="section header" ref={homeRef}>
                <img src={homeBg} alt="" className="img"/>
                <div className="text">
                    <p className="title">
                        BIM BAM BUZZ !
                    </p>
                    <p className="def">
                        CHALLENGE YOUR KNOWLEDGE WITH OUR FAST-PACED QUIZ GAME!
                        FACE 5 QUESTIONS AND PUT YOUR SKILLS TO THE TEST!
                    </p>
                    <button onClick={handleGameStart} className="ctPlay">play now !!</button>
                </div>
            </section>
            <section className="section gameInfo" ref={gameInfoRef}>
                <p className="pageTitle">Our Concept</p>
                <div className="info">
                    <p className="title">
                        EXPERIENCE THE THRILL OF A TV GAMESHOW
                    </p>
                    <p className="text">
                        I-Quiz is a real-life quiz game inspired by the excitement and drama 
                        of TV gameshows. Whether you’re with family, friends, or colleagues, 
                        you’ll take your place at the podium, ready to race your opponents to
                        the buzzer in a single round. Immerse yourself in the vibrant
                        TV gameshow atmosphere and test your knowledge against others.
                    </p>
                </div>
                <div className="info">
                    <p className="title">
                        CUSTOMIZE YOUR CHALLENGE
                    </p>
                    <p className="text">
                        Choose your difficulty level—easy, medium, or hard—and select from a
                        wide range of genres such as music, cinema, sports, video games,
                        history, science, TV series, society, literature, and cartoons. Tailor your
                        quiz experience to your interests and skill level, and get ready for a stimulating and enjoyable challenge.
                    </p>
                </div>
                <div className="info">
                    <p className="title">
                        SCORE AND ENTITLEMENTS
                    </p>
                    <p className="text">
                        In each round, you will earn points based on the number of correct 
                        answers and the difficulty level you selected. Your score will be 
                        recorded in your account, and you will earn one of four entitlements based on your performance. Compete for the 
                        titles of Quiz Enthusiast, Knowledge Seeker, Trivia Master, and Quiz Legend, and showcase your quiz prowess.
                    </p>

                </div>
                <div className="info">
                    <p className="title">
                        FUN FOR EVERYONE
                    </p>
                    <p className="text">
                        Our quiz game is designed for everyone to enjoy, regardless of age or background.
                        Perfect for birthdays, team-building sessions, stag or hen parties, or just a fun night out, I-Quiz promises an engaging and inclusive experience for all. 
                        Our quiz rooms are fully accessible and can accommodate up to 12 players
                    </p>
                </div>


            </section>
            <section className="section contactUs" ref={contactUsRef}>
                <div className="description">
                    <h2 className="desTitle">Contact Us </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    <div className="coords">
                        <div className="coord">
                            <div className="iconContainer">
                                <FaPhone  className="icon"/>
                            </div>
                            <div className="text">
                                <h3 className="title">PHONE</h3>
                                <p>+00 110 111 00</p>
                            </div>

                        </div>
                        <div className="coord">
                            <div className="iconContainer">
                                <MdEmail  className="icon"/>
                            </div>
                            <div className="text">
                                <h3 className="title">EMAIL</h3>
                                <p>abderrahmenBouhlel@gmail.com</p>
                            </div>
                        </div>
                        <div className="coord">
                            <div className="iconContainer">
                                <FaLocationDot  className="icon"/>
                            </div>
                            <div className="text">
                                <h3 className="title">LOCATION</h3>
                                <p>7 Flowers Street, 37000 Tours, France</p>
                            </div>
                        </div>
                    </div>
                   
                
                </div>
                <div className="form">
                    <div className="inputGroupe Half_Width">
                        <input type="text" name="name" id="name1"/>
                        <label htmlFor="email1">Enter your Name</label>
                    </div>
                    <div className="inputGroupe Half_Width">
                        <input type="text" name="email" id="email1" />
                        <label htmlFor="email1">Email</label>
                    </div>
                    <div className="inputGroupe Full_Width">
                        <input type="text" name="subject" id="subject1" />
                        <label htmlFor="email1">Subject</label>
                    </div>
                    <div className="inputGroupe Full_Width">
                        <textarea name="textAria" id="textAriaId"/>
                        <label htmlFor="email1">Say Something</label>
                    </div>
                    
                    <button className="sendBtn">Send Message</button>

                </div>
            </section>
            <section className="section footer">
                <div className="waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                    <div className="wave" id="wave3"></div>
                    <div className="wave" id="wave4"></div>
                </div>
                <ul className="sicial_icon">
                    <li>
                        <FaFacebook className="icon"/>
                    </li>
                    <li>
                        <FaTwitter className="icon"/>
                    </li>
                    <li>
                        <FaLinkedin className="icon"/>
                    </li>
                    <li>
                        <FaInstagram className="icon"/>
                    </li>
                    
                </ul>
                <ul className="menu">
                    <li onClick={scrollToHome}>Home</li>
                    <li onClick={scrollToContatUs}>contact</li>
                </ul>

            </section>
        </div>
    )
}