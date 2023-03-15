import React from "react"
import Categories from "./Categories"
import "./Home.css"
import SliderHome from "./Slider"
import axios from 'axios';
async function fetchData() {
  try {
    const response = await axios.get('http://localhost:5000/api/getAllProduct');
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
          <Categories />
          <SliderHome />
        </div>
      </section>
    </>
  )
}

export default Home
