import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";


const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Nacigation One',
        icon: <AppstoreOutlined/>,
        children: [
            {
                key: '2',
                label: '111',
                icon: <MailOutlined />
            },
            {
                key: '3',
                label: '222',
                icon: <MailOutlined />
            }
        ]
    },
]


export default function HomeAside(){
    return (
        <div>
            <Menu
                style={{width: 256}}
                defaultSelectedKeys={['2']}
                defaultOpenKeys={['1']}
                mode="inline"
                items={items}
            />
        </div>
    )
}