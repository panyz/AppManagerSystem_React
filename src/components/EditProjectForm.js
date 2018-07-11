/**
 * 项目编辑
 * Created by panyz on 2018/6/13.
 */
import React, {Component} from 'react';
import {Modal, Form, Input, Upload, Icon, message, Button} from 'antd';
import {UPLOAD_ICON} from '../utils/URL';

const FormItem = Form.Item;


class EditProjectForm extends Component {

    render() {
        const {visible, onCancel, onCreate, form, item} = this.props;
        const {getFieldDecorator} = form;
        const props = {
            name: 'icon',
            data: {
                projectCode: item.projectCode,
            },
            action: UPLOAD_ICON,
            headers: {
                'Access-Control-Allow-Headers': "x-requested-with",
                authorization: 'authorization-text'
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {

                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功.`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败.`);
                }
            },
        };


        return (
            <Modal
                visible={visible}
                onCancel={onCancel}
                onOk={onCreate}
                okText="提交"
                cancelText="取消"
                title="编辑项目">

                <Form>
                    <FormItem label="项目名称">
                        {getFieldDecorator('projectName', {
                            initialValue: item.projectName,
                            rules: [{
                                required: true,
                                message: '请输入项目名称'
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem label="项目编码">
                        {getFieldDecorator('projectCode', {
                            initialValue: item.projectCode,
                            rules: [{
                                required: true,
                                message: '请输入项目编码'
                            }]
                        })(
                            <Input disabled/>
                        )}
                    </FormItem>

                    <FormItem label="项目描述">
                        {getFieldDecorator('projectDes', {
                            initialValue: item.projectDes,
                            rules: [{
                                required: true,
                                message: '请输入项目描述'
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem label="项目图标">

                        {getFieldDecorator('appIcon', {
                            rules: [{
                                required: false,
                            }]
                        })(
                            <div>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload"/> 上传图标
                                    </Button>
                                </Upload>
                                <span style={{color:'red'}}>*图标的大小为48x48</span>
                            </div>
                        )}
                    </FormItem>

                </Form>
            </Modal>
        );
    }
}

const editForm = Form.create()(EditProjectForm);
export default editForm;