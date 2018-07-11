/**
 * 添加项目组件
 * Created by panyz on 2018/6/12.
 */
import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd';

const FormItem = Form.Item;

class AddProjectForm extends Component {
    render() {
        const {visible, onCancel, onCreate, form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Modal
                visible={visible}
                onOk={onCreate}
                onCancel={onCancel}
                okText="添加"
                cancelText="取消"
                title="添加项目">

                <Form>
                    <FormItem label="项目名称">
                        {getFieldDecorator('projectName', {
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
                            rules: [{
                                required: true,
                                message: '请输入项目编码'
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem label="项目描述">
                        {getFieldDecorator('projectDes', {
                            rules: [{
                                required: true,
                                message: '请输入项目描述'
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const createProjectForm = Form.create()(AddProjectForm);
export default createProjectForm;