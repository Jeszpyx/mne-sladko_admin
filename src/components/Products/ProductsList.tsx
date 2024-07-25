import { Title } from "@mantine/core";;
import { TProduct } from "../../common/types";
import ProductCard from "./ProductCard";

const ProductsList = ({
  title,
  items,
}: {
  title: string;
  items: TProduct[];
}) => {
  return (
    <>
      <Title m={15}>{title}</Title>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: " 50px",
        }}
      >
        {items.map((p) => (
          <ProductCard product={p}
          />
        ))}
      </div>
    </>
  );
};

export default ProductsList;
