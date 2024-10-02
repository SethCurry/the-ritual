import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu/menu";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ScryfallLogo from "../components/icons/ScryfallLogo";
import { SettingOutlined } from "@ant-design/icons";

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  label: string;
  link?: string;
  icon: JSX.Element;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    link: "/",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    label: "Scryfall",
    icon: <ScryfallLogo size={1.4} marginRight="0.5em" />,
    children: [
      {
        link: "/scryfall/search",
        label: "Search",
        icon: <SearchOutlined />,
      },
    ],
  },
  {
    label: "Admin",
    icon: <SettingOutlined />,
    link: "/admin",
  },
];

function getLabel(item: MenuItem): string | JSX.Element {
  return item.link ? <Link to={item.link}>{item.label}</Link> : item.label;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const selectedKey = menuItems.find(
      (item) => item.link === location.pathname
    )?.label;
    if (selectedKey) {
      setSelectedKeys([selectedKey]);
    }
  }, [location.pathname]);

  return (
    <Layout
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          selectedKeys={selectedKeys}
          theme="dark"
          items={menuItems.map((item) => ({
            key: item.label,
            label: getLabel(item),
            icon: item.icon,
            children: item.children?.map((child) => ({
              key: child.label,
              label: getLabel(child),
              icon: child.icon,
            })),
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content
          style={{ marginTop: "1em", marginLeft: "1em", marginRight: "1em" }}
        >
          <div>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          The Ritual ©2024 Created by Seth Curry
        </Footer>
      </Layout>
    </Layout>
  );
}
