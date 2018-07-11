/**
 * 项目管理界面
 * Created by panyz on 2018/6/12.
 */
import React, {Component} from 'react';
import {List, Popconfirm, message, Popover, Icon} from 'antd';
import {doPost, requestParams} from '../utils/HttpUtil';
import {GET_ALL_PROJECT, DELETE_PROJECT, UPDATE_PROJECT} from '../utils/URL';
import EditProjectForm from "../components/EditProjectForm";
import CreateProjectButton from '../components/CreateProjectButton';
import QRCode from 'qrcode.react';

class ProjectListPage extends Component {

    state = {
        dataLoading: true,
        data: [],
        item: {},
        visible: false,
    };

    componentDidMount() {
        this._loadProjectListData();
    }

    /*加载项目列表数据*/
    _loadProjectListData = () => {
        doPost(GET_ALL_PROJECT, null)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    dataLoading: false,
                    data: json.data,
                })
            })
            .catch(err => console.log(err))
    };

    /*编辑完成后的处理*/
    _handleCancel = () => {
        this.formRef.props.form.resetFields();
        this.setState({
            visible: false,
            loading: false
        })
    };

    _saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    /*编辑处理*/
    _handleEdit = () => {
        this.setState({loading: true});
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                let params = new Map();
                params.set("projectId", this.state.item.projectId);
                params.set("projectName", values.projectName);
                params.set("projectCode", values.projectCode);
                params.set("projectDes", values.projectDes);
                doPost(UPDATE_PROJECT, requestParams(params))
                    .then(res => res.json())
                    .then(json => {
                        if (json.code === 1) {
                            message.success(json.msg);
                            this._loadProjectListData();
                        } else {
                            message.error(json.msg);
                        }
                        form.resetFields();
                        this.setState({
                            visible: false,
                        })
                    })
                    .catch(err => console.error(err));
            }
        });
        form.resetFields();
    };

    /*处理二维码*/
    _handleQrCode = (url) => {
        if (url === null || url === undefined || url === '') {
            return "暂无App发布上线";
        } else {
            return (
                <QRCode
                    value={url}
                    size={150}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                />
            );
        }
    };

    /*处理图标*/
    _hanldeIcon = (url) => {
        console.log(url);
        if (url === null || url === undefined || url === '') {
            return require('../images/icon_project.png');
        } else {
            return url;
        }
    };

    render() {
        const {dataLoading, data} = this.state;
        return (
            <div style={{borderRadius: 24, background: '#ffffff', margin: 24, padding: 24, minHeight: 600}}>
                <div>
                    <CreateProjectButton onSuccess={this._loadProjectListData}/>
                </div>
                <List
                    itemLayout="horizontal"
                    loading={dataLoading}
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item actions={
                            sessionStorage.getItem("userAuth") !== "1" ? [<Popover
                                content={this._handleQrCode(item.navUrl)} title="App下载二维码">
                                <Icon type="qrcode"/><a>二维码</a>
                            </Popover>] : [
                                <Popover content={this._handleQrCode(item.navUrl)} title="App下载二维码">
                                    <Icon  type="qrcode"/><a>二维码</a>
                                </Popover>,
                                <a onClick={() => {
                                    this.setState({
                                        visible: true,
                                        item: item
                                    })
                                }}>编辑</a>,
                                <Popconfirm placement="left" title="确定要删除此项目?" okText="确定" cancelText="取消"
                                            onConfirm={() => {
                                                let params = new Map();
                                                params.set("projectId", item.projectId);
                                                doPost(DELETE_PROJECT, requestParams(params))
                                                    .then(res => res.json())
                                                    .then(json => {
                                                        if (json.code === 1) {
                                                            message.success(json.msg);
                                                            this._loadProjectListData();
                                                        } else {
                                                            message.error(json.msg);
                                                        }
                                                    })
                                                    .catch(err => console.error(err));
                                            }}>
                                    <a>删除</a>
                                </Popconfirm>]
                        }>
                            <List.Item.Meta
                                avatar={<img src={this._hanldeIcon(item.iconUrl)} alt=""/>}
                                title={<a >{item.projectName}</a>}
                                description={"项目编码: " + item.projectCode}
                            />
                            <div>{item.projectDes}</div>
                        </List.Item>
                    )}
                />
                <EditProjectForm
                    wrappedComponentRef={this._saveFormRef}
                    visible={this.state.visible}
                    item={this.state.item}
                    onCancel={this._handleCancel}
                    onCreate={this._handleEdit}
                />
            </div>

        );
    }
}

export default ProjectListPage;