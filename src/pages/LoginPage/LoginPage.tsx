import type React from "react";
import styles from "./LoginPage.module.css";
import { useState, type FormEvent } from "react";

interface LoginProps {
    onLoginSuccess?: (token: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({onLoginSuccess}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch(
                "https://senac-eventos-cutal-backend-production.up.railway.app/auth/login",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({email, password}),
                }
            );
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Falha no login");
            }
            const data = await res.json();
            onLoginSuccess?.(data.token);
            alert("Login Efetuado");

        } catch(err: unknown) {
            if (err instanceof Error){
                setError(err.message);
                alert(`Erro ao logar: ${err.message}`);
            } else {
                const errorMsg = String(err);
                setError(errorMsg);
                alert(`Erro ao logar: ${errorMsg}`);
            } 
        }
    };
        
    return (
<main>
    
        <header className={styles.menu}>
            <h3>Senac Eventos Cultural</h3>
            <a href="#">Menu</a>
        </header>

    <div className={styles.padding}>

        <div className={styles.registro}>
            <div>
                <h3 className={styles.titulo}>Registrar Usuário</h3>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                
                {error && <div>{error}</div>}

            <div className={styles.campo}>
                <label>Nome</label>
                <input className={styles.input}/>
            </div>

            <div className={styles.campo}>

                <label>Email</label>

                <input className={styles.input} 
                type="email" 
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />

            </div>

            <div className={styles.dbotao}>
                <button type="submit" className={styles.botao}>Entrar</button>
            </div>

            </form>
              
        </div>
    </div>


</main>

    )
}


export default LoginPage