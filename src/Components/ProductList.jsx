import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Redux/Products/action";
import { ProductCard } from "./ProductCard";
import styled, {keyframes} from "styled-components";

export const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.getAll("gender"));
  const dispatch = useDispatch();
  const products = useSelector((store) => store.productReducer.products);
  const loading = useSelector((store) => store.productReducer.isLoading);

  const paramsObj = {
    params: {
      gender: searchParams.getAll("gender"),
      category: searchParams.getAll("category"),
      _sort:searchParams.get("order") && "price", //sorting by default is ascending (read documentation of npm json server of sort) so to avoid we do this
      _order: searchParams.get("order")        // we do it. now sort functionality will work only if order = 'asc' or 'desc' is present

    }
    
  }
  useEffect(() => {
    dispatch(getProduct(paramsObj));
  }, [searchParams]);
  console.log(products);
  return (
    <DIV>
      {loading ? (
        <LoadingIndicator>
          <Spinner />
          Loading...
        </LoadingIndicator>
      )  : (
        products.length > 0 &&
        products.map((el, i) => <ProductCard key={el.id} {...el} />)
      )}
    </DIV>
  );
};
const DIV = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-left: 2%;
`;
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #555; /* Choose your desired color */
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Light gray border */
  border-top: 4px solid #3498db; /* Blue border */
  border-radius: 50%;
  width: 40px;
  margin: 10px;
  height: 40px;
  animation: ${spin} 1s linear infinite; /* Spinning animation */
`;
