/**
 * App登录统计具体内容
 * Created by panyz on 2018/7/2.
 */
import React, {Component} from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,ResponsiveContainer } from 'recharts';
import {GET_LOGIN_STATISTICS_CHART} from '../utils/URL';
import {doPost, requestParams} from '../utils/HttpUtil';
import CustomTooltip from '../components/CustomToolTip';
import {message, Spin} from 'antd';
import AppLoginTablePage from '../pages/AppLoginTablePage';

class TabContent extends Component {

    state = {
        data: [],
        date: this.props.date,
        loading: true
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.date !== nextProps.date) {
            this._loadData(this.props.appCode, nextProps.date);
            this.setState({date: nextProps.date});
        }
    }

    componentDidMount() {
        this._loadData(this.props.appCode, this.props.date);
    }

    /*加载统计数据*/
    _loadData = (appCode, date) => {
        this.setState({loading: true});
        let params = new Map();
        params.set("appCode", appCode);
        params.set("date", date);
        doPost(GET_LOGIN_STATISTICS_CHART, requestParams(params))
            .then(res => res.json())
            .then(json => {
                if (json.code === 1) {
                    this.setState({
                        data: json.data,
                        loading: false
                    })
                } else {
                    this.setState({data: [], loading: false});
                    message.warn(json.msg);
                }
            })
            .catch(err => console.error(err));
    };

    render() {
        return (
            <Spin tip="数据加载中..." spinning={this.state.loading}>
                <ResponsiveContainer width="100%" height={250} >
                    <LineChart  data={this.state.data}
                               margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="loginDate"/>
                        <YAxis />
                        <Tooltip content={<CustomTooltip data={this.state.data}/>}/>
                        <Line type="monotone" dataKey="android" stroke="#82ca9d" fill="#82ca9d" activeDot={{r: 6}}/>
                        <Line type="monotone" dataKey="ios" stroke="#8884d8" fill="#8884d8" activeDot={{r: 6}}/>
                    </LineChart>
                </ResponsiveContainer>
                <AppLoginTablePage appCode={this.props.appCode} date={this.state.date}/>
            </Spin>
        )
    }
}

export default TabContent;
