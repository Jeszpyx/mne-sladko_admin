import { Badge, Button, Card, Flex, Image, Spoiler, Text } from "@mantine/core";
import { TProduct } from "../../common/types";
import { Carousel } from "@mantine/carousel";

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Carousel loop withIndicators height={200}>
          {product.images.map((image, index) => (
            <Carousel.Slide key={index}>
              <Image src={image.url} height={160} alt={product.title} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>
      <Flex direction="column" justify="space-between" mt="md" mb="lg">
        <Text fw={500}>{product.title}</Text>
        <Badge color="pink">{product.price} BYN</Badge>
      </Flex>
      <Flex direction="row" justify="space-between" mb={25}>
        <Badge color={product.prepaymentSale ? "lime" : "red"}>
          Предоплата
        </Badge>
        {product.prepaymentSale && (
          <Badge color="lime">{product.prepaymentSalePercent} %</Badge>
        )}
        {product.prepaymentSale && (
          <Badge color="lime">
            {Math.round((product.price / 100) * product.prepaymentSalePercent)}{" "}
            BYN
          </Badge>
        )}
      </Flex>
      <Spoiler
        maxHeight={50}
        showLabel="Развернуть"
        hideLabel="Свернуть"
        color="red"
      >
        {product.description}
      </Spoiler>

      <Flex direction="row" justify="space-evenly">
        <Button color="yellow" mt="md" radius="md">
          Изменить
        </Button>
        <Button color="red" mt="md" radius="md">
          Удалить
        </Button>
      </Flex>
    </Card>
  );
};

export default ProductCard;
