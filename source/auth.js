import React, {Component} from 'react'
import serialize from 'form-serialize'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js'

class Auth extends Component {
    state = {
        login: false,
        values: {
            login: '',
            password: ''        
        }
    }


    // handleChange = (e) => {
    //     const { value, name } = e.target;
    //     this.setState((state) => {
    //         ...state.values,
    //         [name]: value
    //     });
    // }

    render() {
        return (
            <div className="sidebar-block">
                <div className="sidebar-block__content">
                    {this.props.authorized ? <UserBlock onBtnClick={this.props.onBtnClick}/> :
                        <form className="js-auth-form">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="login" name="login" type="text" className="validate"/>
                                    <label htmlFor="login">Login</label>
                                </div>
                                <div className="input-field col s12">
                                    <input id="password" name="password" type="password" className="validate"/>
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="col s12 center">
                                    <div className="row">
                                        <div className="col s12">
                                            <button className="waves-effect waves-light btn" onClick={this.state.login ? this.registrate : this.login}>{this.state.login ? 'Регистрация' : 'Войти'}</button>
                                        </div>
                                    </div>
                                    <br/>
                                    <button className="waves-effect waves-light btn-flat" onClick={this.changeLoginState}>{this.state.login ? 'Войти' : 'Регистрация'}</button>
                                </div>
                            </div>
                        </form> 
                    }
                </div>
            </div>
        )
    }

    registrate = (e) => {
        let me = this;
        e.preventDefault();
        let form = document.getElementsByClassName('js-auth-form')[0],
            params = serialize(form);
        axios.post('/registrate', params)
            .then(function (resp) {
                me.setState({
                    login: false
                })
            })
            .catch(function (error) {
                try{
                    if(error.response.data.body == 'user_exist'){
                        M.toast({html: 'Такой пользователь уже существует', classes: 'error'})
                    }
                }catch(e){
                    console.log(e);
                }
            });
            
    }

    changeLoginState = (e) => {
        e.preventDefault();
        this.setState({
            login: !this.state.login
        })
    }

    login = (e) => {
        let me = this;
        e.preventDefault();
        let form = document.getElementsByClassName('js-auth-form')[0],
            params = serialize(form);
        axios.post('/login', params)
            .then(function (resp) {
                me.props.onBtnClick();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

class UserBlock extends Component {
    render() {
        return (
            <div className="row">
                Не в ту дырку, придурок!
                <br/>
                <br/>
                <div>
                    <button className="btn" onClick={this.logout}>Выход</button>
                </div>
            </div>
        )
    }

    logout = () => {
        var me = this;
        axios.get('/logout').then((resp)=>{
            if(resp.data.logout){
                me.props.onBtnClick();
            }
        })
    }
}

export default Auth