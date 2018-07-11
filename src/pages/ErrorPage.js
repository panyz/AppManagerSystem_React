/**
 * Created by panyz on 2018/6/11.
 */
import React, {Component} from 'react';

class ErrorPage extends Component {
    render() {
        return (
            <div style={{height: 700, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img style={{width: 450, height: 350,marginTop:10}}
                     src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"/>
                    <div style={{fontSize:48,fontWeight:'bold'}}>404</div>
                    <div style={{fontSize:24}}>抱歉，你访问的页面不存在</div>
            </div>
        )
    }
}

export default ErrorPage;
