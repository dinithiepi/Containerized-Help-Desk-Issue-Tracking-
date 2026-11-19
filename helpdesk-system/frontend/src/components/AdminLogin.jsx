function AdminLogin({ onLogin, error }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        onLogin(username, password);
    };

    return (
        <div className="login-page">
            <div className="login-overlay" />
            <div className="login-box">
                <div className="login-header">
                    <div className="login-icon">🔐</div>
                    <h2>Admin Portal</h2>
                    <p>University of Peradeniya IT Help Desk</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label>Username</label>
                        <input name="username" type="text"
                            placeholder="Enter admin username" required />
                    </div>
                    <div className="login-field">
                        <label>Password</label>
                        <input name="password" type="password"
                            placeholder="Enter password" required />
                    </div>
                    {error && <div className="login-error">⚠️ {error}</div>}
                    <button type="submit" className="login-btn">Sign In →</button>
                </form>
                <p className="login-note">
                    🔒 This portal is restricted to IT administrators only.<br />
                    Students please use the Student Support tab.
                </p>
            </div>
        </div>
    );
}

export default AdminLogin;