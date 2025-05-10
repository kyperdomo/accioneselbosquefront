import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import styles from '../Style/administracion.module.css';

const Administracion = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarPin, setMostrarPin] = useState(false);
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [isPinValid, setIsPinValid] = useState(true);

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value);
  const handleCorreoChange = (e: React.ChangeEvent<HTMLInputElement>) => setCorreo(e.target.value);
  const handleContraseñaChange = (e: React.ChangeEvent<HTMLInputElement>) => setContraseña(e.target.value);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPin = [...pin];
    newPin[index] = e.target.value.slice(0, 1);
    setPin(newPin);

    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && correo && contraseña) {
      setMostrarPin(true);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pinString = pin.join('');
    if (/^\d{6}$/.test(pinString)) {
      setIsPinValid(true);
      alert('PIN validado correctamente');
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
    <div className={styles.legalContainer}>
      <form className={styles.legalForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="nombre">NombreAD:</label>
          <InputText
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
            className={styles.formInput}
            placeholder="Ingrese su nombre"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="correo">Correo:</label>
          <InputText
            id="correo"
            value={correo}
            onChange={handleCorreoChange}
            className={styles.formInput}
            type="email"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contraseña">Contraseña:</label>
          <Password
            id="contraseña"
            value={contraseña}
            onChange={handleContraseñaChange}
            className={styles.formInput}
            feedback={false}
            toggleMask
            placeholder="Contraseña"
          />
        </div>

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
        header="Verificación de Seguridad - Administración"
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

export default Administracion;