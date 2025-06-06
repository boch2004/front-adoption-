import { useSelector } from "react-redux";
import Carduser from "../Carduser";


function Les_utlisateurs({ ping, setping }) {
    const user = useSelector((state) => state.user.userlist);
    return (
        <>
            <h1 style={{textAlign:"center"}}> Les utlisateurs</h1>
            <li className="user-header">
                <span style={{ width: 200 }}>Nom d'utilisateur</span>
                <span style={{ width: 100 }}>Prénom</span>
                <span style={{ width: 200 }}>Email</span>
                <span style={{ width: 100 }}>Téléphone</span>
                <span style={{ width: 200 }}>Localisation</span>
                <span style={{ width: 50 }}>Supprimer</span>
            </li>
            <div className="card-user" >
                {user?.filter(u => u.category !== "admin").map((el) => (<Carduser ping={ping} setping={setping} key={el.id} user={el} />))}
            </div>
        </>
    )
}

export default Les_utlisateurs;
