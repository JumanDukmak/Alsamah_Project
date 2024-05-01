import {
  Row,
  Col,
  Card,
  Space,
  Statistic,
  DatePicker,
  Form,
  Select,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getProductsChartsFetch, getSalesChartsFetch } from "../redux/SalesReports/salesChartsSlice";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;

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
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const dispatch = useDispatch();
  const salesCharts = useSelector((state) => state.salesCharts.salesCharts);

  const [data_filtering2, setData_filtering2] = useState({
    from: "",
    to: "",
    categories: [],
  });

  const [data_filtering1,setData_filtering1]=useState({year:new Date().getFullYear() ,month:""})

  useEffect(() => {
  
    const new_data = {
      //new Date(data_filtering2.from).getMonth() + 1
      from: data_filtering2.from ? ( data_filtering2.from).format("MM") : "",
      to: data_filtering2.to ? (data_filtering2.to).format("MM") : "",
      categories: data_filtering2.categories
    }

   
    dispatch(getSalesChartsFetch(new_data));
    
    
  
  }, [data_filtering2]);

  useEffect(()=>{
    const new_data={
year:data_filtering1.year ,
month: data_filtering1.month ? parseInt(data_filtering1.month.format('MM'), 10) :""


    }
    console.log(
      `the from is : ${new_data.year} , the to is :${new_data.month}`
    );
    dispatch(getProductsChartsFetch(new_data))


  },[data_filtering1])

  // Extracting the years from the response data
  const years = Object.keys(salesCharts);
  // console.log(`the years are ${JSON.stringify(years)}`)

  // Initialize an empty array to store datasets
  const datasets = [];
