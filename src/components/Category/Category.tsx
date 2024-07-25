import {
  ActionIcon,
  Button,
  CloseButton,
  Input,
  Modal,
  Stack,
  Table,
} from "@mantine/core";
import { useCategoryStore } from "../../store/category.store";
import { useEffect, useState } from "react";
import { CircleX, Pencil } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

const Category = () => {
  const { categories, getCategories, createCategory, deleteCategory } =
    useCategoryStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    getCategories();
    return () => {};
  }, []);

  const rows = categories.map((category) => (
    <Table.Tr key={category.id}>
      <Table.Td
        style={{
          width: "60%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {category.title}
      </Table.Td>
      <Table.Td>{category.productsCount}</Table.Td>
      <Table.Td
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ActionIcon
          variant="filled"
          color="yellow"
          size="lg"
          radius="lg"
          aria-label="Редактировать"
          style={{
            marginRight: "15px",
          }}
          component={Link}
          to={category.id}
        >
          <Pencil />
        </ActionIcon>
        <ActionIcon
          variant="filled"
          color="red"
          size="lg"
          radius="lg"
          aria-label="Удалить"
          onClick={() => deleteCategory(category.id)}
        >
          <CircleX />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Создание новой категории"
        centered
      >
        <Stack
          h={300}
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap="sm"
        >
          <Input
            radius="md"
            placeholder="Название"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setValue("")}
                style={{ display: value ? undefined : "none" }}
              />
            }
          />
          <Button
            color="green"
            onClick={() => {
              createCategory(value);
              close();
              setValue("");
            }}
          >
            Создать
          </Button>
          <Button
            color="red"
            onClick={() => {
              setValue("");
              close();
            }}
          >
            Отмена
          </Button>
        </Stack>
      </Modal>
      <Button
        variant="filled"
        color="green"
        fullWidth
        style={{ marginBottom: "15px" }}
        onClick={open}
      >
        Создать новую категорию
      </Button>
      <Table stickyHeader highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th
              style={{
                width: "60%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Название
            </Table.Th>
            <Table.Th style={{ width: "25%" }}>Кол-во продуктов</Table.Th>
            <Table.Th style={{ width: "15%" }}>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default Category;
