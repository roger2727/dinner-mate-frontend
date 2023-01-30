import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { Splide, SplideSlide} from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"

const TodayPicks = () => {
    
    const [todayspicks, setTodayspicks] = useState([])

    useEffect(() => {
        getTodaysPicks()
    }, [])


    const getTodaysPicks = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=3de3f02471d649daa170cd106fa968f0&number=9`)
        const data = await api.json()
        setTodayspicks(data.recipes) 
    }
    return (
        <>
            <Wrapper>
                <h3>Today's Picks</h3>
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    gap: "5rem",
                }}>
                {todayspicks.map((recipe) => {
                    return (
                        <SplideSlide>
                            <Card>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient />
                            </Card>
                        </SplideSlide>                              
                    )
                })}                            
                </Splide>
            </Wrapper>
        </>
)
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25%;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        postion: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        
    }

    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
`;

const Gradient = styled.div`
    z-index: 3;
    postion: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;


export default TodayPicks