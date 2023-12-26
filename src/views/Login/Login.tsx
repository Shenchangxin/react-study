import React from 'react'
import styles from './Login.module.scss'
import {Button,message,Form,Input} from "antd";
import {useAppDispatch} from "../../store";
import type { RootState} from '../../store';
import { useSelector} from "react-redux";
import {loginAction, updateToken} from '../../store/modules/users';
import classNames from "classnames";



export default function Login() {
    const token = useSelector((state: RootState)=> state.users.token)
    const dispatch = useAppDispatch()
    const handleLogin = () => {
        dispatch(loginAction({email: 'test@qq.com', pass: 'test'})).then
        ((action)=>{
            const {errcode,token} = (action.payload as {[index: string]: unknown}).data as
                {[index: string]: unknown}
            if (errcode === 0 && token === 'string'){
                dispatch(updateToken(token))
                message.success('登陆成功');
            }else {
                message.error('登陆失败');
            }
        })
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };  
    
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
                  span: 8,
              }}
              wrapperCol={{
                  span: 16,
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
          >
              <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[
                      {
                          required: true,
                          message: '请输入邮箱!',
                      },
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
                      offset: 8,
                      span: 16,
                  }}
              >
                  <Button onClick={handleLogin} type="primary" htmlType="submit">
                      Submit
                  </Button>
              </Form.Item>
          </Form>
      </div>
    
  )
}