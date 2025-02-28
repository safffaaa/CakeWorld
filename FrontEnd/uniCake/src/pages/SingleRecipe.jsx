import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'

function SingleRecipe() {

    const {id} = useParams()
    const [recipe,setRecipe] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/cakes/${id}`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error("Error fetching recipe:", error));
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

   return (
        <div className="single-recipe-container">
            <h2>{recipe.title}</h2>
            <img src={`http://localhost:8000/images/${recipe.coverImage}`} width="150px" height="180px" alt={recipe.title} />
            <p><strong>Time:</strong> {recipe.time}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> {recipe.instruction}</p>
        </div>
    );
}

export default SingleRecipe