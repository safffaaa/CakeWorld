import React from "react";
import cakes from '../assets/cake2.jpg'
import CakeItems from "../components/CakeItems";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate()

  return (
    <>
    <section className="home">
      <div className="left">
        <h1>Cake Recipe</h1>
        <h5>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </h5>
        <button onClick={()=>navigate('/addCakes')}>Share your recipe</button>
      </div>
      <div className="right">
        <img src={cakes} width="320px" height="280px"></img>
      </div>
    </section>
    
    <div className="bg">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#cc9675" fillOpacity="1" d="M0,64L48,74.7C96,85,192,107,288,144C384,181,480,235,576,245.3C672,256,768,224,864,192C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </div>
        <div className="cakes">
            <CakeItems/>
        </div>
    </>
  );
}

export default Home;



