/**
 * 顶部操作栏
 * Created by panyz on 2018/5/29.
 */
import React, {Component} from 'react';
import {Icon, Avatar, Menu, Dropdown} from 'antd';
import {NavLink} from 'react-router-dom';
import '../css/ActionBar.css';

const menu = (
    <Menu>
        <Menu.Item key="0">
            <NavLink to="/login">
                <Icon type="logout"/>
                <span className="logout">退出登录</span>
            </NavLink>
        </Menu.Item>
    </Menu>
);

class ActionBar extends Component {

    render() {
        return (
            <div>
                <div>
                    <Icon className="trigger"
                          type={this.props.toggleState ? 'menu-unfold' : 'menu-fold'}
                          onClick={() => {
                              this.props.onToggle()
                          }}
                    />
                    <Dropdown overlay={menu}>
                        <div className="user">
                            <Avatar shape="square" className="avatar" icon="user"/>
                            <span className="userName">{sessionStorage.getItem("account")}</span>
                        </div>
                    </Dropdown>
                </div>

            </div>
        )
    }
}

export default ActionBar;
