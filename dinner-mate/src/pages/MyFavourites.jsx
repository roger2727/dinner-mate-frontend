import React, { useState } from 'react'
import styled from "styled-components"
import { Link, useParams } from 'react-router-dom'

const [myRecipes, setMyRecipes] = useState([])
let params = useParams()

const getMyRecipes = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=8e4adb9641bf4614afe4dcb88f4b147a&cuisine=${name}`)
    const myrecipes = await data.json()
    setMyRecipes(myrecipes.results)
}

useEffect(() => {
    getMyRecipes(params.type)
}, [params.type])
