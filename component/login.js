var domain = 'http://localhost:5000';

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
        this.checkUser = this.checkUser.bind(this);
    }

    handleChangeInput(e){
        var value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
        console.log(e.target.name, this.state[e.target.name]);
    }

    async fetchData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    
    handleSubmit(e){
        e.preventDefault();
        let email = this.state.email;
        let pass = this.state.password;
        
        if (email.length > 5 && pass.length > 2) {
            console.log('fetch login!')
            this.fetchData(
                        domain+'/api/login', 
                        {email:email, pass:pass}
                    )
                    .then(data => {
                        //console.log(data);
                        if (data)
                            localStorage.setItem('freshToken', data);
                        else
                            console.log('Not Found User');
                    }).catch((error) => {
                        console.log(error);
                    });
        }
    }

    checkUser(){
        console.log('check login!')
        if (localStorage['freshToken']) {
            this.fetchData(
                        domain+'/api/check', 
                        {token:localStorage['freshToken']}
                    )
                    .then(data => {
                        console.log(data);
                    }).catch((error) => {
                        console.log(error);
                    });
        }else{
            console.log('nothaveToken');
        }
    }

    render(){
        return React.createElement('div', {className:'login-field-area'},
                    React.createElement('div', null, 'Email : ',
                        React.createElement('input', {
                            name: 'email',
                            type: 'text',
                            onChange: this.handleChangeInput
                        })
                    ),
                    React.createElement('div', null, 'Password : ',
                        React.createElement('input', {
                            name: 'password',
                            type: 'password',
                            onChange: this.handleChangeInput
                        })
                    ),
                    React.createElement('div', null,
                        React.createElement('input',{
                            type:'submit',
                            value:'Login',
                            onClick: this.handleSubmit
                        }),
                        React.createElement('input', {type:'reset'})
                    ),
                    React.createElement('div', null,
                        React.createElement('input',{
                            type:'submit',
                            value:'checkIsLogin?',
                            onClick: this.checkUser
                        })
                    )
                );
    }
}