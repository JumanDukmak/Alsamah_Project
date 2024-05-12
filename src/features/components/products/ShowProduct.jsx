import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { List, Table, Tabs, Typography } from 'antd';
import { getProductCardFetch } from '../../redux/products/productSlice';
import { useLocation } from 'react-router-dom';

const { Text } = Typography;

const ShowProduct = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const product = useSelector((state) => state.products.product)
    const id = location.state;
    
    useEffect(() => {
        dispatch(getProductCardFetch(id))
    }, [])

const columns2 = [
    {
        title: 'رقم فئة العمل',
        dataIndex: 'working_number',
        key: 'working_number',
        width: '225px'
    },
    {
        title: 'فئة العمل',
        dataIndex: 'work_category',
        key: 'work_category',
    },
    {
        title: 'الدخل السنوي',
        dataIndex: 'total_cost',
        key: 'total_cost',
    },
    {
        title: 'كلفة الدزينة',
        dataIndex: 'cost_per_dozen',
        key: 'cost_per_dozen',
    },
];

const columns3 = [
    {
        title: 'رقم نوع العمل',
        dataIndex: 'working_number',
        key: 'working_number',
        width: '230px'
    },
    {
        title: 'نوع العمل',
        dataIndex: 'working_type',
        key: 'working_type',
    },
    {
        title: 'تصنيف العمل',
        dataIndex: 'working_category',
        key: 'working_category',
    },
    {
        title: 'كلفة الدزينة',
        dataIndex: 'cost_per_dozen',
        key: 'cost_per_dozen',
    },
];

const sortedData = [product ? product.initial_material: ""].sort((a, b) => a.type.localeCompare(b.type));

// Group data by type
const groupedData = sortedData.reduce((acc, item) => {
    if (!acc[item.type]) {
    acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
}, {});

console.log(groupedData.undefined);

const columns4 = [
    // {
    //     title: 'نوع المادة',
    //     dataIndex: 'type',
    //     key: 'type',
    //     render: (text, row, index) => {
    //         const rowspan = groupedData[text].length;
    //         if (index === 0 || text !== groupedData[index - 1].type) {
    //             return {
    //             children: text,
    //             props: { rowSpan: rowspan },
    //             };
    //         }
    //         return {
    //             children: '',
    //             props: {
    //             rowSpan: 0,
    //             },
    //         };
    //     },
    // },
    {
        title: 'نوع المادة',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'ااسم المادة',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'المجموع',
        dataIndex: 'sum',
        key: 'sum',
    },
];

const data = [
    { title: 'اسم المنتج', description: product ? product.name: ''},
    { title: 'رمز المنتج', description: product ? product.code: ''},
    { title: 'الوحدة', description: product ? product.unit: ''},
    { title: 'الماركة', description: product ? product.brand.name: ''},
    { title: 'الصنف', description: product ? product.category.name: ''},
    { title: 'زمن الفردة الواحدة', description: product ? product.time_per_piece: ''},
    { title: 'السعر', description: product ? product.price: ''},
    { title: 'المصاريف الصناعية الغير مباشرة', description: product ? product.indirect_industrialSum: ''},
    { title: 'إجمالي كلفة اليد العاملة', description: product ? product.total_WorkForce: ''},
];

const items = [
    {
        key: '1',
        label: 'معلومات المنتج',
        children:  
        <List
        size="large"
        bordered
        dataSource={data}
        style={{ 
            backgroundColor: 'white', 
            marginTop: '-16px', 
            border: '1px solid #E6E8EA', 
            borderRadius: '3px',
            }}
        renderItem={(item) => (
            <List.Item>
                <span style={{ color: '#013243', fontWeight: '700' }}>{item.title}</span> : 
                <span style={{ fontWeight: '600' }}> {item.description}</span>
            </List.Item>
            )}
        />,
    },
    {
        key: '2',
        label: 'الإدارة والآلات',
        children: 
            <Table 
            rowKey='id'
            bordered
            columns={columns2} 
            dataSource={product ? product.indirect_costPerDozen: ''}
            pagination={false}
            style={{ marginTop: '-16px' }}
            summary={() => {
                return (
                    <>
                        <Table.Summary.Row style={{fontWeight: '600', backgroundColor: '#FAFAFA'}}>
                            <Table.Summary.Cell index={0} colSpan={1}>إجمالي كلفة الآلات واليد العاملة</Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={3}>
                            {product ? product.indirect_costPerDozenSum: ''}
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                    );
                }}
            />,
    },
    {
        key: '3',
        label: 'حبكة وفرق',
        children: 
        <Table 
        rowKey='id'
        bordered
        columns={columns3} 
        dataSource={product ? product.direct_costPerDozen: ''}
        pagination={false}
        style={{ marginTop: '-16px' }}
        summary={() => {
            return (
                <>
                    <Table.Summary.Row style={{fontWeight: '600', backgroundColor: '#FAFAFA'}}>
                        <Table.Summary.Cell index={0} colSpan={1}>إجمالي كلفة قسم الفرق</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={3}>
                        {product ? product.faraqTypeSum: ''}
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row style={{fontWeight: '600', backgroundColor: '#FAFAFA'}}>
                        <Table.Summary.Cell index={0} colSpan={1}>إجمالي كلفة قسم الحبكة والفرق</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={3}>
                        {product ? product.direct_costPerDozenSum: ''}
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </>
                );
            }}
        />,
    },
    {
        key: '4',
        label: 'المواد الأولية',
        children: 
        <Table 
        rowKey='id'
        bordered
        columns={columns4} 
        //dataSource={groupedData ? groupedData.undefined: ''}
        dataSource={product ? product.initial_material: ''}
        pagination={false}
        style={{ marginTop: '-16px' }}
        summary={() => {
            return (
                <>
                    <Table.Summary.Row style={{fontWeight: '600', backgroundColor: '#FAFAFA'}}>
                        <Table.Summary.Cell index={0} colSpan={1}>مجموع تكلفة الخيط</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={3}>
                        {product ? product.sum_of_thread_cost: ''}
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row style={{fontWeight: '600', backgroundColor: '#FAFAFA'}}>
                        <Table.Summary.Cell index={0} colSpan={1}>اجمالي هدر اخيط</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={3}>
                        {product ? product.total_thread_wastage: ''}
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row style={{fontWeight: '600', backgroundColor: '#FAFAFA'}}>
                        <Table.Summary.Cell index={0} colSpan={1}>انتاجية الآلة باليوم</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={3}>
                        {product ? product.machine_productivity_per_day: ''}
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row style={{fontWeight: '600', backgroundColor: '#FAFAFA'}}>
                        <Table.Summary.Cell index={0} colSpan={1}>صافي الانتاج</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={3}>
                        {product ? product.net_production: ''}
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </>
                );
            }}
        />,
    },
]

    console.log(`${JSON.stringify(product)}`);

    return (
        <div className='conatiner_body'>
            <Tabs
            type="card"
            size='large'
            items={items}
            />
        </div>
    )
}

export default ShowProduct