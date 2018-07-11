/**
 * App（Android、iOS）管理页面
 * Created by panyz on 2018/6/14.
 */
import React, {Component} from 'react';
import {Card, Icon, message, List, Popover, Radio} from 'antd';
import {doPost, requestParams} from '../utils/HttpUtil';
import {GET_APP_BY_SYSTEM, GET_TEST_APP} from '../utils/URL';
import QRCode from 'qrcode.react';

const RadioGroup = Radio.Group;

class AppPage extends Component {

    state = {
        dataLoading: true,
        data: [],
        modalVisible: false,
        item: {},
        radioDefaultKey: "a"
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.appSystem !== this.props.appSystem) {
            this.setState({radioDefaultKey: "a"});
            this._loadAppList(nextProps.appSystem, GET_APP_BY_SYSTEM);
        }
    }

    componentDidMount() {
        this._loadAppList(this.props.appSystem, GET_APP_BY_SYSTEM);
    }

    /*加载App的数据*/
    _loadAppList = (appSystem, url) => {
        let params = new Map();
        params.set("appSystem", appSystem);
        doPost(url, requestParams(params))
            .then(res => res.json())
            .then(json => {
                if (json.code !== 1) {
                    message.warn(json.msg);
                }
                this.setState({
                    dataLoading: false,
                    data: json.data
                })
            })
            .catch(err => console.error(err));
    };

    /*对App的图标进行处理*/
    _getImage = (icon, appSystem) => {
        if (icon === null || icon === undefined || icon === '') {
            if (appSystem === "android") {
                return require('../images/Android.png');
            } else if (appSystem === "ios") {
                return require('../images/iphone.png')
            }
        } else {
            return icon;
        }
    };

    /*对App的二维码进行处理*/
    _handleQrCode = (item) => {
        return (
            <QRCode
                value={item.appSystem === 'android' ? item.versionDownload : item.iosPlist}
                size={150}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
            />
        );
    };

    /*正式环境与测试环境之间的切换处理*/
    _onRadioChange = (e) => {
        if ("a" === e.target.value) {
            this.setState({radioDefaultKey: "a"});
            this._loadAppList(this.props.appSystem, GET_APP_BY_SYSTEM);
        } else if ("b" === e.target.value) {
            this.setState({radioDefaultKey: "b"});
            this._loadAppList(this.props.appSystem, GET_TEST_APP);
        }
    };


    render() {

        return (
            <div>
                <RadioGroup style={{marginLeft: 40, marginTop: 10}} defaultValue="a"
                            value={this.state.radioDefaultKey}
                            onChange={this._onRadioChange}>
                    <Radio value="a">正式环境</Radio >
                    <Radio value="b">测试环境</Radio >
                </RadioGroup>
                <div style={{margin: 20, padding: 20, minHeight: 600}}>
                    <List
                        loading={this.state.dataLoading}
                        dataSource={this.state.data}
                        locale={{emptyText: '暂无数据'}}
                        grid={{gutter: 16, column: 3}}
                        renderItem={(item, index) => (
                            <List.Item>
                                <Card
                                    style={{width: 300}}
                                    actions={[
                                        <a href={item.versionDownload}><Icon type="link"/>下载</a>,
                                        <Popover content={this._handleQrCode(item)} title="App下载二维码">
                                            <Icon type="qrcode"/>二维码
                                        </Popover>]}
                                >
                                    <Card.Meta
                                        style={{height: 80}}
                                        avatar={<img src={this._getImage(item.appIcon, item.appSystem)} alt=""/>}
                                        title={item.appName + " V" + item.versionName}
                                        description={item.versionDes}
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />

                </div>
            </div>
        )
    }
}

export default AppPage;
