import {
  Fieldset,
  NumberInput,
  Select,
  Switch,
  TextInput,
  Textarea,
  Flex,
  rem,
  Group,
  Text,
  Image,
  SimpleGrid,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../../store/category.store";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { useProductStore } from "../../store/product.store";

interface IProductCreateUpdate {
  type: "create" | "update";
}

const ProductCreateUpdate = ({ type }: IProductCreateUpdate) => {
  const { getCategories, categories } = useCategoryStore();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [prepaymentSale, setPrepaymentSale] = useState<boolean>(false);
  const [prepaymentSaleCount, setPrepaymentSaleCount] = useState<number>(100);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const { createProduct } = useProductStore();

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        h={200}
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });
  useEffect(() => {
    getCategories();
    if (type === "update") {
    }
  }, []);

  return (
    <Fieldset legend="Новый товар" variant="filled">
      <Select
        label="Категория"
        data={categories.map((c) => c.title)}
        onChange={(e) => setCategory(e as string)}
      />
      <TextInput
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <NumberInput
        label="Стоимость"
        value={price}
        onChange={(e) => setPrice(e as number)}
        suffix=" BYN"
      />
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="row"
      >
        <Switch
          my={30}
          color="grape"
          checked={prepaymentSale}
          onChange={() => setPrepaymentSale(!prepaymentSale)}
          label="Предоплата"
        />
        {prepaymentSale && (
          <NumberInput
            min={0}
            max={100}
            value={prepaymentSaleCount}
            onChange={(e) => setPrepaymentSaleCount(e as number)}
            suffix="%"
          />
        )}
        {prepaymentSale && (
          <Text>{Math.round((price / 100) * prepaymentSaleCount)} BYN</Text>
        )}
      </Flex>
      <Dropzone onDrop={setFiles} accept={IMAGE_MIME_TYPE}>
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Перетащите изображения сюда или нажмите, чтобы выбрать файлы
            </Text>
          </div>
        </Group>
      </Dropzone>
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        {previews}
      </SimpleGrid>
      <Flex direction="row" align="center" justify="center" m={30}>
        <Button
          variant="filled"
          color="green"
          onClick={() =>
            createProduct({
              category,
              description,
              images: files,
              prepaymentSale,
              prepaymentSalePercent: prepaymentSaleCount,
              price,
              title,
            })
          }
        >
          Сохранить
        </Button>
        <Button variant="filled" color="red">
          Отмена
        </Button>
      </Flex>
    </Fieldset>
  );
};

export default ProductCreateUpdate;
