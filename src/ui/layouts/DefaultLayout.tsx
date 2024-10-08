import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu/menu";
import { Link, useLocation } from "react-router-dom";
import ScryfallLogo from "../components/icons/ScryfallLogo";
import { IdcardOutlined, SettingOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";
import logo from "../../../assets/icons/icon-512.png";
import { Flex } from "antd";
import React, { useEffect, useState } from "react";

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
    label: "Decks",
    icon: <IdcardOutlined />,
    link: "/decks",
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
        <Header style={{ padding: 0 }}>
          <Flex style={{ height: "100%", padding: "0.5em" }}>
            <Flex
              className="grey-bg"
              style={{
                height: "100%",
                paddingLeft: "0.5em",
                paddingRight: "0.5em",
                verticalAlign: "middle",
                borderRadius: "0.75em",
              }}
            >
              <span
                style={{
                  height: "100%",
                  verticalAlign: "middle",
                  display: "inline-block",
                }}
              >
                <img
                  src="/assets/icons/icon-512.png"
                  style={{
                    height: "90%",
                    width: "auto",
                    position: "relative",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </span>
              <Typography
                className="font-metal-mania"
                style={{
                  marginLeft: "0.5em",
                  fontSize: "2.5em",
                  verticalAlign: "middle",
                  display: "inline-block",
                }}
              >
                The Ritual
              </Typography>
            </Flex>
          </Flex>
        </Header>
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
