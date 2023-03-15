import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/fishing-rod.png",
      cateName: "Fishing Rod",
    },
    {
      cateImg: "./images/category/fishing-reel.png",
      cateName: "Fishing Reels",
    },
    {
      cateImg: "./images/category/fishing-baits.png",
      cateName: "Lures/Baits",
    },
    {
      cateImg: "./images/category/fishing-hook.png",
      cateName: "Fishing Hook",
    },
    {
      cateImg: "./images/category/fishing-line.png",
      cateName: "Fishing Line",
    },
    {
      cateImg: "./images/category/fishing-vest.png",
      cateName: "Clothing",
    },
    {
      cateImg: "./images/category/coupon.png",
      cateName: "Sales",
    },
   
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
