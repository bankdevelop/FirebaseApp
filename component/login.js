class Login extends React.Component{
    render(){
        return React.createElement('div', {className:'login-table'},
                    React.createElement(LoginFrom)
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
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeInput(stateName, elementID){
        var value = document.getElementById(elementID).value;
        this.setState({
            [stateName]: value
        });
    }

    handleSubmit(){
        //fetch()
    }

    render(){
        return React.createElement('div', {className:'login-field-area'},
                    React.createElement('div', null, 'Email : ',
                        React.createElement('input', {
                            id: 'emailField',
                            type: 'text',
                            onChange: () => this.handleChangeInput(
                                'email',
                                'emailField'
                            )
                        })
                    ),
                    React.createElement('div', null, 'Password : ',
                        React.createElement('input', {
                            id: 'passField',
                            type: 'password',
                            onChange: () => this.handleChangeInput(
                                'password',
                                'passField'
                            )
                        })
                    ),
                    React.createElement('div', null,
                        React.createElement('input',{
                            type:'submit',
                            value:'Login',
                            onSubmit: () => this.handleSubmit()
                        }),
                        React.createElement('input', {type:'reset'})
                    )
                );
    }
}