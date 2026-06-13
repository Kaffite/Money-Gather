import style from "./Header.module.css"

function Header() {

    return(
      <div className={style.container} style={{fontFamily: "Simonetta_400Regular"}}>
          <p className={style.logo}>LOGO</p>
          <a className={style.route}>Home</a>
          <a className={style.route}>Goals</a>
          <a className={style.route}>About</a>
          <a className={style.route + " " + style.right_side}>Log In</a>
          <a className={style.route}>Sign up </a>
          <img alt={"profilePic"} src={"profile.png"} className={style.profile_Pic}/>

      </div>
    );
}

export default Header;