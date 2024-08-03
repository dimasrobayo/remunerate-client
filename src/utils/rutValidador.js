// src/utils/rutValidator.js
export function validarRut(rut) {
    if (!rut || typeof rut !== 'string') {
        console.log('Invalid RUT format');
        return false;
    }
  
    const cleanedRut = rut.replace(/[^0-9kK]/g, '');
    if (cleanedRut.length < 8 || cleanedRut.length > 9) {
        console.log('Invalid length:', cleanedRut.length);
        return false;
    }
  
    const body = cleanedRut.slice(0, -1);
    const dv = cleanedRut.slice(-1).toUpperCase();
  
    let sum = 0;
    let multiplier = 2;
  
    for (let i = body.length - 1; i >= 0; i--) {
      sum += multiplier * parseInt(body.charAt(i), 10);
      multiplier = (multiplier % 7) + 1;
    }
  
    const expectedDv = 11 - (sum % 11);
    const dvCharacter = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();
  
    console.log('DV Calculated:', dvCharacter, 'DV Provided:', dv);
  
    return dv === dvCharacter;
}
