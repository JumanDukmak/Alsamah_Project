import { Row, Table } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Distractions = () => {

    const distractions = useSelector((state) => state.salesDistraction)

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
            title: 'نسبة التحسن / التراجع الشهري',
            dataIndex: 'نسبة_التحسن_الشهري',
            key: 'نسبة_التحسن_الشهري',
            render: (text) => {
                const value = parseFloat(text); // Convert text to a number
                let color = ''; // Default color
                
                if (value > 0) {
                  color = 'green'; // Apply green color for positive values
                } else if (value < 0) {
                  color = 'red'; // Apply red color for negative values
                }
                return <span style={{ color }}>{text}</span>; // Apply the determined color
            },
        },
        {
            title: 'نسبة التحسن / التراجع التراكمي',
            dataIndex: 'نسبة_التحسن_التراكمي',
            key: 'نسبة التحسن_التراكمي',
            render: (text) => {
                const value = parseFloat(text);
                let color = '';
                
                if (value > 0) {
                    color = 'green';
                } else if (value < 0) {
                    color = 'red'; 
                }
                
                return <span style={{ color }}>{text}</span>;
            },
        },
    ];

    return (
        <div className='conatiner_body'>
            <Row>
                <h2>تقرير المبيعات</h2>
            </Row>
            <div style={{ height: '20px' }}></div>
            <Table 
            rowKey='id'
            columns={columns} 
            dataSource={distractions.distractions}
            pagination={false}
            >
            </Table>
        </div>
    )
}

export default Distractions