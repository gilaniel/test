import React, {Component} from 'react'

class Header extends Component {
    state = {
        reverted: false
    }

    render() {
        return (
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Logo</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#" onClick={this.revert}>empty</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    revert = () => {
        console.log(123)
    }
}

export default Header