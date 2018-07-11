/**
 * 版本发布界面
 * Created by panyz on 2018/6/20.
 */
import React, {Component} from 'react';
import {Form, Input, Tooltip, Icon, Select, InputNumber, Button, Upload, message} from 'antd';
import * as URL from "../utils/URL";
import {doPost, requestParams} from '../utils/HttpUtil';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

/*文件上传的一些属性*/
const props = {
    name: 'file',
    data: {
        type: '',
        projectCode: '',
        environment:'',
    },
    action: URL.UPLOAD_INSTALL_PACKAGE,
    headers: {
        'Access-Control-Allow-Headers': "x-requested-with",
        authorization: 'authorization-text'
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
        }
    },
};

const projectMap = new Map();


class ReleaseVersionPage extends Component {

    state = {
        data: [],
        btnLoading: false
    };

    componentDidMount() {
        doPost(URL.GET_PROJECT_INFO, null)
            .then(res => res.json())
            .then(json => {
                if (json.code === 1) {
                    json.data.map((item) => {
                        projectMap.set(item.appCode, item.appName)
                    });
                    this.setState({
                        data: json.data
                    });
                }

            })
            .catch(err => console.error(err));
    }

    /*版本发布的信息检查处理*/
    checkInfo = (values) => {
        if (values.versionEnvironment === "请选择发布环境") {
            message.warn("请选择发布环境");
            return false;
        }
        if (values.appSystem === "请选择系统") {
            message.warn("请选择系统");
            return false;
        }
        if (values.appCode === "请选择项目") {
            message.warn("请选择项目");
            return false;
        }
        if (values.updateType === "请选择更新类型") {
            message.warn("请选择更新类型");
            return false;
        }
        return true;
    };


    /*版本发布处理*/
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);

            if (this.checkInfo(values) && !err) {
                this.setState({btnLoading: true});
                let params = new Map();
                params.set("appSystem", values.appSystem);
                params.set("appCode", values.appCode);
                params.set("appName", projectMap.get(values.appCode));
                params.set("versionCode", values.versionCode);
                params.set("versionName", values.versionName);
                params.set("versionDes", values.versionDes);
                params.set("versionDownload", values.versionDownload);
                params.set("updateType", values.updateType);
                params.set("iosPlist", values.iosPlist);
                let url = "";
                if ("real" === values.versionEnvironment) {
                    url = URL.ADD_APP_VERSION;
                } else if ("test" === values.versionEnvironment) {
                    url = URL.ADD_TEST_APP;
                }
                doPost(url, requestParams(params))
                    .then(res => res.json())
                    .then(json => {
                        if (json.code === 1) {
                            this.setState({btnLoading: false});
                            message.success(json.msg);
                            this.props.form.resetFields();
                        } else {
                            message.error(json.msg);
                        }

                    })
            }
        });
    };

    /*动态处理项目选项*/
    _handleProjectOptions = (data) => {
        return (
            data.map((item) => {
                return (
                    <Option key={item.appCode}>{item.appName}</Option>
                )
            })

        );
    };

    /*安装包上传前的信息检查处理*/
    _uploadCheck = (system, appCode,environment) => {
        if (system !== '请选择系统'){
            props.data.type = system;
        }
        if (appCode !== '请选择项目'){
            props.data.projectCode = appCode;
        }
        if (environment !== '请选择环境'){
            props.data.environment = environment;
        }
    };


    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        return (
            <div style={{
                margin: 20,
                padding: 20,
                backgroundImage: 'url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg")',
                backgroundColor: '#fff',
                borderRadius: 24,
                minHeight: 600,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <Form style={{width: 400}} onSubmit={this.handleSubmit}>

                    <FormItem label="发布环境" {...formItemLayout}>
                        {getFieldDecorator('versionEnvironment', {
                            initialValue: '请选择发布环境',
                            rules: [{
                                required: true,
                            }]
                        })(
                            <Select style={{width: 120}}>
                                <Option value="real">正式环境</Option>
                                <Option value="test">测试环境</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="App系统" {...formItemLayout}>
                        {getFieldDecorator('appSystem', {
                            initialValue: '请选择系统',
                            rules: [{
                                required: true,
                            }]
                        })(
                            <Select style={{width: 120}}>
                                <Option value="android">android</Option>
                                <Option value="ios">ios</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="项目名称" {...formItemLayout}>
                        {getFieldDecorator('appCode', {
                            initialValue: '请选择项目',
                            rules: [{
                                required: true
                            }],
                        })(
                            <Select style={{width: 120}}>
                                {this._handleProjectOptions(this.state.data)}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label={(
                        <span>版本号&nbsp;
                            <Tooltip title="格式为纯数字形式，不含小数点">
                                <Icon type="question-circle-o"/>
                                 </Tooltip>
                        </span>
                    )} {...formItemLayout}>
                        {getFieldDecorator('versionCode', {
                            rules: [{
                                required: true, message: '请输入版本号',
                            }],
                        })(
                            <InputNumber min={1}/>
                        )}
                    </FormItem>

                    <FormItem label={(
                        <span>版本名称&nbsp;
                            <Tooltip title="格式如1.0或1.0.1">
                                <Icon type="question-circle-o"/>
                                 </Tooltip>
                        </span>
                    )}{...formItemLayout}
                    >
                        {getFieldDecorator('versionName', {
                            rules: [{required: true, message: '请输入版本名称'}],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="版本描述" {...formItemLayout}>
                        {getFieldDecorator('versionDes', {
                            rules: [{required: true, message: '请输入版本描述'}],
                        })(
                            <TextArea rows={4}/>
                        )}
                    </FormItem>

                    <FormItem label={(
                        <span>plist地址&nbsp;
                            <Tooltip title="iOS发布需要">
                                <Icon type="question-circle-o"/>
                                 </Tooltip>
                        </span>
                    )}{...formItemLayout}>
                        {getFieldDecorator('iosPlist', {})(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="更新类型" {...formItemLayout}>
                        {getFieldDecorator('updateType', {
                            initialValue: '请选择更新类型',
                            rules: [{
                                required: true
                            }]
                        })(
                            <Select style={{width: 150}}>
                                <Option key="0" value="0">普通更新</Option>
                                <Option key="1" value="1">强制更新</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label={(
                        <span>文件&nbsp;
                            <Tooltip title="上传前请确保项目、发布环境和app系统已经选择！">
                                <Icon type="question-circle-o"/>
                                 </Tooltip>
                        </span>
                    )} {...formItemLayout}>
                        {
                            this._uploadCheck(getFieldValue("appSystem"),getFieldValue("appCode"),getFieldValue("versionEnvironment"))
                        }
                        {getFieldDecorator('versionDownload', {
                            rules: [{required: true}],
                        })(
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload"/> 上传App安装包
                                </Button>
                            </Upload>
                        )}
                    </FormItem>


                    <FormItem>
                        <Button size='large' loading={this.state.btnLoading} type="primary" htmlType="submit"
                                style={{width: '100%'}}>发布</Button>
                    </FormItem>

                </Form>
            </div>
        );
    }
}

const ReleaseVersionForm = Form.create()(ReleaseVersionPage);

export default ReleaseVersionForm;