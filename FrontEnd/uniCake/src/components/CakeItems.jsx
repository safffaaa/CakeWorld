import React from "react";
import { useLoaderData } from "react-router-dom";
// import cakeImg from "../assets/cake1.jpg";
import { MdWatchLater } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

function CakeItems() {
  const allItem = useLoaderData();
  console.log(allItem);

  return (
    <>
        <div className='card-container'>
            {
                allItem?.map((item, index) => {
                    return (
                        <div key={index} className='card'>
                            <img src={`http://localhost:3001/images/${item.coverImage}`} width="120px" height="100px"></img>
                            <div className='card-body'>
                                <div className='title'>{item.title}</div>
                                <div className='icons'>
                                    <div className='timer'><MdWatchLater />30 mint</div>
                                     <FaHeart/>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
)
}

export default CakeItems;
