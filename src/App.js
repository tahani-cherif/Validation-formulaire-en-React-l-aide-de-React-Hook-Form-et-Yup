import React from "react"
import './App.css';
import TextField from '@mui/material/TextField';
import { useForm, Controller,FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const messageError = 'Vous devez remplir ce champ';
const phonetunis=/^[+0]{0,2}(91)?[0-9]{10}$/;
const mdp=/^[A-Za-z]\w{7,14}$/;
const schema=yup.object().shape({
  nom: yup
  .string()
  .max(10,'Le nom est trop long')  
  .required(messageError)
  .nullable(),
  prenom: yup
  .string()
  .max(15,'Le prénom est trop long')  
  .required(messageError)
  .nullable(),
  mail: yup
  .string()
  .email("L'email n'est pas valide")  
  .required(messageError)
  .nullable(),
  phone: yup
  .string()
  .required(messageError)
  .matches(phonetunis, 'Veuillez saisir un numéro valide')  
  .nullable(),
  mdp: yup
  .string()
  .matches(mdp, 'Veuillez saisir un mots de passe valide')  
  .required(messageError)
  .nullable()

})
function App() {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;
  const onSubmit = (data) => {
    console.log('formulaire valide');
    console.log(data);
  };
  return (
    <div className="App">
      <h3>Validation formulaire  en React à l’aide de React Hook Form et Yup </h3>
     <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller 
                name="nom"
                control={control}
                rules={{
                  required: messageError,
                }}
                render={({ field, fieldState }) => {
                  return (
                  <div className="box"> 
                   <TextField label="Nom" {...field} /><br/>
                    <span> {errors.nom?.message}</span>
                    </div> 
                  )}}/>
        <Controller
                name="prenom"
                control={control}
                rules={{
                  required: messageError,
                }}
                render={({ field, fieldState }) => {
                  return (
                  <div className="box"> 
                   <TextField label="prenom" {...field} /><br/>
                    <span> {errors.prenom?.message}</span>
                    </div> 
                    )}}/>
          <Controller 
          name="mail"
          control={control}
          rules={{
            required: messageError,
          }}
          render={({ field, fieldState }) => {
            return (
            <div className="box"> 
             <TextField label="Adresse E-mail" {...field} /><br/>
              <span> {errors.mail?.message}</span>
              </div> 
            )}}/>  

            <Controller 
          name="phone"
          control={control}
          rules={{
            required: messageError,
          }}
          render={({ field, fieldState }) => {
            return (
            <div className="box"> 
             <TextField label="Numéro de téléphone" {...field}/><br/>
              <span> {errors.phone?.message}</span>
              </div> 
            )}}/>  
              <Controller 
          name="mdp"
          control={control}
          rules={{
            required: messageError,
          }}
          render={({ field, fieldState }) => {
            return (
            <div className="box"> 
             <TextField label="Mots de passe" {...field}/><br/>
              <span> {errors.mdp?.message}</span>
              </div> 
            )}}/>                          
          <button type="submit" onClick={handleSubmit(onSubmit)}> Envoyer</button>
       </form>
     </FormProvider>
    </div>
  );
}

export default App;