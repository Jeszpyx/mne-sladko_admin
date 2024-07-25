import { Button, Container, Group, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../../store/category.store";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { EUrlConstants } from "../../common/constants";
import { TCategory } from "../../common/types";

const CategoryEdit = () => {
  const [title, setTitle] = useState<string>("");
  const { updateCategory } = useCategoryStore();
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get<TCategory>(`${EUrlConstants.CATEGORY}/${categoryId}`)
      .then(({ data }) => {
        setTitle(data.title);
      });
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form style={{ width: "400px", marginTop: "200px" }}>
        <TextInput
          label="Название"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
          labelProps={{ mb: "15px" }}
          data-autofocus
        />
        <Group mt="md" display={"flex"} justify="center">
          <Button
            variant="filled"
            color="yellow"
            onClick={() => {
              updateCategory(categoryId!, title);
              navigate(-1);
            }}
          >
            Обновить
          </Button>
          <Button variant="filled" color="red" onClick={() => navigate(-1)}>
            Отмена
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default CategoryEdit;
