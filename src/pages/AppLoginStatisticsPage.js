/**
 * App登录统计
 * Created by panyz on 2018/7/2.
 */
import React, {Component} from 'react';
import {Tabs} from 'antd';
import TabContent from '../components/TabContent';

import {DatePicker, Icon} from 'antd';
import moment from 'moment';
import {getCurrentYearMonth} from '../utils/DateUtil';
import {GET_ALL_PROJECT} from '../utils/URL';
import {doPost} from '../utils/HttpUtil';

const {MonthPicker} = DatePicker;
const TabPane = Tabs.TabPane;

class AppLoginStatisticsPage extends Component {

    state = {
        data: [],
        month: moment(Date.now()).format("YYYY-MM"),
    };

    componentDidMount() {
        doPost(GET_ALL_PROJECT, null)
            .then(res => res.json())
            .then(json => {
                if (json.code === 1) {
                    this.setState({
                        data: json.data,
                    });
                }
            })
            .catch(err => console.log(err));
    }

    /*动态处理选项卡*/
    _handleTabPan = (data) => {
        return data.map(
            (item) => {
                return (
                    <TabPane tab={item.projectName} key={item.projectCode}>{(
                        <TabContent appCode={item.projectCode} date={this.state.month}/>)}</TabPane>
                )
            }
        );
    };

    /*日期选择处理*/
    _onDateChange = (date, dateString) => {
        this.setState({month: dateString});
    };

    render() {
        return (
            <div style={{background: '#ffffff'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <span style={{flex: 2, fontSize: 14, color: '#000', paddingTop: 10, marginLeft: 15}}><Icon
                        type="line-chart"/>App登录统计量</span>
                    <MonthPicker style={{marginTop: 10, marginRight: 15}}
                                 onChange={this._onDateChange}
                                 placeholder="请选择月份"
                                 defaultValue={moment(getCurrentYearMonth())}/>
                </div>
                <Tabs defaultActiveKey="1">
                    {this._handleTabPan(this.state.data)}
                </Tabs>
            </div>
        )
    }
}

export default AppLoginStatisticsPage;