import { Row, Col, Card, Space, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DollarOutlined, BarChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getSalesChartsFetch } from '../redux/SalesReports/salesChartsSlice';
import { useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const data2 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {

  const dispatch = useDispatch();
  const salesCharts = useSelector ((state) => state.salesCharts.salesCharts);
  console.log(`from page: ${JSON.stringify(salesCharts)}`);

  useEffect(() => {
    dispatch(getSalesChartsFetch());
  }, []); 

// Extracting the years from the response data
const years = Object.keys(salesCharts);

// Initialize an empty array to store datasets
const datasets = [];

// Loop through each year in the data
years.forEach(year => {
    // Extract the sales data for the current year
    const salesData = salesCharts[year];
    
    // Initialize arrays to store sales data for each type
    const exportData = [];
    const shopsData = [];
    const salespersonData = [];
    const governorateData = [];
    const syriaData = [];
    
    // Loop through the sales data for the current year
    salesData.forEach(sale => {
        // Check the type of sale and push the sales sum to the corresponding array
        switch (sale.type) {
            case "export":
                exportData.push(parseFloat(sale.sales_sum));
                break;
            case "shops":
                shopsData.push(parseFloat(sale.sales_sum));
                break;
            case "salesperson":
                salespersonData.push(parseFloat(sale.sales_sum));
                break;
            case "governorate":
                governorateData.push(parseFloat(sale.sales_sum));
                break;
            case "syria":
                syriaData.push(parseFloat(sale.total_sales));
                break;
            default:
                break;
        }
    });

    const yearColors = {
      "2022": "rgba(215, 135, 255, 0.6)",
      "2023": "rgba(241, 142, 86, 0.6)",
      "2024": "rgba(13, 204, 204, 0.6)",
      "2025": "rgba(35, 137, 255, 0.6)"
  };

  const borderColors = {
    "2022": "rgba(215, 135, 255, 1)",
    "2023": "rgba(241, 142, 86, 1)",
    "2024": "rgba(13, 204, 204, 1)",
    "2025": "rgba(35, 137, 255, 1)"
};
    
    // Create a dataset object for the current year
    const dataset = {
        label: year,
        data: [
          exportData.reduce((a, b) => a + b, 0),
          shopsData.reduce((a,b) => a + b, 0),
          salespersonData.reduce((a, b) => a + b, 0), 
          governorateData.reduce((a, b) => a + b, 0), 
          syriaData.reduce((a, b) => a + b, 0)],
        backgroundColor: yearColors[year],
        borderColor: borderColors[year],
        borderWidth: 1
    };
    
    // Push the dataset object to the datasets array
    datasets.push(dataset);
});

// Create the chart data object
const chartData = {
    labels: ["تصدير", "محلات", "مندوبين", "محافظات", "سوريا"],
    datasets: datasets
};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'مبيعات المناطق حسب العام',
      },
    },
  };

    return (
        <div className='conatiner_body'>
            <Row>
                <h2>لوحة تحكم المبيعات</h2>
            </Row>
            <div style={{ height: '20px' }}></div>
            <Row gutter={[16, 24]}>
              <Col>
                  <Card bordered={false} style={{borderRadius: 2}}>
                    <Space>
                    <DollarOutlined className='icon'/>
                    <Statistic 
                      title="مبيعات السنة الحالبة"
                      value={112893} 
                      />
                      </Space>
                  </Card>
                </Col>
                <Col>
                  <Card bordered={false} style={{borderRadius: 2}}>
                    <Space>
                    <LineChartOutlined className='icon'/>
                    <Statistic
                      title="نسبة المبيعات الشهرية"
                      value={11.28}
                      precision={2}
                      valueStyle={{
                        color: '#3f8600',
                      }}
                      prefix={<ArrowUpOutlined />}
                      suffix="%"
                    />
                    </Space>
                  </Card>
                </Col>
                <Col>
                  <Card bordered={false} style={{borderRadius: 2}}>
                    <Space>
                    <BarChartOutlined className='icon'/>
                    <Statistic
                      title="نسبة المبيعات التراكمية"
                      value={9.3}
                      precision={2}
                      valueStyle={{
                        color: '#cf1322',
                      }}
                      prefix={<ArrowDownOutlined />}
                      suffix="%"
                    />
                    </Space>
                  </Card>
                </Col>
                <Col>
                  <Card bordered={false} style={{borderRadius: 2}}>
                    <Space>
                    <BarChartOutlined className='icon'/>
                    <Statistic
                      title="نسبة المبيعات التراكمية"
                      value={9.3}
                      precision={2}
                      valueStyle={{
                        color: '#cf1322',
                      }}
                      prefix={<ArrowDownOutlined />}
                      suffix="%"
                    />
                    </Space>
                  </Card>
                </Col>
                <Col>
                  <Card bordered={false} style={{borderRadius: 2}}>
                    <Space>
                    <BarChartOutlined className='icon'/>
                    <Statistic
                      title="نسبة المبيعات "
                      value={9.3}
                      precision={2}
                      valueStyle={{
                        color: '#cf1322',
                      }}
                      prefix={<ArrowDownOutlined />}
                      suffix="%"
                    />
                    </Space>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card style={{borderRadius: 2}}>
                    <Bar options={options} data={chartData} />
                  </Card>
                </Col>
            </Row>
            <div style={{ height: '20px' }}></div>
            <Row gutter={[24,16]}>
              <Col span={8}>
                <Card style={{height: 410, borderRadius: 2}}>
                  <Pie data={data2} />
                </Card>
              </Col>
              <Col span={16}>
                <Card style={{borderRadius: 2}}>
                  <Bar options={options} data={chartData} />
                </Card>
              </Col>
            </Row>
        </div>
    )
}

export default Dashboard



