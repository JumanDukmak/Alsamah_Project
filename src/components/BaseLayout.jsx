import { DashboardOutlined, ShoppingCartOutlined, InboxOutlined, EnvironmentOutlined, MenuUnfoldOutlined, MenuFoldOutlined
    ,DollarOutlined, DropboxOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const BaseLayout = (props) => {
    
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={250}
                style={{
                    background: 'white',
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                    fontWeight: '700'
                }}
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{
                        padding: '60px 0 0 0',
                        height: '100%',
                        borderRight: 0,
                        color: 'white',
                        backgroundColor: 'white',
                    }}
                >
                    <Menu.Item key='1' onClick={() => navigate('/')}>
                        <DashboardOutlined />
                        <span>لوحة التحكم</span>
                    </Menu.Item>

                    <SubMenu key='sub1'
                        title={
                            <span>
                                <InboxOutlined />
                                <span>المنتجات</span>
                            </span>}
                    >
                        <Menu.Item key='2' 
                        style={{ fontWeight: '600' }} 
                        onClick={() => navigate('/Products')}>المنتجات</Menu.Item>
                        <Menu.Item key='3' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/brands')}>الماركات</Menu.Item>
                        <Menu.Item key='4'
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/categories')}>الأصناف</Menu.Item>
                    </SubMenu>

                    <SubMenu key='sub2'
                        title={
                            <span>
                                <EnvironmentOutlined />
                                <span>المواقع</span>
                            </span>}
                    >
                        <Menu.Item key='5' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/Countries')}>المدن</Menu.Item>
                        <Menu.Item key='6' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/shops')}>المحلات</Menu.Item>
                        <Menu.Item key='7' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/Areas')}>المناطق</Menu.Item>
                    </SubMenu>

                    <SubMenu key='sub3'
                        title={
                            <span>
                                <ShoppingCartOutlined />
                                <span>المبيعات</span>
                            </span>}
                    >
                        <Menu.Item key='8' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/add/sales')}>إضافة المبيعات</Menu.Item>
                        <Menu.Item key='9' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/show/distractions')}>استعراض الانحرافات</Menu.Item>
                    </SubMenu>

                    <SubMenu key='sub4'
                        title={
                            <span>
                                <DollarOutlined />
                                <span>تعريفات التكاليف</span>
                            </span>}
                    >
                        <Menu.Item key='10' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/productionRates')}>معدلات الإنتاج</Menu.Item>
                        <Menu.Item key='11' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/Indirect_industrialExpense')}>المصاريف الصناعية</Menu.Item>
                        <Menu.Item key='12' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/financialExpenses')}>النفقات المالية</Menu.Item>
                        <Menu.Item key='13' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/GeneralData')}>معطيات عامة</Menu.Item>
                        <Menu.Item key='14' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/PigmentCosts')}>تكاليف الصباغ</Menu.Item>
                    </SubMenu>

                    <SubMenu key='sub5'
                        title={
                            <span>
                                <DropboxOutlined />
                                <span>المواد الأولية</span>
                            </span>}
                    >
                        <Menu.Item key='15' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/initialMaterials')}>المواد الأولية</Menu.Item>
                        <Menu.Item key='16' 
                        style={{ fontWeight: '600' }}
                        onClick={() => navigate('/initialMaterials')}>المواد الأولية للمنتج</Menu.Item>
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
                        background: '#f0f2f5',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default BaseLayout