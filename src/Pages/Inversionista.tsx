import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import styles from '../Style/inversionista.module.css';

const Inversionista = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [comisionista, setComisionista] = useState(null);
  const [mostrarPin, setMostrarPin] = useState(false);
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [isPinValid, setIsPinValid] = useState(true);
  const [error, setError] = useState('');

  const comisionistas = [
    { label: 'Seleccione uno', value: null },
    { label: 'Comisionista 1', value: 'comisionista1' },
    { label: 'Comisionista 2', value: 'comisionista2' },
    { label: 'Comisionista 3', value: 'comisionista3' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (!nombre || !correo || !usuario || !password || !confirmPassword) {
      setError('Por favor complete todos los campos');
      return;
    }

    setError('');
    setMostrarPin(true);
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPin = [...pin];
    newPin[index] = e.target.value.slice(0, 1);
    setPin(newPin);

    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pinString = pin.join('');
    if (/^\d{6}$/.test(pinString)) {
      setIsPinValid(true);
      alert('Registro completado exitosamente');
      setMostrarPin(false);
    } else {
      setIsPinValid(false);
    }
  };

  const footer = (
    <div className={styles.pinFooter}>
      <Button 
        label="Verificar PIN" 
        onClick={handlePinSubmit} 
        className={styles.pinVerifyButton}
      />
    </div>
  );

  return (
    <div className={styles.inversionistaContainer}>
      <form className={styles.inversionistaForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="nombre">Nombre:</label>
          <InputText
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.formInput}
            placeholder="Ingrese su nombre"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="correo">Correo:</label>
          <InputText
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={styles.formInput}
            type="email"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="usuario">Usuario:</label>
          <InputText
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className={styles.formInput}
            placeholder="Cree un nombre de usuario"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contraseña">Contraseña:</label>
          <Password
            id="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
            feedback={false}
            toggleMask
            placeholder="Cree una contraseña"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
          <Password
            id="confirmarContraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.formInput}
            feedback={false}
            toggleMask
            placeholder="Repita su contraseña"
          />
        </div>

        <div className={styles.comisionistaField}>
          <label htmlFor="comisionista">¿Desea un comisionista?</label>
          <Dropdown
            id="comisionista"
            value={comisionista}
            options={comisionistas}
            onChange={(e) => setComisionista(e.value)}
            optionLabel="label"
            placeholder="Seleccione uno"
            className={styles.formInput}
          />
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <Message severity="error" text={error} />
          </div>
        )}

        <Button 
          label="Registrar" 
          type="submit" 
          className={styles.submitButton}
        />
      </form>

      <Dialog 
        visible={mostrarPin} 
        onHide={() => {
          setMostrarPin(false);
          setIsPinValid(true);
        }}
        header="Verificación de Seguridad"
        footer={footer}
        className={styles.pinDialog}
        contentClassName={styles.pinDialogContent}
        headerClassName={styles.pinDialogHeader}
        closeOnEscape={false}
        closable={false}
      >
        <div className={styles.pinDialogBody}>
          <p className={styles.pinInstructions}>Ingrese el PIN de 6 dígitos enviado a:</p>
          <p className={styles.userEmail}>{correo}</p>
          
          <div className={styles.pinInputContainer}>
            {pin.map((digit, index) => (
              <InputText
                key={index}
                id={`pin-${index}`}
                value={digit}
                onChange={(e) => handlePinChange(e, index)}
                className={`${styles.pinInput} ${!isPinValid ? styles.error : ''}`}
                maxLength={1}
                autoFocus={index === 0}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && index > 0) {
                    const prevInput = document.getElementById(`pin-${index - 1}`) as HTMLInputElement;
                    prevInput?.focus();
                  }
                }}
              />
            ))}
          </div>
          
          {!isPinValid && (
            <Message 
              severity="error" 
              text="El PIN debe ser de 6 dígitos numéricos." 
              className={styles.errorMessage}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Inversionista;
