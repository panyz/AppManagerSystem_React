/**
 * 项目管理中添加项目组件
 * Created by panyz on 2018/6/12.
 */
import React, {Component} from 'react';
import {Button, message} from 'antd';
import AddProjectForm from "../components/AddProjectForm";
import {ADD_PROJECT} from '../utils/URL';
import {doPost, requestParams} from '../utils/HttpUtil';

class CreateProjectButton extends Component {

    state = {
        visible: false,
    };

    /*弹出对话框*/
    _showModal = () => {
        this.setState({
            visible: true
        })
    };

    /*取消对话框*/
    _handleCancel = () => {
        this.setState({
            visible: false,
        })
    };

    /*添加项目处理*/
    _handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                let params = new Map();
                params.set("projectName", values.projectName);
                params.set("projectCode", values.projectCode);
                params.set("projectDes", values.projectDes);
                doPost(ADD_PROJECT, requestParams(params))
                    .then(res => res.json())
                    .then(json => {
                        if (json.code === 1) {
                            message.success(json.msg);
                            this.props.onSuccess();
                        } else {
                            message.error(json.msg)
                        }
                        form.resetFields();
                        this.setState({
                            visible: false,
                        });
                    })
                    .catch(err => console.error(err))
            }
        });
    };

    _saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button disabled={sessionStorage.getItem("userAuth") !== "1"} type="dashed" icon="plus" onClick={this._showModal}>添加项目</Button>
                <AddProjectForm
                    wrappedComponentRef={this._saveFormRef}
                    visible={this.state.visible}
                    onCancel={this._handleCancel}
                    onCreate={this._handleCreate}
                />
            </div>
        );
    }
}

export default CreateProjectButton;