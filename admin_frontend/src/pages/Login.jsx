import logo from "../assets/logo.png"
export default function Login() {
    return (
        <section className="mainContainer">
            <img src={logo} />
            <main className="loginContainer">
                <h1>Admin panel</h1>
                <form>
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Contraseña" />
                    <input type="submit" value="Login" className="button" />
                </form>

            </main>
        </section>
    )
}