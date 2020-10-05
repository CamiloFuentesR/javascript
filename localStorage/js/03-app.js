localStorage.removeItem('nombre');


// Actualizar un registro

mesesArray.push('Nuevo Mes');
console.log(mesesArray);
localStorage.setItem('meses', JSON.stringify(mesesArray));

//limpiar localStorage
 localStorage.clear();