import { Head, Link } from "@inertiajs/react";
import "../../css/headerStyle.css";
import logo from "../images/logo-k13.png"

function Header(){
    return(
        <header className='header'>
            <Link to="/view/contacts/home"><span>Agenda de Contatos</span></Link>
        </header>
    )
}

export default Header;