import { AppShell, Text, Space, Button, Stack } from "@mantine/core";
import { Lollipop } from "lucide-react";

import { Link, Outlet } from "react-router-dom";
import { EUrlConstants } from "./common/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Layout({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate(EUrlConstants.CATEGORY);
  }, []);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <div
          style={{
            display: "flex",
            marginBottom: "25px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lollipop color="#ff00ae" />
          <Space w="xl" />
          <Text fw={700} size="xl">
            Мне сладко
          </Text>
        </div>
        <Stack h={300} align="stretch" justify="flex-start" gap="xs">
          <Button
            variant="default"
            component={Link}
            to={EUrlConstants.CATEGORY}
          >
            Категории
          </Button>
          <Button
            variant="default"
            component={Link}
            to={EUrlConstants.PRODUCTS}
          >
            Товары
          </Button>
          <Button
            variant="default"
            component={Link}
            to={EUrlConstants.SETTINGS}
          >
            Настройки
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

function Root() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default Root;
