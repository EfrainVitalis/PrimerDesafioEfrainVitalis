const { Console } = require("console");
const { promises: fs } = require("fs");

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
  #libros;
  constructor({ ruta }) {
    this.ruta = ruta;
    this.#libros = [];
  }
  #generarNuevoId() {
    if (this.#libros.length > 0) {
      return this.#libros[this.#libros.length - 1].id + 1;
    } else {
      return 1;
    }
  }
  async reset() {
    this.#libros = [];
    await this.#escribirLibros();
  }

  async #leerLibros() {
    const librosEnJson = await fs.readFile(this.ruta, "utf-8");
    const datosDeLibros = JSON.parse(librosEnJson);
    this.#libros = datosDeLibros.map((j) => new Libro(j));
  }
  async #escribirLibros() {
    const librosJson = JSON.stringify(this.#libros, null, 2);
    await fs.writeFile(this.ruta, librosJson);
  }

  async addLibro({ titulo, descripcion, precio, thumbnail, codigo, stock }) {
    await this.#leerLibros();
    const id = this.#generarNuevoId();
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
    await this.#escribirLibros();
    return libro;
  }

  async getLibro() {
    await this.#leerLibros();
    return this.#libros;
  }
  async actualizarLibro(id, userData) {
    await this.#leerLibros();
    const index = this.#libros.findIndex((u) => u.id === id);
    if (index !== -1) {
      const nuevoLi = new Libro({ id, ...this.#libros[index], ...userData });
      this.#libros[index] = nuevoLi;
      await this.#escribirLibros();
      return nuevoLi;
    } else {
      throw new Error("erro al actualizar: usuario no encontrado");
    }
  }
  async eliminarLibro(id) {
    await this.#leerLibros();
    const index = this.#libros.findIndex((u) => u.id === id);
    if (index !== -1) {
      const arrayConLosBorrados = this.#libros.splice(index, 1);
      await this.#escribirLibros();
      return arrayConLosBorrados[0];
    } else {
      throw new Error("Error al borrar: Usuario no encontrado");
    }
  }
}

async function main() {
  const productonuevo = new ProductManager({ ruta: "libros.json" });
  productonuevo.reset();

  console.log(
    "agregado:",
    await productonuevo.addLibro({
      titulo: "hola",
      descripcion: "prueba",
      precio: "588",
      thumbnail: "sin imagen",
      codigo: "123",
      stock: "11",
    })
  );
  console.log(
    "agregado:",
    await productonuevo.addLibro({
      titulo: "hola2",
      descripcion: "prueba2",
      precio: "588",
      thumbnail: "sin imagen",
      codigo: "12345",
      stock: "13",
    })
  );
  console.log("obtenidos:", await productonuevo.getLibro());
  console.log(
    "actualizado:",
    await productonuevo.actualizarLibro(1, { titulo: "actulizado" })
  );
  console.log("eliminar:", await productonuevo.eliminarLibro(1));
  console.log("obtenidos:", await productonuevo.getLibro());

  const otronuevo = new ProductManager({ ruta: "libros.json" });
  console.log(
    "se agrega otro:",
    await otronuevo.addLibro({
      titulo: "agregado",
      descripcion: "prueba agrego",
      precio: "0",
      thumbnail: "sin imagen",
      codigo: "0",
      stock: "0",
    })
  );
  console.log("obtenidos:", await productonuevo.getLibro());
}

main();
