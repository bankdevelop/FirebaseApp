class Login extends React.Component{
    render(){
        return React.createElement('div',{className:'login-table'},
                    React.createElement(LoginFrom, null, '')
               );
    }
}

class LoginFrom extends React.Component{
    render(){
        return React.createElement('div', {className:'login-form'}, 
                    React.createElement('div', {className:'login-form-title'},
                        React.createElement('h1', null, 'Login System')
                    ),
                    React.createElement('hr'),
                    React.createElement(FieldLoginArea)
                );
    }
}

class FieldLoginArea extends React.Component{
    render(){
        return React.createElement('div', {className:'login-field-area'},
                    React.createElement('div', null, 'Email : ',
                        React.createElement('input', {type:'text'})
                    ),
                    React.createElement('div', null, 'Password : ',
                        React.createElement('input', {type:'text'})
                    ),
                    React.createElement('div', null,
                        React.createElement('input', {type:'submit', value:'Login'}),
                        React.createElement('input', {type:'reset'})
                    )
                );
    }
}