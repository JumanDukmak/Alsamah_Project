import { Button, Row, Space, Table, notification } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined, } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Distractions = () => {

    const salesDistractions = useSelector((state) => state.salesDistractions.salesDistractions)

    const columns = [
        {
            title: 'الشهر',
            dataIndex: "الشهر",
            key: 'الشهر',
        },
        {
            title: 'مبيعات السنة السابقة',
            dataIndex: 'مبيعات_السنة_السابقة',
            key: 'مبيعات_السنة_السابقة',
        },
        {
            title: 'مبيعات السنة الحالية',
            dataIndex: 'مبيعات_السنة_الحالية',
            key: 'مبيعات_السنة_الحالية',
        },
        {
            title: 'نسبة التحسن / التراجع الشهري عن الفعلي',
            dataIndex: 'نسبة_التحسن_الشهري',
            key: 'نسبة_التحسن_الشهري',
            render: (text) => {
                const value = parseFloat(text); // Convert text to a number
                let color = '';
                let arrowIcon = null; 
                
                if (value > 0) {
                    color = 'green';
                    arrowIcon = <ArrowUpOutlined />;
                } else if (value < 0) {
                    color = 'red';
                    arrowIcon = <ArrowDownOutlined />;
                }
                return <span style={{ color }}>{arrowIcon} {text}</span>;
            },
        },
        {
            title: 'نسبة التحسن / التراجع التراكمي عن الفعلي',
            dataIndex: 'نسبة_التحسن_التراكمي',
            key: 'نسبة التحسن_التراكمي',
            render: (text) => {
                const value = parseFloat(text);
                let color = '';
                let arrowIcon = null; 
                
                if (value > 0) {
                    color = 'green';
                    arrowIcon = <ArrowUpOutlined />;
                } else if (value < 0) {
                    color = 'red';
                    arrowIcon = <ArrowDownOutlined />;
                }
                return <span style={{ color }}>{arrowIcon} {text}</span>;
            },
        },
        {
            title: 'المبيعات المتوقعة',
            dataIndex: 'المبيعات_المتوقعة',
            key: 'المبيعات_المتوقعة',
        },
        {
            title: 'نسبة التحسن / التراجع الشهري عن التوقع',
            dataIndex: 'فعلي-عن-التوفع-شهري',
            key: 'فعلي-عن-التوفع-شهري',
            render: (text) => {
                const value = parseFloat(text);
                let color = '';
                let arrowIcon = null; 
                
                if (value > 0) {
                    color = 'green';
                    arrowIcon = <ArrowUpOutlined />;
                } else if (value < 0) {
                    color = 'red';
                    arrowIcon = <ArrowDownOutlined />;
                }
                return <span style={{ color }}>{arrowIcon} {text}</span>;
            },
        },
        {
            title: 'فعلي / التوقع التراكمي عن التوقع',
            dataIndex: 'فعلي-عن-التوفع-تراكمي',
            key: 'فعلي-عن-التوفع-تراكمي',
            render: (text) => {
                const value = parseFloat(text); // Convert text to a number
                let color = '';
                let arrowIcon = null; 
                
                if (value > 0) {
                    color = 'green';
                    arrowIcon = <ArrowUpOutlined />;
                } else if (value < 0) {
                    color = 'red';
                    arrowIcon = <ArrowDownOutlined />;
                }
                return <span style={{ color }}>{arrowIcon} {text}</span>;
            },
        },
    ];

    const [api, contextHolder] = notification.useNotification();
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
    const openNotification = () => {
        if (currentAlertIndex < salesDistractions.alert.length) {
            const { title, alert } = salesDistractions.alert[currentAlertIndex];
            const key = `open${Date.now()}-${currentAlertIndex}`;
            const btn = (
                <Button type="link" size="small" onClick={() => api.destroy()}>
                تخطي الكل
                </Button>
            );
            api.open({
            message: title,
            description: alert,
            placement: 'bottomRight',
            duration: 0,
            btn,
            key,
            onClose: () => console.log(`Notification ${key} closed`),
            });
        }
    };

    return (
        <div className='conatiner_body'>
            <Row>
                <h2>تقرير المبيعات</h2>
            </Row>
            <div style={{ height: '20px' }}></div>
            <Table 
            rowKey='id'
            columns={columns}
            bordered
            dataSource={salesDistractions.data}
            pagination={false}
            scroll={{ x: 1700 }}
            >
            </Table>
            <div style={{ height: '30px' }}></div>
            {contextHolder}
            <Button type="primary" onClick={() => {
            setCurrentAlertIndex(currentAlertIndex + 1);
            openNotification('warning')
            }}>
                اضفط لاستعراض التنبيهات
            </Button>
        </div>
    )
}

export default Distractions