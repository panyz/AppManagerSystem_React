/**
 * 菜单导航栏
 * Created by panyz on 2018/5/29.
 */
import React, {Component} from 'react';
import '../css/AppLogo.css';
import {Menu, Icon} from 'antd';
import {NavLink} from 'react-router-dom';


const SubMenu = Menu.SubMenu;

class MenuNavigation extends Component {

    state = {
        key:['1'],
    };


    componentDidMount(){
        let pathname = window.location.pathname;
        let key = pathname.split("/")[2];
        this.setState({
            key: [key],
        });

    }

    _onKeySelected = (item) => {
        this.setState({
            key: [item.key]
        });
    };


    render() {
        const urlPath = this.props.baseUrl;
        return (
            <div>
                <div className="logo">
                    <h2 style={{color:'#fff'}}><img src={require('../images/icon.png')} alt="logo"/>App管理平台</h2>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['dataStatistics']}  selectedKeys={this.state.key} onSelect={this._onKeySelected}
                      defaultOpenKeys={['systemsKey']}>

                    <Menu.Item key="dataStatistics">
                        <NavLink to={`${urlPath}/dataStatistics`}>
                            <Icon type="bar-chart"/>
                            <span>数据统计</span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="projectList">
                        <NavLink to={`${urlPath}/projectList`}>
                            <Icon type="rocket"/>
                            <span>项目管理</span>
                        </NavLink>
                    </Menu.Item>

                    <SubMenu key="systemsKey" title={<span><Icon type="tablet"/><span>版本管理</span></span>}>
                        <Menu.Item key="android">
                            <NavLink to={`${urlPath}/android`}>
                                <span>Android</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="ios">
                            <NavLink to={`${urlPath}/ios`}>
                                <span>iOS</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="releaseVersion" disabled={sessionStorage.getItem("userAuth") !== "1"}>
                            <NavLink to={`${urlPath}/releaseVersion`}>
                                <span>版本发布</span>
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>

                </Menu>
            </div>

        );
    }
}

export default MenuNavigation;