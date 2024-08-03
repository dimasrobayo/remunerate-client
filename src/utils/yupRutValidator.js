// src/utils/yupRutValidator.js
import * as Yup from 'yup';
import { validarRut } from './rutValidador';

Yup.addMethod(Yup.string, 'validRut', function (message) {
  return this.test('valid-rut', message, function (value) {
    const { path, createError } = this;
    console.log('Validating RUT:', value); // Agregar un log aquí para verificar el valor
    return validarRut(value) || createError({ path, message: message || 'RUT inválido' });
  });
});
