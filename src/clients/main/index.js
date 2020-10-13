import React from 'react';
import ReactDOM from 'react-dom'
import './index.less'
import Socket from 'socket.io-client'
export default class WebCheck extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded:false,
            userName:'',
            context:[{
                name:'369',
                message:'i am now 999'
            }],
            message:''
        };
        this.changeMessage = this.changeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    changeMessage = (value)=>{
        console.log(value.target);
        // this.setState({
        //     message:value
        // })
    };
    loadName = (value)=>{
        console.log(value.target)
        // this.setState({
        //     message:value
        // })
    };
    load = ()=>{
        const socket = Socket.connect('http://localhost:1003');
        socket.on('connect',function(){
            socket.emit('login', this.state.userName);
            this.setState({
                loaded:true
            })
        });
    };
    sendMessage = (e)=>{
        console.log('发送消息');
    };
    render() {
        return(
            <div>
                <When condition = {this.state.loaded}>
                    <div className='container'>
                        <div className='context'>
                            {this.state.context.map((item,index)=>{
                                return (
                                    <div className='session' key={index}>
                                        <div className='name'>{item.name}</div>
                                        <div className='sessionMessage'>{item.message}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='send'>
                            <input type='text' value={this.state.message} onChange={this.changeMessage} />
                            <button onClick={this.sendMessage}>{'send'}</button>
                        </div>
                    </div>
                </When>
                <When condition = {!this.state.loaded}>
                    <div>
                        <span>{'spile your name'}</span>
                        <input value = {this.state.userName} onChange={this.loadName}/>
                    </div>
                </When>
            </div>
        )
    }
}
ReactDOM.render(<WebCheck />,document.getElementById('app'));
