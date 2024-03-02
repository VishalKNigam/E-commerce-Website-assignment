import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductCard } from "../Components/ProductCard";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  width: 35%;
  height: auto;
  margin: auto;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.div`
  height: auto;
  margin: 10px;
  animation: ${slideIn} 0.5s ease-in-out;
`;

export const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const products = useSelector((store) => store.productReducer.products);

  useEffect(() => {
    const product = products.find((el) => el.id === +id);
    setData(product);
  }, [id, products]);

  return (
    <Wrapper>
      <Title>SingleProduct: {id}</Title>
      <ProductCard {...data} />
    </Wrapper>
  );
};
