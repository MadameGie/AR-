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

const target =
  document.querySelector('#target');


// TARGET FOUND
target.addEventListener('targetFound', () => {

  console.log('TARGET FOUND');

});


// TARGET LOST
target.addEventListener('targetLost', () => {

  console.log('TARGET LOST');

});


startButton.addEventListener('click', async () => {

  try{

    // SHOW LOADING
    loadingScreen.style.display = 'flex';


    // REQUEST CAMERA FIRST
    const stream =
      await navigator.mediaDevices.getUserMedia({

        video:{

          facingMode:{
            exact:'environment'
          }

        },

        audio:false

      });


    // CLOSE TEMP STREAM
    stream.getTracks().forEach(track => {
      track.stop();
    });


    // SHOW AR
    arScene.style.display = 'block';


    // WAIT SCENE READY
    await new Promise(resolve => {

      if(arScene.hasLoaded){

        resolve();

      }

      else{

        arScene.addEventListener(
          'loaded',
          resolve
        );

      }

    });


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
      'Camera gagal dibuka. Pastikan HTTPS aktif dan browser mengizinkan kamera.'
    );

  }

});
