/**
 * 自定义图表弹出框
 * Created by panyz on 2018/7/9.
 */
import React,{Component} from 'react';
import PropTypes from 'prop-types';

class CustomToolTip extends Component{
    static propTypes = {
        type: PropTypes.string,
        payload: PropTypes.array,
        label: PropTypes.string,
    };

    _checkInfo = (data) => {
        return !(data === null || data === undefined || data.length === 0);
    };

    render() {
        const {active,data} = this.props;
        if (active && this._checkInfo(data)) {
            const {payload, label} = this.props;
            return (
                <div style={{background: 'rgba(0,0,0,0.8)', padding: 10}}>
                    {data !== [] ?(
                        <div>
                            <p style={{color: '#fff'}}>{`${label}`}</p>
                            <p style={{color: `${payload[0].fill}`}}>{`${payload[0].name}` + "：" + `${payload[0].value}`}</p>
                            <p style={{color: `${payload[1].fill}`}}>{`${payload[1].name}` + "：" + `${payload[1].value}`}</p>
                            <p style={{color: '#fff'}}>{"总计" + "：" + `${payload[0].value + payload[1].value}`}</p>
                        </div>
                    ):(<div>

                    </div>) }

                </div>
            );
        }

        return null;
    }
}

export default CustomToolTip;