const datasets1=[];

  // Loop through each year in the data
  years.forEach((year) => {
    // Extract the sales data for the current year
    const salesData = salesCharts[year];
    // console.log(`the years are ${JSON.stringify(salesData)}`)
    // Initialize arrays to store sales data for each type
    const exportData = [];
    const shopsData = [];
    const salespersonData = [];
    const governorateData = [];
    const syriaData = [];

    // Loop through the sales data for the current year
    salesData.forEach((sale) => {
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
      2022: "rgba(215, 135, 255, 0.6)",
      2023: "rgba(241, 142, 86, 0.6)",
      2024: "rgba(13, 204, 204, 0.6)",
      2025: "rgba(35, 137, 255, 0.6)",
    };

    const borderColors = {
      2022: "rgba(215, 135, 255, 1)",
      2023: "rgba(241, 142, 86, 1)",
      2024: "rgba(13, 204, 204, 1)",
      2025: "rgba(35, 137, 255, 1)",
    };

    // Create a dataset object for the current year
    const dataset = {
      label: year,
      data: [
        exportData.reduce((a, b) => a + b, 0),
        shopsData.reduce((a, b) => a + b, 0),
        salespersonData.reduce((a, b) => a + b, 0),
        governorateData.reduce((a, b) => a + b, 0),
        syriaData.reduce((a, b) => a + b, 0),
      ],
      backgroundColor: yearColors[year],
      borderColor: borderColors[year],
      borderWidth: 1,
    };

    // Push the dataset object to the datasets array
    datasets.push(dataset);
  });

  // Create the chart data object
  const chartData1 = {
    labels: ["السماح", "لاتنيانا", "بالي"],
    datasets: datasets1,
  };
  const chartData2 = {
    labels: ["تصدير", "محلات", "مندوبين", "محافظات", "سوريا"],
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "مبيعات المناطق حسب العام",
      },
    },
  };

  const optionCategories = useSelector((state) => state.categories.categories);

  return (
    <div className="conatiner_body">
      <Row>
        <h2>لوحة تحكم المبيعات</h2>
      </Row>
      <div style={{ height: "20px" }}></div>
      <Row gutter={[16, 24]}>
        <Col>
          <Card bordered={false} style={{ borderRadius: 2 }}>
            <Space>
              <DollarOutlined className="icon" />
              <Statistic title="مبيعات السنة الحالبة" value={112893} />
            </Space>
          </Card>
        </Col>
        <Col>
          <Card bordered={false} style={{ borderRadius: 2 }}>
            <Space>
              <LineChartOutlined className="icon" />
              <Statistic
                title="نسبة المبيعات الشهرية"
                value={11.28}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Space>
          </Card>
        </Col>
        <Col>
          <Card bordered={false} style={{ borderRadius: 2 }}>
            <Space>
              <BarChartOutlined className="icon" />
              <Statistic
                title="نسبة المبيعات التراكمية"
                value={9.3}
                precision={2}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Space>
          </Card>
        </Col>
        <Col>
          <Card bordered={false} style={{ borderRadius: 2 }}>
            <Space>
              <BarChartOutlined className="icon" />
              <Statistic
                title="نسبة المبيعات التراكمية"
                value={9.3}
                precision={2}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Space>
          </Card>
        </Col>
        <Col>
          <Card bordered={false} style={{ borderRadius: 2 }}>
            <Space>
              <BarChartOutlined className="icon" />
              <Statistic
                title="نسبة المبيعات "
                value={9.3}
                precision={2}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Space>
          </Card>
        </Col>
      </Row>

      <div style={{ height: "20px" }}></div>
      <Row gutter={[16, 24]} justify="center">
        <Col span={8}>
          <Form.Item name="categories_id" label="الأصناف">
            <Select
              mode="multiple"
              placeholder=" الأصناف"
              optionLabelProp="label"
              onChange={(value) => {
                const selectedValues = Array.isArray(value) ? value : [value];
                const ids_categories = selectedValues.map((value) => {
                  const option = optionCategories.find(
                    (option) => option.name === value
                  );
                  return option ? option.id : null;
                });
                console.log(`the categories are : ${ids_categories}`);
                setData_filtering2({
                  ...data_filtering2,
                  categories: ids_categories ,
                });
              }}
            >
              {optionCategories.map((option) => (
                <Option key={option.id} value={option.name} label={option.name}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>




        <Col span={8}>
        <Form.Item label='تاريخ البداية'>
          <DatePicker
            selected={data_filtering2.from}
            onChange={(date) => {
             
              setData_filtering2(prevData => ({ ...prevData, from: date }));
              if (data_filtering2.to && date >= data_filtering2.to) {
                setData_filtering2(prevData => ({ ...prevData, to: date }));
              }
            }}
            selectsStart
            startDate={data_filtering2.from}
             endDate={data_filtering2.to}
            maxDate={data_filtering2.to}
            placeholderText='تاريخ البداية'
            picker="month"
            format="MMMM"
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label='تاريخ النهاية'>
          <DatePicker
            selected={data_filtering2.to}
            onChange={(date) => {
              console.log(`the date i selected=========== ${date}`)
              setData_filtering2(prevData => ({ ...prevData, to: date }));
           
          
            }}
            selectsEnd
            startDate={data_filtering2.from}
            endDate={data_filtering2.to}
            placeholderText='تاريخ النهاية'
            minDate={data_filtering2.from}
            picker="month"
            format="MMMM"
          />
        </Form.Item>
      </Col>


      

       

        
      </Row>

      <Row>
        <Col style={{ width: "100%" }}>
          <Card style={{ borderRadius: 2 }}>
            <Bar options={options} data={chartData2} />
          </Card>
        </Col>
      </Row>
      <div style={{ height: "20px" }}></div>
      <Row gutter={[12, 24]} justify="center">
        <Col>
          <Form.Item label="السنة">
            <DatePicker
              picker="year"
              placeholder=" سنة المقارنة  "
              style={{ width: "100%" }}
              onChange={(value) => {
                
                setData_filtering1({
                  ...data_filtering1,
                  year: value ? value.format('YYYY') : new Date().getFullYear(), // Update the selected year in the report state
                });

                
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="الشهر">
            <DatePicker
              picker="month"
              format="MMMM"
              placeholder="ادخل الشهر  "
              onChange={(value) => {
                setData_filtering1({
                  ...data_filtering1,
                  month: value, // Update the selected year in the report state
                });

                // console.log(`the month is : ${value.format("MM")}`);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <div style={{ height: "20px" }}></div>
      <Row gutter={[24, 16]}>
        <Col span={8}>
          <Card style={{ height: 410, borderRadius: 2 }}>
            <Pie data={data2} />
          </Card>
        </Col>
        <Col span={16}>
          <Card style={{ borderRadius: 2 }}>
            <Bar options={options} data={chartData2} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
