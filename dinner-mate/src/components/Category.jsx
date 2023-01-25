import React from "react";
import { AiOutlineCoffee } from "react-icons/ai";
import { GiChopsticks } from "react-icons/gi";
import { BiCake } from "react-icons/bi";
// import { Navlink } from "react-router-dom"

const Category = () => {
  return (
    <List>
      <Slink>
        <AiOutlineCoffee />
        <h4>Breakfast</h4>
      </Slink>
      <Slink>
        <MdOutlineLunchDin />
        <h4>Lunch</h4>
      </Slink>
      <Slink>
        <GiChopsticks />
        <h4>Dinner</h4>
      </Slink>
      <Slink>
        <BiCake />
        <h4>Desert</h4>
      </Slink>
    </List>
  );
};

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
`;

const Slink = styled(Navlink)`
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

  h4 {
    color: white;
    font-size: 8rem;
  }
  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`;

export default Category;
