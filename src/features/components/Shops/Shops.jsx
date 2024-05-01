import { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Row, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AddShop from './AddShop';
import { getShopsStart, resetData_Shops } from '../../redux/Shops/shopsSlice';
import { PlusOutlined } from '@ant-design/icons';

const Shops = () => {
    const dispatch = useDispatch();
    const shops = useSelector((state) => state.shops)

    useEffect(() => {
        dispatch(getShopsStart())
    }, [])

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (shops.message != null) {
            api.success(shops.message);
            dispatch(resetData_Shops())
        }
        if (shops.error != null) {
            api.error(shops.error);
            dispatch(resetData_Shops())
        }
    }, [shops.message, shops.error]);

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    return (
        <div className="conatiner_body">
            {contextHolder}
            <div className="title">
                <h2>المحلات</h2>
                <Button 
                type="primary" 
                onClick={showModal}
                style={{ fontWeight: '700' }}
                icon={<PlusOutlined />}>
                    إضافة محل
                </Button>
                <AddShop 
                open={open} 
                onClose={() => setOpen(false)}
                />
            </div>
            <div className="container_child">
                <Row gutter={[16, 24]}>
                    {
                        shops.shops.map((shop, i) => (
                            <Col className="gutter-row" key={i}>
                                <Card
                                    hoverable
                                    style={{
                                        width: 300,
                                        marginRight: '10px'
                                    }}
                                >
                                    <Meta
                                        avatar={<Avatar 
                                            style={{ backgroundColor: '#02e079b0', color: 'white' }}>
                                                {shop.name.charAt(0).toUpperCase()}
                                                </Avatar>}
                                        title={shop.name}
                                        // description={`  المحافظة: ${shop.governorate}`}
                                    />
                                </Card>
                            </Col>
                        ))
                    }
                    {
                        //لو هو عم يحمل  رح يعرضل لودينغ 
                        shops.loading && <Backdrop
                            sx={{ color: '#02e079', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>}
                    {
                        //   لو مافي غروبات 
                        !shops.shops && !shops.loading && (<div>No shops </div>)
                    }
                </Row>
            </div>
        </div>
    )
};
export default Shops;
