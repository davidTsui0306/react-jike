import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN' // 漢化包
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
        const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '標題',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '狀態',
            dataIndex: 'status',
            render: data => <Tag color="green">审核通过</Tag>
        },
        {
            title: '發布時間',
            dataIndex: 'pubdate'
        },
        {
            title: '閱讀數',
            dataIndex: 'read_count'
        },
        {
            title: '評論數',
            dataIndex: 'comment_count'
        },
        {
            title: '點讚數',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} />
                    <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    />
                </Space>
                )
            }
        }
    ]
    // 表格數據
    const data = [
        {
            id: '8218',
            comment_count: 0,
            cover: {
                images: [],
            },
            like_count: 0,
            pubdate: '2019-03-11 09:00:00',
            read_count: 2,
            status: 2,
            title: 'wkwebview離線化加载h5資源解决方案'
        }
    ]
    return (
        <div>
        <Card
            title={
            <Breadcrumb items={[
                { title: <Link to={'/'}>首頁</Link> },
                { title: '文章列表' },
            ]} />
            }
            style={{ marginBottom: 20 }}
        >
            <Form initialValues={{ status: '' }}>
            <Form.Item label="狀態" name="status">
                <Radio.Group>
                <Radio value={''}>全部</Radio>
                <Radio value={0}>草稿</Radio>
                <Radio value={2}>審核通過</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="频道" name="channel_id">
                <Select
                placeholder="請選擇文章频道"
                defaultValue="lucy"
                style={{ width: 120 }}
                >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                </Select>
            </Form.Item>

            <Form.Item label="日期" name="date">
                {/* 傳入locale属性 控制中文顯示*/}
                <RangePicker locale={locale}></RangePicker>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                篩選
                </Button>
            </Form.Item>
            </Form>
        </Card>

        {/*表格區域 */}
        <Card title={`根據篩選條件共查詢到 count 條结果：`}>
            <Table rowKey="id" columns={columns} dataSource={data} />
        </Card>
        </div>
    )
}

export default Article