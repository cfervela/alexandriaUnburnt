const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

const normalizeProductInput = (payload = {}) => {
  const normalized = { ...payload };

  if (typeof normalized.isbn === 'string') normalized.isbn = normalized.isbn.trim();
  if (typeof normalized.title === 'string') normalized.title = normalized.title.trim();
  if (typeof normalized.author === 'string') normalized.author = normalized.author.trim();
  if (typeof normalized.genre === 'string') normalized.genre = normalized.genre.trim();
  if (typeof normalized.publisher === 'string') normalized.publisher = normalized.publisher.trim();
  if (typeof normalized.image === 'string') normalized.image = normalized.image.trim();
  if (typeof normalized.description === 'string') normalized.description = normalized.description.trim();
  if (typeof normalized.price === 'string' && normalized.price.trim() !== '') normalized.price = Number(normalized.price);
  if (typeof normalized.stock === 'string' && normalized.stock.trim() !== '') normalized.stock = Number(normalized.stock);

  return normalized;
};

const validateCreateProduct = (payload = {}) => {
  const product = normalizeProductInput(payload);
  const errors = [];

  if (!isNonEmptyString(product.isbn)) {
    errors.push('El ISBN es requerido');
  }

  if (!isNonEmptyString(product.title)) {
    errors.push('El titulo es requerido');
  }

  if (!isNonEmptyString(product.author)) {
    errors.push('El autor es requerido');
  }

  if (!isNonEmptyString(product.genre)) {
    errors.push('El genero es requerido');
  }

  if (!isNonEmptyString(product.publisher)) {
    errors.push('La editorial es requerida');
  }

  if (!Number.isFinite(product.price) || product.price < 0) {
    errors.push('El precio debe ser un numero mayor o igual a 0');
  }

  if (!Number.isInteger(product.stock) || product.stock < 0) {
    errors.push('El stock debe ser un entero mayor o igual a 0');
  }

  if (product.image !== undefined && !isNonEmptyString(product.image)) {
    errors.push('La imagen debe ser texto valido');
  }

  if (!isNonEmptyString(product.description)) {
    errors.push('La descripcion es requerida');
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: product,
  };
};

const validateUpdateProduct = (payload = {}) => {
  const product = normalizeProductInput(payload);
  const errors = [];

  if (!isNonEmptyString(product.title)) {
    errors.push('El titulo es requerido');
  }

  if (!isNonEmptyString(product.author)) {
    errors.push('El autor es requerido');
  }

  if (!isNonEmptyString(product.genre)) {
    errors.push('El genero es requerido');
  }

  if (!isNonEmptyString(product.publisher)) {
    errors.push('La editorial es requerida');
  }

  if (!Number.isFinite(product.price) || product.price < 0) {
    errors.push('El precio debe ser un numero mayor o igual a 0');
  }

  if (!Number.isInteger(product.stock) || product.stock < 0) {
    errors.push('El stock debe ser un entero mayor o igual a 0');
  }

  if (product.image !== undefined && !isNonEmptyString(product.image)) {
    errors.push('La imagen debe ser texto valido');
  }

  if (!isNonEmptyString(product.description)) {
    errors.push('La descripcion es requerida');
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: product,
  };
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};
