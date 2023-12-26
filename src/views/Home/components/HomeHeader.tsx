import React from "react";
import styles from '../Home.module.scss'
import classNames from "classnames";
import {Avatar, Badge, Dropdown, MenuProps, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";

const items1: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <div>暂无消息</div>
        ),
    },
]
const items2: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <div>个人中心</div>
        ),
    },
    {
        key: '2',
        label: (
            <div>退出</div>
        ),
    },
]
export default function HomeHeader(){
    return (
        <div className={styles['home-header']}>
            <span className={styles['home-header-logo']}>
                <i className={classNames('iconfont icon-react',styles['icon-react'])}></i>
                <i className={classNames('iconfont icon-icon-test',styles['icon-icon-test'])}></i>
                <i className={classNames('iconfont icon-typescript',styles['icon-typescript'])}></i>
            </span>
            <span className={styles['home-header-title']}>在线考勤系统</span>
            <Dropdown menu={{items: items1}} arrow placement="bottom">
                <Badge dot>
                    <BellOutlined style={{fontSize: 20}}/>
                </Badge>
            </Dropdown>
            <Dropdown menu={{items: items2}} arrow placement="bottom">
                <Space className={styles['']}>
                    <Avatar src="" size="large"/>廷廷
                </Space>
            </Dropdown>
        </div>
    )
}