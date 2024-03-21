import { DashboardOutlined, ShoppingCartOutlined, InboxOutlined, EnvironmentOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';


const { Header, Content, Sider } = Layout;

const BaseLayout = (props) => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ height: '100vh' }} >
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={250}
                style={{
                    background: 'white',
                }}

            >
                <div style={{ height: '40px' }}></div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{
                        height: '94%',
                        borderRight: 0,
                        color: 'white',
                        backgroundColor: 'white'
                    }}
                >
                    <Menu.Item key='1' onClick={() => navigate('/')}>
                        <DashboardOutlined />
                        <span>لوحة التحكم</span>
                    </Menu.Item>

                    <SubMenu
                        key='sub1'
                        title={
                            <span>
                                <InboxOutlined />
                                <span>المنتجات</span>
                            </span>}
                    >
                        <Menu.Item key='2' onClick={() => navigate('/Groups')}>المنتجات</Menu.Item>
                        <Menu.Item key='3' onClick={() => navigate('/AddGroup')}>إضافة منتج</Menu.Item>
                        <Menu.Item key='4' onClick={() => navigate('/Groups')}>الماركات</Menu.Item>
                        <Menu.Item key='5' onClick={() => navigate('/AddGroup')}>الأصناف</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key='sub2'
                        title={
                            <span>
                                <EnvironmentOutlined />
                                <span>المواقع</span>
                            </span>}
                    >
                        <Menu.Item key='6' onClick={() => navigate('/Users')}>المدن</Menu.Item>
                        <Menu.Item key='7' onClick={() => navigate('/Users')}>المحلات</Menu.Item>
                        <Menu.Item key='8' onClick={() => navigate('/Users')}>المناطق</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key='sub3'
                        title={
                            <span>
                                <ShoppingCartOutlined />
                                <span>المبيعات</span>
                            </span>}
                    >
                        <Menu.Item key='9' onClick={() => navigate('/Users')}>المبيعات المحلية</Menu.Item>
                        <Menu.Item key='10' onClick={() => navigate('/Users')}>المبيعات المصدرة</Menu.Item>
                    </SubMenu>

                </Menu>
            </Sider>

            <Layout>
                <Header
                    style={{
                        height: '6vh',
                        display: 'flex',
                        alignItems: 'center',
                        background: '#013243 ',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed
                            ? <MenuUnfoldOutlined style={{ color: 'white' }} />
                            : <MenuFoldOutlined style={{ color: 'white' }} />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            background: 'transparent',
                            fontSize: '16px',
                            width: 60,
                            height: 40,
                        }}
                    />
                    <div />
                </Header>

                <Content
                    style={{
                        margin: 0,
                        minHeight: 280,
                        background: '#e4ebf2',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default BaseLayout