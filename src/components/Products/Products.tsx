import { Button, Flex, Menu, TextInput } from "@mantine/core";
import { MouseEventHandler, useEffect, useState } from "react";
import { useCategoryStore } from "../../store/category.store";
import { Search } from "lucide-react";
import ProductsList from "./ProductsList";
import { useActiveCategoryState } from "../../store/active-category.store";
import { useProductStore } from "../../store/product.store";
import { Link } from "react-router-dom";
import { EUrlConstants } from "../../common/constants";
import gsap from "gsap";

const Products = () => {
  const { categories, getCategories } = useCategoryStore();
  const { activeTitle } = useActiveCategoryState();
  const { products, getProducts } = useProductStore();

  const [search, setSearch] = useState<string>("");

  const categoriesMaxLen = 4;
  const visibleItems = categories.slice(0, categoriesMaxLen);
  const hiddenItems = categories.slice(categoriesMaxLen);

  // const handleScroll = (e: any) => {
  //   e.preventDefault();
  //   const targetId = e.currentTarget.getAttribute("href");
  //   const targetElement = document.querySelector(targetId);

  //   gsap.to(window, { scrollTo: targetElement.offsetTop, duration: 1 });
  //   gsap.fromTo(targetElement, { opacity: 0 }, { opacity: 1, duration: 1 });
  // };

  useEffect(() => {
    getCategories();
    getProducts(search);
    return () => {};
  }, [search]);

  return (
    <>
      <Flex
        mih={50}
        gap="md"
        justify="space-evenly"
        align="center"
        direction="row"
        wrap="wrap"
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "white",
          color: "white",
          padding: "10px",
          fontSize: "20px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            gap: "0.25rem",
          }}
        >
          {visibleItems.map((item, index) => (
            <Button
              key={index}
              component="a"
              href={`/product/#${item.title}`}
              variant={activeTitle === item.title ? "filled" : "outline"}
              color="pink"
              // onClick={handleScroll}
            >
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
                  <Menu.Item
                    variant={activeTitle === item.title ? "filled" : "outline"}
                    color="pink"
                    key={index}
                    component="a"
                    href={`/product/#${item.title}`}
                  >
                    {item.title}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
        <TextInput
          leftSection={<Search />}
          placeholder="Поиск"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          color="green"
          component={Link}
          to={EUrlConstants.PRODUCTS_CREATE}
        >
          Создать новый товар
        </Button>
      </Flex>
      {categories.map((c) => (
        <ProductsList
          title={c.title}
          items={products.filter((p) => p.category === c.title)}
          key={c.id}
        />
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
