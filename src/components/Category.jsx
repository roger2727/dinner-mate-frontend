import React from "react";
import { AiOutlineCoffee } from "react-icons/ai";
import { GiChopsticks } from "react-icons/gi";
import { BiCake } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { CiPizza } from "react-icons/ci";
import styled from "styled-components";

const Category = () => {
  return (
    <List>
      <Slink to={"/mealTime/Breakfast"}>
        <AiOutlineCoffee />
        <h4>Breakfast</h4>
      </Slink>
      <Slink to={"/mealTime/Lunch"}>
        <CiPizza />
        <h4>Lunch</h4>
      </Slink>
      <Slink to={"/mealTime/Dinner"}>
        <GiChopsticks />
        <h4>Dinner</h4>
      </Slink>
      <Slink to={"/mealTime/Dessert"}>
        <BiCake />
        <h4>Dessert</h4>
      </Slink>
    </List>
  );
};

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
    @media (max-width: 576px) {
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
`;

const Slink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 2rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  @media (max-width: 576px) {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
  }

  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
    transition: 2s ease-in-out 1s;
  }

  h4 {
    color: white;
    font-size: 0.8rem;
    @media (max-width: 576px) {
      font-size: 0.6rem;
    }
  }

  svg {
    color: white;
    font-size: 1.5rem;
    @media (max-width: 576px) {
      font-size: 1.2rem;
    }
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    svg {
      color: white;
      font-size: 1.8rem;
    }
    h4 {
      color: white;
    }
  }
`;

export default Category;
