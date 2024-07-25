import {
  Button,
  Flex,
  Menu,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { api } from "../../api/api";
import { EUrlConstants } from "../../common/constants";
import { useCategoryStore } from "../../store/category.store";
import { Search } from "lucide-react";
import ProductsList from "./ProductsList";
import { TProduct } from "../../common/types";


const Products = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const { categories } = useCategoryStore();

  const categoriesMaxLen = 4;
  const visibleItems = categories.slice(0, categoriesMaxLen);
  const hiddenItems = categories.slice(categoriesMaxLen);
  useEffect(() => {
    api.get(EUrlConstants.PRODUCTS).then((res) => setProducts(res.data));

    return () => {};
  }, []);

  return (
    <>
      <Flex
        mih={50}
        gap="md"
        justify="space-evenly"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <div
          style={{
            display: "inline-flex",
            gap: "0.25rem",
          }}
        >
          {visibleItems.map((item, index) => (
            <Button key={index} variant="outline" color="pink">
              {item.title}
            </Button>
          ))}
          {hiddenItems.length > 0 && (
            <Menu>
              <Menu.Target>
                <Button variant="outline" color="pink">
                  ...
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {hiddenItems.map((item, index) => (
                  <Menu.Item key={index}>{item.title}</Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
        <TextInput leftSection={<Search />} placeholder="Поиск" />
        <Button color="green">Создать новый товар</Button>
      </Flex>
      {categories.map((c) => (
        <ProductsList title={c.title} items={products.filter(p => p.category === c.title)}/>
      ))}
    </>
  );

  // const rows = products.map((element) => (
  //   <Table.Tr key={element.id}>
  //     <Table.Td>
  //       <Image
  //         src={element.images.length && element.images[0].url}
  //         alt=""
  //         w={150}
  //         h={150}
  //       />
  //     </Table.Td>
  //     <Table.Td>{element.title}</Table.Td>
  //     <Table.Td>{element.description}</Table.Td>
  //     <Table.Td>{element.category}</Table.Td>
  //     <Table.Td>{element.price}</Table.Td>
  //   </Table.Tr>
  // ));
  // return (
  //   <Table>
  //   <Table.Thead>
  //     <Table.Tr>
  //       <Table.Th>Element position</Table.Th>
  //       <Table.Th>Element position</Table.Th>
  //       <Table.Th>Element name</Table.Th>
  //       <Table.Th>Symbol</Table.Th>
  //       <Table.Th>Atomic mass</Table.Th>
  //     </Table.Tr>
  //   </Table.Thead>
  //   <Table.Tbody>{rows}</Table.Tbody>
  // </Table>
  // )
};

export default Products;
