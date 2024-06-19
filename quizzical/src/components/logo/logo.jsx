
import { useNavigate } from 'react-router-dom';
import './logo.css'
import { IoLogoGameControllerB } from 'react-icons/io';



export default function Logo(props){
    const navigate = useNavigate();

    const handleHomeNav = () => {
        navigate('/home');
    };

    return (
        <div className="logo" onClick={handleHomeNav}>
            <IoLogoGameControllerB className="logoImg" />
            <p className="title">Quiz Arena</p>
        </div>
   
    )
}