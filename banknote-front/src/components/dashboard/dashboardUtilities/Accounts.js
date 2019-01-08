import React, { Component } from 'react'

class Accounts extends Component {
    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = `
        !function (w, d, s, id, r) {
            w[r] = {};
            w[r] = w[r] || function () { w[r].q = w[r].q || [].push(arguments) };
            var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? "http" : "https";
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + "://www.paybook.com/sync/widget.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(window, document, "script", "sync-widget", "syncWidget");
        syncWidget.options = { token: "${user.token}", baseDiv: "sync_container", theme: "ligth" };
        syncWidget.setDev
                    `
        document.body.appendChild(s);
    }

    render() {
        return (
            <div>
                <div className="d-flex jcc aic">
                    <div id="sync_container" className="vh" style={{ width: '60vw', margin: 8, padding: 8 }}></div>
                </div>
            </div>
        )
    }
}

export default Accounts