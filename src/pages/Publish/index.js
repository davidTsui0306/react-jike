import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getChannelAPI } from '@/apis/article'
import { useEffect, useState } from 'react'
import { createArticleAPI } from '@/apis/article'
import { create } from 'lodash'

const { Option } = Select

const Publish = () => {
    // 獲取頻道列表
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        // 封裝函數 在函數體內調用接口
        const getChannelList = async () => {
           const res = await getChannelAPI()
           setChannelList(res.data.channels) 
        }
        // 調用函數
        getChannelList()
    }, [])

    // 提交表單
    const onFinish = (formValue) => {
        // 檢驗imagetype使否和實際圖片列表imagelist相等
        if(imageList.length !== imageType) return message.warning('封面類型和圖片數量不匹配')
            
        const {title, content, channel_id} = formValue
        // 按照接口文黨格是處理表單數據
        const reqData = {
            title,
            content,
            cover:{
                type: imageType,
                images: imageList.map(item => item.response.data.url)
            },
            channel_id
        }
        // 調用接口提交
        createArticleAPI(reqData)
    }

    // 上傳回調
    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        setImageList(value.fileList)
    }

    // 切換圖片封面類型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        setImageType(e.target.value)
    }

    return (
        <div className="publish">
        <Card
            title={
            <Breadcrumb items={[
                { title: <Link to={'/'}>首页</Link> },
                { title: '發布文章' },
            ]}
            />
            }
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ type: 0 }}
                onFinish={onFinish}
            >
            <Form.Item
                label="標題"
                name="title"
                rules={[{ required: true, message: '請输入文章標題' }]}
            >
                <Input placeholder="請输入文章標題" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
                label="頻道"
                name="channel_id"
                rules={[{ required: true, message: '請選擇文章频道' }]}
            >
                <Select placeholder="请選擇文章频道" style={{ width: 400 }}>
                    {/*value屬性用戶選重後會自動收集作為接口提交字段*/}
                    {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item label="封面">
            <Form.Item name="type">
                <Radio.Group onChange={onTypeChange}>
                    <Radio value={1}>單圖</Radio>
                    <Radio value={3}>三圖</Radio>
                    <Radio value={0}>無圖</Radio>
                </Radio.Group>
            </Form.Item>
            {imageType > 0 &&  <Upload
                listType="picture-card" // 決定選擇文件框外觀樣式
                showUploadList          // 控制顯示上傳列表
                action={'http://geek.itheima.net/v1_0/upload'}
                name='image'
                onChange={onChange}
                maxCount={imageType}
            >
                <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                </div>
            </Upload>}
        
            </Form.Item>
            <Form.Item
                label="内容"
                name="content"
                rules={[{ required: true, message: '請輸入文章内容' }]}
            >
                <ReactQuill
                className="publish-quill"
                theme="snow"
                placeholder="請輸入文章内容"
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
                <Space>
                <Button size="large" type="primary" htmlType="submit">
                    發布文章
                </Button>
                </Space>
            </Form.Item>
            </Form>
        </Card>
        </div>
    )
}

export default Publish