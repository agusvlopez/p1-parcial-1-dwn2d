'use strict';

/*
 * LOPEZ, AGUSTINA
 */

// CLASE DISCO

class Disco {

    constructor(nombre, autor, codigo, pistas){
        this.nombre = nombre;  //nombre del disco
        this.autor = autor; //'nombre del autor del disco';
        this.codigo = codigo; //0; codigo numérico único del disco(no se puede repetir)
        this.pistas = pistas = []; // array de pistas
        this.duracionT = 0;
        this.duracionDiscoM = 0;
  }

  // metodo armar 
  armar() {
  let texto = '';
  
  const titulo = this.nombre;
  const autor = this.autor;
  const codigo = this.codigo;
  const cantidad = this.pistas;
  const duracionT = this.duracionT;
  const duracionM = this.duracionDiscoM;

  texto += `  <h3>Disco</h3>
              <ul>
              <li>Nombre: ${titulo}</li>
              <li>Autor o banda: ${autor}</li>
              <li>Código Único: ${codigo}</li>
              <li>Cantidad de pistas: ${cantidad.length}</li>
              </ul>`                
          
  texto+= `<p>Duracion total: ${duracionT}</p>
            <p>Promedio de duración: ${(duracionT/this.pistas.length).toFixed(2)}</p>
            <p>Pista con mayor duracion del disco: ${duracionM}</p>`

          
  for (let pista of this.pistas){
    
      texto+= `<h4>Pista</h4>
      <ul>
      <li>Nombre: ${pista.nombre} </li>
      <li>Duración: <span style="color: ${pista.duracion > 180 ? "red" : "#1A4A5E"}">${pista.duracion}</span></li>
      </ul>`  
        
  }
  return texto;
 }
 
};

// CLASE PISTA

class Pista {
    constructor(nombre, duracion){
        this.nombre = nombre,
        this.duracion = duracion
    }
}

//Variables:
let discos = [];
let contadorDiscos;
let codigos = [];

// Función Cargar:
const Cargar = () => {
   
let duraciones = [];
let nombreDisco;

let pistas;
let nuevaPista;
let duracionPista;

let duracionTotal = 0;
let duracionMayor;
let ordenar = 0;


    //funcion validar disco 
    const validarDisco = () => {

        nombreDisco = prompt("Ingrese el nombre del disco");

        while(nombreDisco.length === 0 ){
            alert("Nombre incorrecto");
            nombreDisco = prompt("Ingrese un nombre de disco válido"); 
        }
        return nombreDisco;
    }

    //validar autor
    const validarAutor = () => {

        let nombreAutor = prompt("Ingrese el nombre del autor o banda");
        while(nombreAutor.length === 0 ){
            alert("Nombre incorrecto");
            nombreAutor = prompt("Ingrese un nombre de autor o banda válido"); 
        }
        return nombreAutor;
    }

    let codigoUnico;
    let codigoRepetido;
   
    //validar codigo
    const validarCodigo = () => {

        codigoUnico = parseInt(prompt("Ingrese un código numérico único del disco del 1 al 999"));
       
        codigoRepetido = codigos.find((c) => c == codigoUnico);
       
        while (isNaN(codigoUnico) || codigoUnico < 1 || codigoUnico > 999 || codigoRepetido){

          alert("Puede que el codigo ya haya sido ingresado. Ingrese un código numérico único válido del 1 al 999.");

          validarCodigo();

        }
        return codigoUnico;
      }
     
    // validar pistas
    const validarNombrePista = () => {

        let nombrePista = prompt("Ingrese el nombre de la pista");
    
        while (nombrePista.length === 0) {
    
          alert("Pista inválida");
          nombrePista = prompt("Ingrese un nombre de pista válido");
    
        }
        return nombrePista;
      }

     //duracion pista
      const validarDuracion = () => {
    
        duracionPista = parseInt(prompt("Ingrese la duración de la pista (entre 0 y 7200 segundos inclusive)"));

        
        while (isNaN(duracionPista) || duracionPista < 0 || duracionPista > 7200) {
          alert("Duracion incorrecta");
          duracionPista = parseInt(prompt("Ingrese una duración que no supere los 7200 segundos o sea menor a 0"));    
          
        }
        alert("Pista agregada correctamente");

        duracionTotal += duracionPista;

        duraciones.push(duracionPista);
        ordenar = duraciones.sort((a, b) =>  b - a);
        duracionMayor = ordenar.slice(0,1);

        return duracionPista;
      }

      
      const validarDuracionTotal = () => {
        return duracionTotal;
    }

      const validarDuracionMayor = () => {
      return duracionMayor;
    }

 
    // crear nuevo disco
    let nuevoDisco = new Disco();
    nuevoDisco.nombre = validarDisco();
    nuevoDisco.autor = validarAutor();
    nuevoDisco.codigo = validarCodigo();    

 
    //crear nueva pista 
    const crearPista = () => {
        nuevaPista = new Pista();
        nuevaPista.nombre = validarNombrePista();
        nuevaPista.duracion = validarDuracion();
        return nuevaPista;
      }

      do {
        pistas = nuevoDisco.pistas.push(crearPista());
        
      } while(confirm("¿Más pistas?"));
      
    nuevoDisco.duracionT = validarDuracionTotal();
    nuevoDisco.duracionDiscoM = validarDuracionMayor();
   
    
    //agregar los codigos al array codigos[]
    codigos.push(nuevoDisco.codigo);
    
    //agregar los discos al array discos
    discos.push(nuevoDisco);
    
    discos.reduce(contadorDiscos = (acc, valor) => {
      return acc + valor;
    });
    
}

// Función Mostrar:
const Mostrar = () => {
    // Variable para ir armando la cadena:
    let html = '';
    html += `<p>Cantidad de discos cargados: ${contadorDiscos(0, discos.length)}</p>`;
    
    for (let disco of discos) {
    html += disco.armar();
    }
  
    document.getElementById('info').innerHTML = html; 

};

