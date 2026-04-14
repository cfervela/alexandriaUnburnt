import { Product } from './product';

describe('Product', () => {
  it('should define product shape', () => {
    const product: Product = {
      isbn: '123',
      title: 'Libro',
      author: 'Autor',
      genre: 'Genero',
      publisher: 'Editorial',
      price: 10,
      stock: 5,
      image: 'image.jpg',
      description: 'Descripcion',
    };

    expect(product).toBeTruthy();
  });
});
