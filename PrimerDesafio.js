class Libro {
  constructor({ id, titulo, descripcion, precio, thumbnail, codigo, stock }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.thumbnail = thumbnail;
    this.codigo = codigo;
    this.stock = stock;
  }
}
class ProductManager {
  static #ultimoId = 0;
  #libros;
  constructor() {
    this.#libros = [];
  }
  static #generarNuevoId() {
    return ++ProductManager.#ultimoId;
  }
  addLibro({ titulo, descripcion, precio, thumbnail, codigo, stock }) {
    const id = ProductManager.#generarNuevoId();
    const libro = new Libro({
      id,
      titulo,
      descripcion,
      precio,
      thumbnail,
      codigo,
      stock,
    });
    this.#libros.push(libro);
    return libro;
  }

  getLibro() {
    return this.#libros;
  }
  getLibrosById(id) {
    const buscarlibro = this.#libros.find((l) => l.id === id);
    if (!buscarlibro)
      throw new Error(`Libro no encontrado id ${id}  no existe`);
    return buscarlibro;
  }
}
const productonuevo = new ProductManager();

const l1 = productonuevo.addLibro({
  titulo: "hola",
  descripcion: "prueba",
  precio: "588",
  thumbnail: "sin imagen",
  codigo: "123",
  stock: "11",
});
const l2 = productonuevo.addLibro({
  titulo: "hola2",
  descripcion: "prueba2",
  precio: "600",
  thumbnail: "sin imagen",
  codigo: "12345",
  stock: "11",
});
const l3 = productonuevo.addLibro({
  titulo: "hola3",
  descripcion: "prueba3",
  precio: "800",
  thumbnail: "sin imagen",
  codigo: "1234567",
  stock: "16",
});
// console.log(l1);
// console.log(l2);
// console.log(l3);
// console.log(productonuevo.getLibro());
// console.log(productonuevo.getLibrosById(3));
try {
  const buscarlibro = productonuevo.getLibrosById(1);
  console.log(buscarlibro);
} catch (error) {
  console.log(error.message);
}
try {
  const buscarlibro2 = productonuevo.getLibrosById(16);
  console.log(buscarlibro2);
} catch (error) {
  console.log(error.message);
}
