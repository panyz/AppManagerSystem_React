/**
 * App登录统计报表
 * Created by panyz on 2018/7/2.
 */
import React, {Component} from 'react';
import {Table, message} from 'antd';
import {GET_LOGIN_STATISTICS_TABLE} from '../utils/URL';
import {doPost, requestParams} from '../utils/HttpUtil';


const columns = [{
    key: 'loginAccount',
    title: '用户账号',
    dataIndex: 'loginAccount',
    width: 100,
    fixed: 'left'
}, {
    title: '应用名称',
    dataIndex: 'appName',
    key: 'appName',
}, {
    title: '应用版本',
    dataIndex: 'appVersion',
    key: 'appVersion',
}, {
    title: '登录时间',
    dataIndex: 'loginDate',
    key: 'loginDate',
}, {
    title: '手机系统',
    dataIndex: 'systemType',
    key: 'systemType',
}, {
    title: '手机机型',
    dataIndex: 'phoneModal',
    key: 'phoneModal',
}, {
    title: '手机imei',
    dataIndex: 'imei',
    key: 'imei',
}, {
    title: '地理位置',
    dataIndex: 'address',
    key: 'address',
}];

class AppLoginTablePage extends Component {

    state = {
        data: {
            data: [],
            pageSize: 15,
            totalCount: 0,
        },
        currentPage: 1
    };

    componentDidMount() {
        if (this.props.appCode !== '') {
            this._loadData(this.props.appCode, 1, this.props.date);
        }
    }

    componentWillReceiveProps(nextProps) {
        this._loadData(nextProps.appCode, 1, nextProps.date);
    }

    /*加载报表数据*/
    _loadData = (appCode, currentPage, date) => {
        let params = new Map();
        params.set("appCode", appCode);
        params.set("currentPage", currentPage);
        params.set("date", date);
        doPost(GET_LOGIN_STATISTICS_TABLE, requestParams(params))
            .then(res => res.json())
            .then(json => {
                if (json.code === 1) {
                    this.setState({
                        data: {
                            data: json.data.data,
                            pageSize: json.data.pageSize,
                            totalCount: json.data.totalCount
                        },
                        currentPage: json.data.currentPage
                    })
                } else {
                    this.setState({
                        data: {
                            data: []
                        }
                    });
                    message.warn(json.msg);
                }
            })
            .catch(err => console.error(err));
    };

    render() {
        return (
            <div style={{background: '#ffffff', marginTop: 10}}>
                <Table columns={columns}
                       dataSource={this.state.data.data}
                       scroll={{x: 1300}}
                       locale={{emptyText: '暂无数据'}}
                       pagination={{
                           total: this.state.data.totalCount,
                           style: {margin: 10},
                           pageSize: this.state.data.pageSize,
                           defaultPageSize: this.state.data.pageSize,
                           onChange: (page, pageSize) => {
                               this._loadData(this.props.appCode, page, this.props.date);
                           },
                           hideOnSinglePage: true,
                       }}
                />
            </div>
        )
    }
}

export default AppLoginTablePage;