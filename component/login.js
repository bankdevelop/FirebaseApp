var domain = 'http://localhost:5000';

async function fetchData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return {status: response.status, data: response.json()};
}

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
                    React.createElement('div', 
                        {className:'login-form-title'},
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
            password: '',
            errorCode: ''
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
    }
    
    handleSubmit(e){
        e.preventDefault();
        let email = this.state.email;
        let pass = this.state.password;
        
        if (email.length > 5 && pass.length > 2) {
            console.log('fetch login!')
            fetchData(
                        domain+'/api/login', 
                        {email:email, pass:pass}
                    )
                    .then(data => {
                        if (data.status == 200)
                            localStorage.setItem('freshToken', data);
                        else
                            this.setState(
                                {errorCode: 'Email or Password Wrong!'}
                            );
                    }).catch((error) => {
                        console.log(error);
                    });
        }
    }

    checkUser(){
        console.log('check login!')
        if (localStorage['freshToken']) {
            fetchData(
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
        return React.createElement('div', 
                    {className:'login-field-area'},
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
                    React.createElement('div', 
                        {style: {
                            textAlign: 'center',
                            margin: '1vw'
                        }},
                        React.createElement('input',{
                            type:'submit',
                            value:'Login',
                            onClick: this.handleSubmit
                        }),
                        React.createElement('input',{
                            type:'submit',
                            value:'checkIsLogin?',
                            onClick: this.checkUser
                        })
                    ),
                    React.createElement('span', 
                        {style: {fontSize: '15px', color:'red'}},
                        this.state.errorCode
                    )
                );
    }
}