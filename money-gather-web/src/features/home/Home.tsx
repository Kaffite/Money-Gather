import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import style from "./Home.module.css"

function Home(){
    return(
        <div className={style.container}>
            <Header/>
            <h1
                className={style.title}>
                Money-Gather Website - Personal Finance Helper
            </h1>
            <h2>Text</h2>
            <Footer/>
        </div>
    )
}

export default Home;