class UsernamePasswordInput extends React.Component {
	constructor(props) {
		super(props);
		this.pass = React.createRef();
		this.username = React.createRef();
		this.checkPass = this.checkPass.bind(this);
		this.checkUsername = this.checkUsername.bind(this);
	}

	checkPass() {
		let _pass1 = this.pass.current.value;
		let valid = _pass1.length >= 8 && _pass1 != _pass1.toLowerCase() && /\d+/.test(_pass1);
		this.props.validatePass(valid);	
	}

	checkUsername() {
		let _username1 = this.username.current.value;
		//check for special characters && starting capital letter
		let validUsername = _username1.length > 1 && _username1[0] === _username1[0].toUpperCase() && !_username1.match(/[^a-zA-Z]/g);
		this.props.validateUsername(validUsername);
	}

	render() {
		return (
			<div className='input-group mb-2'>
				<input type="text" ref={this.username} onChange={this.checkUsername} className="form-control" placeholder = "username" />
				<input type="text" ref={this.pass} onChange={this.checkPass} className="form-control" placeholder = "password"/>
			</div>
		);
	}
}

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.validateUsername = this.validateUsername.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
        this.submit = this.submit.bind(this);
		this.state = {
			username:false,
			password: false,
			currentUsername: ""
		};			
	}
	
	validateUsername(valid, username) {
		if(valid){
			this.setState({currentUsername : username, username : true})
		}
		else{
			this.setState({username : false})
		}
	}

	validatePassword(valid) {
		if(valid){
			this.setState({password : true})
		}
		else{
			this.setState({password : false})
		}
	}

    submit(e) {
        e.preventDefault();
		ReactDOM.render(
			<ProfilePage currentUser={this.state.currentUsername} />,
			document.getElementById("root")
		  );
    }

	render() {
		return (
			<form className="input-group mt-5" onSubmit={this.submit}>
				<UsernamePasswordInput validatePass={this.validatePassword} validateUsername={this.validateUsername} /> <br />
				<button disabled={!this.state.username || !this.state.password} className="btn btn-default"> Submit </button>
			</form>
		);
	}
}

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout(){
		ReactDOM.render(<LoginForm />, document.getElementById("root"));
	};
	
	render() {
		return (
		  <div className="container">
			<h1> Hi, welcome back {this.props.currentUsername}</h1>
			<button className="btn m-2" onClick={this.logout}>Log out</button>
		  </div>
		);
	}
}

ReactDOM.render(
	<LoginForm />,
	document.getElementById('root')
);