export const validateString = (
  value,
  fieldName,
  { required = true, maxLength = null } = {}
) => {
  if (required && (value === null || value === undefined || value === "")) {
    return { valid: false, message: `${fieldName} es obligatorio.` };
  }

  if (typeof value !== "string") {
    return { valid: false, message: `${fieldName} debe ser una cadena de texto.` };
  }

  const trimmedValue = value.trim();

  if (maxLength !== null && trimmedValue.length > maxLength) {
    return {
      valid: false,
      message: `${fieldName} no debe exceder el máximo de ${maxLength} caracteres.`,
    };
  }

  return { valid: true, value: trimmedValue };
};

export const validateUser = (userData, requiredFields = ["localId", "uid", "id"]) => {
  if (!userData || typeof userData !== "object") {
    return { valid: false, message: "Datos de usuario inválidos o usuario no autenticado." };
  }
  
  const hasId = userData.localId || userData.uid || userData.id;
  if (!hasId) {
    return { valid: false, message: "Usuario sin identificador válido." };
  }
  
  return { valid: true };
};

export const validateId = (id, fieldName = "ID") => {
  if (!id || typeof id !== "string") {
    return { valid: false, message: `${fieldName} inválido.` };
  }

  const cleaned = id.trim();

  if (cleaned.length === 0) {
    return { valid: false, message: `El ${fieldName} no puede estar vacío.` };
  }

  return { valid: true, value: cleaned };
};
