import { useNavigate } from "react-router-dom";

export const Landing = ()=>{
    const navigate = useNavigate();
    return   <div>    
        <button onClick={()=>{
            navigate("/game")}}>Play Online</button>
    </div>
}