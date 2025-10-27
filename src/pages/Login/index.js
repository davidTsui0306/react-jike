import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) =>{
        console.log(values)
        // 觸發異步action 
        await dispatch(fetchLogin(values))
        // 跳轉首頁
        navigate("/")
        // 提示用戶
        message.success('成功')
    }
    return (
        <div className="login">
        <Card className="login-container">
            <img className="login-logo" src={logo} alt="" />
            {/* 登錄表單 */}
            <Form onFinish={onFinish} validateTrigger="onBlur">
                <Form.Item name="mobile"
                    rules={[
                        { 
                            required: true, 
                            message: 'Your phone number is wrong' 
                        },
                        { 
                            pattern: /^1[3-9]\d{9}$/,
                            message: 'Your phone number is wrong' 
                        }
                    ]}>
                    <Input size="large" placeholder="Please input your phone number!" />
                </Form.Item>
                <Form.Item name="code"
                    rules={[{ required: true, message: 'Your code is wrong' }]}
                    >
                    <Input size="large" placeholder="Please input your code!" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block>
                    登錄
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        </div>
    )
}

export default Login