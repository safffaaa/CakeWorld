import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { MdWatchLater } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";


function CakeItems() {
  const allItem = useLoaderData();
  const [allRecipe,setAllRecipe] = useState()
  const [isFaveitem,setIsFavitem] = useState(false)
  let path = window.location.pathname === '/MyRecipe' ? true : false
  let favItem = JSON.parse(localStorage.getItem("fav"))?? []

  const navigate = useNavigate()

  useEffect(()=>{
    setAllRecipe(allItem)
  },[allItem])

  const onDelete = async (id) => {  
    if (window.confirm("Are you sure you want to delete this recipe?")) { 
        try {
            await axios.delete(`http://localhost:8000/cakes/${id}`);
            alert("Recipe deleted successfully!"); 
            setAllRecipe(allRecipe => allRecipe.filter(item => item._id !== id)); 
            let filterItem = favItem.filter(recipe => recipe._id !== id)
            localStorage.setItem("fav",JSON.stringify(filterItem))
            window.location.reload(); 
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    }
};

    const favCakes = (item) =>{
        let filterItem = favItem.filter(recipe => recipe._id !== item._id)
        favItem = favItem.filter(recipe => recipe._id === item._id).length === 0 ? [...favItem,item] : filterItem
        localStorage.setItem("fav",JSON.stringify(favItem))
        setIsFavitem(pre => !pre)
    }

  return (
    <>
        <div className='card-container'>
            {
                allItem?.map((item, index) => {
                    return (
                        <div key={index} className='card'>
                           <img src={`http://localhost:8000/images/${item.coverImage}`} width="150px" height="180px" onClick={()=>navigate(`/sigleCake/${item._id}`)}  style={{ cursor: "pointer" }}></img>
                            <div className='card-body'>
                                <div className='title'>{item.title}</div>
                                <div className='icons'>
                                    <div className='timer'><MdWatchLater />{item.time}</div>
                                    {(!path) ? <FaHeart onClick={()=>favCakes(item)} style={{color:(favItem.some(res => res._id ===item._id)) ? "red" : ""}}/> :
                                     <div className="action">
                                        <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                        <MdDelete  onClick={()=>onDelete(item._id)} className="deleteIcon"/>
                                     </div>
                                    }   
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
