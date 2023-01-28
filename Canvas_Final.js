var canvas = document.getElementById("canvas"); //Identificamos como canvas al canvas que creamos en HTML.
var papel = canvas.getContext("2d"); //Definimos el Context.
var movimiento = 1; // Definimos cuanto se va a mover la linea.
var grosor = document.getElementById("grosor"); //Traemos el objeto "grosor".
var color = document.getElementById("color");//Traemos el objeto "color".
//Definimos el Color de la linea, esta variable tiene que estar despues de la variable que llama al objeto "color"...
//...para que este le pueda dar un valor.
var colorcito;

//Añadimos un escuchador "change" al objeto "color", este detecta cualquier cambio que se realice en este objeto.
color.addEventListener ("change",colorSelector);

//Esta funcion se activa al suceder el evento "change", cambia el valor de la variable "colorcito".
function colorSelector(selectorColor)
{
  //"color.value" trae el valor que se le otorga el usuario desde la caja de colores (input type="color").
  colorcito = color.value;
}

//Esta es la función base del dibujo.
function dibujarLinea (color,xinicial,yinicial,xfinal,yfinal,lienzo)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = grosor.value;
  lienzo.moveTo(xinicial,yinicial);
  lienzo.lineTo(xfinal,yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

//Añadimos un escuchador al objeto canvas, que detecte mousedown, y activamos la funcion mouseDibujo.
canvas.addEventListener("mousedown", mouseDibujo);

//Esta Funcion solo se activa al momento de que el escuchador de mousedown se activo.
function mouseDibujo()
{
  //Dentro de esta funcion añadimos un escuchador al objeto canvas, que detecte mousemove, y activamos la funcion mouseDibujo2.
  canvas.addEventListener("mousemove", mouseDibujo2);
}

//Esta Funcion solo se activa al momento de que el escuchador de mousemove se activo.
//Añadimos un parametro (evento2) a la funcion.
//Este parametro se llena por dentro de la informacion del evento mousemove, asi podemos obtener las cordenadas del mouse al moverse.
function mouseDibujo2(evento2)
{
  //offsetX y offsetY, definen las cordenadas respecto a un objeto donde ocurre un evento.
  var xi = evento2.offsetX;
  var yi = evento2.offsetY;
  var yf = yi + movimiento;
  var xf = xi + movimiento;
  dibujarLinea (colorcito, xi, yi, xf, yf, papel);

//Cuando ocurre el evento onmouseup se activa la funcion terminaDibujo.
//Dentro de esta funcion se remueve el escuchador "mousemove" que activaba todo al principio.
  canvas.onmouseup = function terminaDibujo()
    {
      canvas.removeEventListener("mousemove", mouseDibujo2);
    }
}

//Dibuja un Cuadrado que enmarca el canvas.
dibujarLinea (colorcito, 0, 0, 0, 700, papel);
dibujarLinea (colorcito, 0, 0, 700, 0, papel);
dibujarLinea (colorcito, 700, 0, 700, 700, papel);
dibujarLinea (colorcito, 700, 700, 0, 700, papel);
