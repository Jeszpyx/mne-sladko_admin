import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { TProduct } from "../../common/types";

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={product.images.length && product.images[0].url}
          height={160}
          alt={product.title}
        />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.title}</Text>
        <Badge color="pink">{product.price} BYN</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {product.description}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
};

export default ProductCard;
