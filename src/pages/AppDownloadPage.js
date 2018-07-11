/**
 * App下载统计
 * Created by panyz on 2018/6/29.
 */
import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,ResponsiveContainer} from 'recharts';
import {Icon, DatePicker, message, Spin} from 'antd';
import {GET_DOWNLOAD_STATISTICS} from '../utils/URL';
import {doPost, requestParams} from '../utils/HttpUtil';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import CustomTooltip from '../components/CustomToolTip';

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const currentDate = new Date();
const lastMonthDate = new Date();
lastMonthDate.setMonth(currentDate.getMonth() - 1);

class AppDownloadPage extends Component {

    state = {
        data: [],
        loading: true
    };

    componentDidMount() {
        let startDate = moment(lastMonthDate).format(dateFormat);
        let endDate = moment(currentDate).format(dateFormat);
        this._loadDownloadStatistics(startDate, endDate);
    }

    /*加载下载统计数据*/
    _loadDownloadStatistics = (startDate, endDate) => {
        this.setState({loading: true});
        let params = new Map();
        params.set("startDate", startDate);
        params.set("endDate", endDate);
        doPost(GET_DOWNLOAD_STATISTICS, requestParams(params))
            .then(res => res.json())
            .then(json => {
                if (json.code === 1) {
                    this.setState({
                        data: json.data,
                        loading: false
                    });
                } else {
                    this.setState({
                        data: [],
                        loading: false
                    });
                    message.warn(json.msg);
                }
            })
            .catch(err => console.error(err));
    };

    /*选择日期的处理*/
    _onDateChange = (date, dateString) => {
        this._loadDownloadStatistics(dateString[0], dateString[1]);
    };


    render() {
        return (
            <div style={{background: '#ffffff', marginTop: 20}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <span style={{flex: 2, fontSize: 14, color: '#000', paddingTop: 10, marginLeft: 15}}><Icon
                        type="bar-chart"/>App下载统计量</span>
                    <RangePicker
                        onChange={this._onDateChange}
                        locale={locale}
                        format={dateFormat}
                        defaultValue={[moment(lastMonthDate.toLocaleString(), dateFormat), moment(currentDate.toLocaleDateString(), dateFormat)]}
                        style={{flex: 1, paddingTop: 10, marginRight: 15}}
                    />
                </div>
                <div style={{width: '100%', height: 1, backgroundColor: '#E8E8E8', marginTop: 5, marginBottom: 5}}/>
                <Spin tip="数据加载中..." spinning={this.state.loading}>
                    <ResponsiveContainer width="100%" height={250} style={{boxSizing: 'border-box', padding: 10}}>
                        <BarChart data={this.state.data}
                                  margin={{top: 5, right: 10, left: 10, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis dataKey="projectName"/>
                            <YAxis/>
                            <Tooltip content={<CustomTooltip data={this.state.data}/>}/>
                            <Bar dataKey="android" fill="#82ca9d"/>
                            <Bar dataKey="ios" fill="#8884d8"/>
                        </BarChart>
                    </ResponsiveContainer>
                </Spin>

            </div>
        )
    }
}

export default AppDownloadPage;