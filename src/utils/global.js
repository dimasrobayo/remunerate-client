// Para formatear el valor como moneda para visualización
export const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  // Para convertir el valor formateado de nuevo a un float
  export const parseCurrency = (formattedValue) => {
    if (!formattedValue) return 0;
    // Remueve los caracteres no numéricos, incluyendo el símbolo de moneda
    const numericValue = formattedValue.replace(/[^0-9,-]+/g, '').replace(',', '.');
    return parseFloat(numericValue);
  };