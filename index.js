import React, {Component} from 'react'
import {render} from 'react-dom'
import Header from './source/header'
import Auth from './source/auth'
import './source/sass/index.sass'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js'
import axios from 'axios'

class App extends Component {
    state = {
        authorized: false
    }

    componentWillMount() {
        let me = this;
        axios.get('/user_status').then((resp)=>{
            if(resp.data.body.authorized){
                me.setState({
                    authorized: true
                })
            }
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col l9">
                            <div className="jumbotron">
                                <h1 className="display-3">
                                    gg asd 
                                </h1>
                            </div>
                        </div>
                        <div className="col l3">
                            <Auth authorized={this.state.authorized} onBtnClick={this.handleClick.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleClick = () => {
        this.setState({
            authorized: !this.state.authorized
        })
    }
}

render(<App/>, document.getElementById('root'))