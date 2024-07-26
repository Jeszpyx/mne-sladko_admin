import { Title } from "@mantine/core";
import { TProduct } from "../../common/types";
import ProductCard from "./ProductCard";
import { useIntersection } from "react-use";
import { useEffect, useRef } from "react";
import { useActiveCategoryState } from "../../store/active-category.store";

const ProductsList = ({
  title,
  items,
}: {
  title: string;
  items: TProduct[];
}) => {
  const { setActiveTitle } = useActiveCategoryState();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveTitle(title);
    }
    return () => {};
  }, [intersection?.isIntersecting]);

  return (
    <div id={title} ref={intersectionRef}>
      <Title m={15}>{title}</Title>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: " 50px",
        }}
      >
        {items.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
