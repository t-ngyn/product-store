import { Box, Grid } from "@mui/material";

import { ProductCard } from "./ProductCard";
import { useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProducts, selectAllProducts } from "../slices/ProductSlice";
import { SkipContext } from "../contexts/SkipContext";

export interface IProductListProps {
  sliceSize?: number;
}

export function ProductList({ sliceSize = 20 }: IProductListProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const { skip, setSkip } = useContext(SkipContext);
  const [prevSkip, setPrevSkip] = useState(skip);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setLastElement(null);
        setPrevSkip(skip);
        setSkip((skip) => skip + sliceSize);
      }
    })
  );

  useEffect(() => {
    if (products.length === 0 || prevSkip !== skip) {
      dispatch(
        fetchProducts({
          skip,
          limit: sliceSize,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, sliceSize, prevSkip, skip]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <>
      {products.length > 0 && (
        <Box textAlign="right">Showing {products.length} of 100</Box>
      )}
      <Grid container spacing={2} columns={12}>
        {products.map(
          ({ id, title, description, price, thumbnail }, index: number) => {
            const isLast = Boolean(index === products.length - 1);
            const extraProps = isLast && { ref: setLastElement };

            return (
              // @ts-expect-error Passing Ref from IntersectionObserver
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                key={id}
                className="flex flex-col items-center justify-center"
                {...extraProps}
              >
                <ProductCard
                  id={id}
                  title={title}
                  description={description}
                  price={price}
                  imageUrl={thumbnail}
                />
              </Grid>
            );
          }
        )}
      </Grid>
    </>
  );
}
