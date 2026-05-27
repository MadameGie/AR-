const startButton =
  document.querySelector('#startButton');

const landingPage =
  document.querySelector('#landing-page');

const loadingScreen =
  document.querySelector('#loading-screen');

const scanGuide =
  document.querySelector('#scan-guide');

const arScene =
  document.querySelector('#arScene');


startButton.addEventListener('click', async () => {

  try{

    // CAMERA PERMISSION
    const stream =
      await navigator.mediaDevices.getUserMedia({

        video:{
          facingMode:'environment'
        },

        audio:false

      });


    // STOP TEMP STREAM
    stream.getTracks().forEach(track => {
      track.stop();
    });


    // SHOW LOADING
    loadingScreen.style.display = 'flex';


    // SHOW AR SCENE
    arScene.style.display = 'block';


    // START MINDAR
    await arScene.systems[
      'mindar-image-system'
    ].start();


    // HIDE LANDING
    landingPage.style.display = 'none';


    // HIDE LOADING
    loadingScreen.style.display = 'none';


    // SHOW GUIDE
    scanGuide.style.display = 'flex';

  }

  catch(error){

    console.error(error);

    alert(
      'Camera gagal dibuka. Pastikan browser mengizinkan kamera dan website menggunakan HTTPS.'
    );

  }

});

const target =
  document.querySelector('[mindar-image-target]');

target.addEventListener("targetFound", () => {

  console.log("TARGET FOUND");

});

target.addEventListener("targetLost", () => {

  console.log("TARGET LOST");

});