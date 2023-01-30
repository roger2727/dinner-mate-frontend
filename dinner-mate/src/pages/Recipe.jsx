import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'



const Recipe = () => {

    let params = useParams()
    const [details, setDetails] = useState()

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=8e4adb9641bf4614afe4dcb88f4b147a`)
        const detailData = await data.json()

    }
    return (
        <div>Recipe</div>
    )
}

export default Recipe