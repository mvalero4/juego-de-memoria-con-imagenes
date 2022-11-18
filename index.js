//Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 35;
let timerInicial = 35;
let tiempoRegresivo = null;

//DOM
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');
let modal = document.querySelector('.modal');

//sonidos
let winAudio = new Audio('./assets/sounds/ganar.mp3');
let loseAudio = new Audio('./assets/sounds/perder.mp3');
let clickAudio = new Audio('./assets/sounds/click.mp3');
let errorAudio = new Audio('./assets/sounds/error.mp3');
let correctAudio = new Audio('./assets/sounds/correcto.mp3');


//Generar numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,];
numeros = numeros.sort(() => {return Math.random() - 0.5});
console.log(numeros);

//Funciones
function contarTiempo() {
	tiempoRegresivo = setInterval(() => {
		timer--;
		mostrarTiempo.innerHTML = `Tiempo restante: ${timer} segundos`;
		if (timer == 0) {
			clearInterval(tiempoRegresivo);
			bloquearTarjetas();
			loseAudio.play();
			modal.classList.remove('invisible');
			setTimeout(() => {
				location.reload();
			}, 3000);
		}
	}, 1000);
}

function bloquearTarjetas() {
	for (let i = 0; i <= 15; i++) {
		let tarjetaBloqueada = document.getElementById(i);
		tarjetaBloqueada.innerHTML = `<img src='./assets/images/${numeros[i]}.png' alt='imagen'>`;
		tarjetaBloqueada.disabled = true;
	}
}

//Funcion principal
function destapar(id) {
	if (temporizador == false) {
		contarTiempo();
		temporizador = true;
	}

	tarjetasDestapadas++;

	if (tarjetasDestapadas == 1) {
		//Mostrar el primer numero
		tarjeta1 = document.getElementById(id);
		primerResultado = numeros[id];
		tarjeta1.innerHTML = `<img src='./assets/images/${primerResultado}.png' alt='imagen'>`;
		clickAudio.play();

		//deshabilitar el primer boton
		tarjeta1.disabled = true;
	} else if (tarjetasDestapadas == 2) {
		//mostrar segundo numero
		tarjeta2 = document.getElementById(id);
		segundoResultado = numeros[id];
		tarjeta2.innerHTML = `<img src='./assets/images/${segundoResultado}.png' alt='imagen'>`;
		clickAudio.play();

		//deshabilitar segundo boton
		tarjeta2.disabled = true;

		//incrementando movimientos
		movimientos++;
		mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

		if (primerResultado == segundoResultado) {
			correctAudio.play();
			setTimeout(() => {
				tarjeta1.style.backgroundColor = 'rgba(0,255,0,0.7)';
				tarjeta2.style.backgroundColor = 'rgba(0,255,0,0.7)';
				setTimeout(() => {
					tarjeta1.style.backgroundColor = '';
					tarjeta2.style.backgroundColor = '';
				}, 700);
			}, 100);

			tarjetasDestapadas = 0;

			//aumentar aciertos
			aciertos++;
			mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

			if (aciertos == 8) {
				winAudio.play();
				clearInterval(tiempoRegresivo);
				mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎`;
				mostrarTiempo.innerHTML = `Fantástico!!! 🎉, solo demoraste ${timerInicial - timer} segundos`;
				mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 👍`;
				setTimeout(() => {
					location.reload();
				}, 3000);
			}
		} else {
			errorAudio.play();
			//mostrar valoras y volver a tapar
			setTimeout(() => {
				tarjeta1.style.backgroundColor = 'rgba(255,0,0,0.7)';
				tarjeta2.style.backgroundColor = 'rgba(255,0,0,0.7)';
				setTimeout(() => {
					tarjeta1.innerHTML = '';
					tarjeta2.innerHTML = '';
					tarjeta1.disabled = false;
					tarjeta2.disabled = false;
					tarjetasDestapadas = 0;
					tarjeta1.style.backgroundColor = '';
					tarjeta2.style.backgroundColor = '';
				}, 700);
			}, 100);
		}
	}
}