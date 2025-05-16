import type React from "react";
import styles from "./RegisterPage.module.css";
import { useState, type FormEvent } from "react";
import { useActionData } from "react-router";

interface RegisterProps {
    onRegisterSuccess?: () => void;
}

const RegisterPage : React.FC<RegisterProps> = ({ onRegisterSucess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState <'PARTICIPANT' | 'ORGANIZER' > ('PARTICIPANT');
    const [error, setError] = useState<string | null> (null)

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null);
        
        try{
            const res = await fetch(
                'https://senac-eventos-cutal-backend-production.up.railway.app/auth/login',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify ({ name, email, password, role}),
                }
    
            );
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Falha no registro');
            }
            alert('Cadastro realizado com sucesso!');
            onRegisterSucess?.();
            window.location.href = '/login';
        } catch (err: unknown){
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg);
            alert('Erro ao registrar: ${msg}');
        }
    }



return ( 
<main className={styles.padding}>
            <div className={styles.registro}>
                <div>
                    <h3 className={styles.titulo}>Registrar Usuário</h3>
                </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                
                {error && <div>{error}</div>}

                <div className={styles.campo}>
                    <label>Nome</label>
                    <input className={styles.input}
                    type="name"
                    id="name"
                    value={name}
                    onChange={e => setPassword(e.target.value)}
                    />
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

                <div className={styles.campo}>
                    <label>Tipo</label>
                    
                    <select className={styles.input}>
                        <option>Participante</option>
                        <option>Organizador</option>
                    </select>
                </div>

                <div>
                    <button type="submit" className={styles.botao}>Registrar</button>
                </div>

            </form>
                
            </div>
        </main>
    )
}
export default RegisterPage