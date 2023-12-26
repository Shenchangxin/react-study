import React from 'react'
import styles from './Login.module.scss'
import {Button, message, Form, Input, Row, Col} from "antd";
import {useAppDispatch} from "../../store";
import type { RootState} from '../../store';
import { useSelector} from "react-redux";
import {loginAction, updateToken} from '../../store/modules/users';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";


interface User {
    email: string
    pass: string
}


export default function Login() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const onFinish = (values: User) => {
        dispatch(loginAction(values)).then((action)=>{
            const {errcode,token} = (action.payload as {[index: string]: unknown}).data as
                {[index: string]: unknown}
            if (errcode === 0 && token === 'string'){
                dispatch(updateToken(token))
                message.success('登陆成功');
                navigate('/')
            }else {
                message.error('登陆失败');
            }
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };  
    const testUsers = [
        {
            email: 'test@1qq.com',
            pass: 'test'
        },
        {
            email: 'test1@1qq.com',
            pass: 'test1'
        }
    ]
    const autoLogin = (values: User) => {
        return ()=>{
            form.setFieldsValue(values) //设置数据回显
            onFinish(values)
        }
    }
    
  return (
      <div className={styles.login}>
          <div className={styles.header}>
              <span className={styles['header-logo']}>
                  <i className={classNames('iconfont icon-react', styles['icon-react'])}></i>
                  <i className={classNames('iconfont icon-icon-test',styles['icon-icon-test'])}></i>
                  <i className={classNames('iconfont icon-typescript',styles['icon-typescript'])}></i>
              </span>
              <span className={styles['header-title']}>在线考勤系统</span>
          </div>
          <div className={styles.desc}>
              守时是传统美德
          </div>
          <Form
              name="basic"
              labelCol={{
                  span: 6,
              }}
              wrapperCol={{
                  span: 18,
              }}
              style={{
                  maxWidth: 600,
              }}
              initialValues={{
                  remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={styles.main}
              form={form}
          >
              <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[
                      {
                          required: true,
                          message: '请输入邮箱!',
                      },
                      {
                          type: 'email',
                          message: "请输入正确的邮箱地址"
                      }
                  ]}
              >
                  <Input placeholder="请输入邮箱"/>
              </Form.Item>

              <Form.Item
                  label="密码"
                  name="pass"
                  rules={[
                      {
                          required: true,
                          message: '请输入密码!',
                      },
                  ]}
              >
                  <Input.Password placeholder="请输入密码" visibilityToggle={false}/>
              </Form.Item>
              
              <Form.Item
                  wrapperCol={{
                      offset: 6,
                      span: 18,
                  }}
              >
                  <Button type="primary" htmlType="submit">
                      登录
                  </Button>
              </Form.Item>
          </Form>
          <div className={styles.users}>
              <Row gutter={20}>
                  {
                      testUsers.map((v)=> (
                          <Col key={v.email} span={12}>
                              <h3>
                                  测试账号：<Button onClick={autoLogin({email: v.email,pass: v.pass})}>
                                  一键登录
                              </Button>
                              </h3>
                              <p>邮箱：{v.email}</p>
                              <p>密码：{v.pass}</p>
                          </Col>
                      ))
                  }
              </Row>
          </div>
      </div>
  )
}