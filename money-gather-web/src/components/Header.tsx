import style from "./Header.module.css"

function Header() {
    return(
      <div className={style.header_div}>
          <p className={style.logo}>LOGO</p>
          <a className={style.route}> Home </a>
          <a className={style.route}> Goals </a>
          <a className={style.route}> About </a>

      </div>
    );
}

export default Header;