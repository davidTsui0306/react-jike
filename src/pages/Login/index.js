import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登錄表單 */}
        <Form>
          <Form.Item>
            <Input size="large" placeholder="請輸入手機號" />
          </Form.Item>
          <Form.Item>
            <Input size="large" placeholder="請輸入驗證碼" />
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