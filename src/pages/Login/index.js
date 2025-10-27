import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
    const onFinish = (values) =>{
        console.log(values)
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
                        pattern: /^09\d{8}$/,
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