import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN' // 漢化包
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
        const { channelList } = useChannel()

        const status = {
            1: <Tag color="warning">待審核</Tag>,
            2: <Tag color="success">審核通過</Tag>
        }
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
            // data => 後端返回的狀態 根據他做條件渲染
            // data = 1 => 待審核  / = 2 => 審核通過
            render: data => status[data]
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

    // 篩選功能
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })


    // 獲取文章列表
    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getList() {
            const res = await getArticleListAPI(reqData)
            setList(res.data.results)
            setCount(res.data.total_count)
        }
        getList()
    }, [reqData])

    
    const onFinish = (formValue) => {
        console.log(formValue)
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            statis: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD')
        })
        // 重新拉文章列表，但因為上面useeffect reqdata變化了上面會再執行一次
    }


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
            <Form initialValues={{ status: '' }} onFinish={onFinish}>
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
                        {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
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
        <Card title={`根據篩選條件共查詢到 ${count} 條结果：`}>
            <Table rowKey="id" columns={columns} dataSource={list} />
        </Card>
        </div>
    )
}

export default Article