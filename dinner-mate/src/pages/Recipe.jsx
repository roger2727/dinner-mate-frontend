import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import Category from '../components/Category'



const Recipe = () => {

    const { id } = useParams()
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState('instructions')


    const fetchDetails = async () => {
        const res = await fetch(`https://dinner-mate-backend-production.up.railway.app/public/${id}`)
        const data = await res.json()
        setDetails(data.recipe)

    }

    useEffect(() => {
        fetchDetails()
    }, [id])
    return (
        <>
            <Navbar />
            <Search />
            <Category />
            <DetailWrapper>
                <div>
                    <h2>{details.title}</h2>
                    <img src={details.image} alt="" />
                    <StarRating />
                </div>
                <Info>
                    <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
                    <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
                </Info>
            </DetailWrapper>
        </>
        
    )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    h2 {
        margin-bottom: 2rem;
    }
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
    
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 10rem;

`;

export default Recipe