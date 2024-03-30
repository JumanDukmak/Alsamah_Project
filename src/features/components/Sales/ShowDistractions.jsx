import { Row, Space, Table, Tag } from "antd"
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";

const ShowDistractions = () => {

    const data = [
        {
            key: '1',
            month: 'كانون الثاني',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            month: 'شباط',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            month: 'آذار',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '1',
            month: 'نيسان',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            month: 'أيار',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            month: 'حزيران',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '3',
            month: 'تموز',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '3',
            month: 'آب',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '3',
            month: 'أيلول',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '3',
            month: 'تشرين الأول',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }, {
            key: '3',
            month: 'نشرين الثاني',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '3',
            month: 'كانون الأول',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <div className='conatiner_body'>
            <Row>
                <h2>تقرير المبيعات</h2>
            </Row>
            <div style={{ height: '20px' }}></div>
            <Row>
                <Table 
                dataSource={data}
                pagination={false}
                >
                    <ColumnGroup title="نسائي">
                        <Column title="الشهر" 
                        width='102px'
                        dataIndex="month" key="month" />
                        <Column title="مبيعات 2023" dataIndex="firstName" key="firstName" />
                        <Column title="توقع 2024" dataIndex="lastName" key="lastName" />
                        <Column title="نسبة التحسن / تراجع الشهري 2023 مع 2024" dataIndex="age" key="age" />
                        <Column title="نسبة التحسن / تراجع التراكمي 2023 مع 2024" dataIndex="age" key="age" />
                        <Column title="نسبة الفئة من إجمالي الأصناف" dataIndex="address" key="address" />
                        <Column title="فعلي 2024" dataIndex="address" key="address" />
                    </ColumnGroup>
                </Table>
            </Row>
        </div>
    )
}

export default ShowDistractions