import style from "./Footer.module.css";

function Footer(){
    return(
        <div className={style.container}>
            <h3>&copy; {new Date().getFullYear()} Money-Gather</h3>
        </div>
    )
}

export default Footer;