import { useState } from "react"

const LoginForm = (props) => {
    const { email, setEmail, handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Please enter your email."
                    value={email}
                    onChange={setEmail(e.target.value)}
                />
            </label>

            <input type="submit" value="Submit" />
        </form>
    )
}

const Login = (props) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div className="login-container">
            <LoginForm email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
        </div>
    )
};

export default Login;