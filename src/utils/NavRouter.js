/**
 * 自定义菜单导航路由
 * Created by panyz on 2018/6/12.
 */
import React, {Component} from 'react';
import ErrorPage from "../pages/ErrorPage";
import ProjectListPage from '../pages/ProjectListPage';
import AppPage from '../pages/AppPage';
import ReleaseVersionPage from '../pages/ReleaseVersionPage';
import DataStatisticsPage from '../pages/DataStatisticsPage';

class NavRouter extends Component {

    /*判断页面是否存在*/
    _handleViewVisible = (page) => {
        return page === 'projectList' || page === 'android' || page === 'ios'
            || page === 'releaseVersion' || page === 'dataStatistics';
    };

    /*返回对应的页面*/
    _handleView = (page) => {
        if (page === 'projectList') {
            return (<ProjectListPage/>);//项目管理
        } else if (page === 'android' || page === 'ios') {
            return (<AppPage appSystem={page}/>);//App管理
        } else if (page === 'releaseVersion') {
            return <ReleaseVersionPage/>//版本发布
        } else if (page === 'dataStatistics') {
            return <DataStatisticsPage/>;//数据统计
        }
    };

    render() {
        let page = this.props.match.params.id;
        return (
            <div>
                {this._handleViewVisible(page) ? this._handleView(page) : (<ErrorPage/>)}
            </div>
        );
    }
}

export default NavRouter;