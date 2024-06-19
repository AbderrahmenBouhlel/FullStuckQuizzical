import './logout.css'
import { CiLogout } from "react-icons/ci";




export default function LogOut(props){
    return (
        <div className="iconCont logoutCont"  onClick={props.handleLogout}>
            <CiLogout className="icon" />
        </div>
    )
}