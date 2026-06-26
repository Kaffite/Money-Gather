import style from "./Header.module.css"
import {NavLink} from "react-router";

function Header() {

    return(
      <div className={style.container} style={{fontFamily: "Simonetta_400Regular"}}>
          <p className={style.logo}>LOGO</p>
          <nav>
              <NavLink to={"/"} className={style.route} end>
                  Home
              </NavLink>
              </nav>
          <nav>
              <NavLink to={"/goals"} className={style.route} end>
                  Goals
              </NavLink>
          </nav>
          <a className={style.route}>About</a>
          <a className={style.route + " " + style.right_side}>Log In</a>
          <a className={style.route}>Sign up </a>
          <img alt={"profilePic"} src={"profile.png"} className={style.profile_Pic}/>

      </div>
    );
}

export default Header;