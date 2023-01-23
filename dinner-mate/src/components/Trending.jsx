import { useState } from "react"
import { useEffect } from "react"




const Trending = () => {

    const [trending, setTrending] = useState([])

    useEffect(() => {
        getTrending()
    }, [])


    const getTrending = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=8e4adb9641bf4614afe4dcb88f4b147a&number=9`)
        const data = await api.json()
        setTrending(data.recipes) 
    }
    return (
        <>
            {trending.map((recipe, id) => {
                return (
                    <div key={id}>
                        <p>{recipe.title}</p>
                    </div>
                )
            })}
        </>
    )
}

export default Trending