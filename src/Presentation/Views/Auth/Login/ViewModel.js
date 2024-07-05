import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { auth } from '../../../../Store/Slices/sessionSlice';
import { setToken, setProfile } from '../../../../Store/utils/utils';
import { myProfileGlobalState } from '../../../../Store/Slices/accountUserSlice';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { toast } from 'react-toastify';

const LoginViewModel = () => {
  const [errorMessage, setErrorMessage] = useState('');  
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem(('my_profile')));

  const initialValues = () => {
    return {
      email: "",
      password: ""
    };
  }

  const Login = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email es inválido!")
        .required("Email es requerido!"),
      password: Yup.string()
        .required("La contraseña es requerida!"),
    }),
    onSubmit: async (formData) => {
      setErrorMessage("");
      try {
        const response = await ApiRemunerate.post('users/login', formData);
        const { success, data } = response.data;
        console.log(data);
        if(success){
          dispatch(myProfileGlobalState(data));
          setProfile(data);
          setToken(data.session_token);
          dispatch(auth());
          toast.success(data.gender === 'masculino' ? `Bienvenido ${data.name + ' ' +  data.lastname}` : `Bienvenida ${data.name + ' ' +  data.lastname}` );
        }
      } catch (error) {
        const { message } = error.response.data;
        setErrorMessage(message);
      }
    }
  });

  return {
    Login,
    profile,
    errorMessage
  }
}

export default LoginViewModel;