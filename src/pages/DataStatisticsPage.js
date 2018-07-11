/**
 * 数据统计界面
 * Created by panyz on 2018/6/29.
 */
import React, {Component} from 'react';
import AppDownloadPage from '../pages/AppDownloadPage';
import AppLoginStatisticsPage from '../pages/AppLoginStatisticsPage';


class DataStatisticsPage extends Component {
    render() {
        return (
            <div style={{margin: 10, padding: 15, minHeight: 600}}>
                <AppLoginStatisticsPage/>
                <AppDownloadPage/>
            </div>
        )
    }
}

export default DataStatisticsPage;