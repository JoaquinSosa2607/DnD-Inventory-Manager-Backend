// Mensajes de validaciones en caso de que los campos no cumplan con las condiciones pedidas por el backend

export const stringMessages = {
    'string.base': `{#label} debe ser un texto`,
    'string.empty': `{#label} no puede estar vacío`,
    'string.min': `{#label} debe tener al menos {#limit} caracteres`,
    'string.max': `{#label} no debe tener más de {#limit} caracteres`,
    'any.required': `{#label} es un campo requerido`,
};

export const numberMessages = {
    'number.base': `{#label} debe ser un número`,
    'number.empty': `{#label} no puede estar vacío`,
    'number.min': `{#label} debe ser mayor o igual a {#limit}`,
    'number.max': `{#label} debe ser menor o igual a {#limit}`,
    'any.required': `{#label} es un campo requerido`,
};

export const arrayMessages = {
    'array.base': `{#label} debe ser un número`,
    'array.empty': `{#label} no puede estar vacío`,
    'array.min': `{#label} debe ser mayor o igual a {#limit}`,
    'array.max': `{#label} debe ser menor o igual a {#limit}`,
    'any.required': `{#label} es un campo requerido`,
};

export const booleanMessages = {
    'boolean.base': `{{#label}} debe ser de tipo booleano`,
    'any.required': `{#label} es un campo requerido`,
};
