import DailyPost_logo from '../assets/img/DailyPost_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAPIContext } from '../Context/Context';
import { useNavigate} from 'react-router-dom';

export default function MenuPages() {

    const context = useAPIContext();
    const navigate = useNavigate();
    const logoutFuntion = () => {
        context.logout(); 
        navigate("/");  
    }

    

    return(
        <div className="flex justify-between items-center bg-white fixed w-screen px-2">
            <img className="w-1/6 p-3" src={DailyPost_logo} alt="Daily Post"></img>
            <button 
            onClick={()=>{logoutFuntion()}} className="bg-transparent hover:bg-purple-400 text-purple-600 font-semibold hover:text-white py-1 px-3 border border-purple-400 hover:border-transparent rounded-md text-sm mr-4">Cerrar sesion <FontAwesomeIcon icon={faSignOutAlt}/>
            </button>
        </div>
    )
}