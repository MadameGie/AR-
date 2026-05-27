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


target.addEventListener('targetFound', () => {

  console.log('TARGET FOUND');

});


target.addEventListener('targetLost', () => {

  console.log('TARGET LOST');

});


startButton.addEventListener('click', async () => {

  try{

    // REQUEST CAMERA
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


    // START AR
    await arScene.systems[
      'mindar-image-system'
    ].start();


    // HIDE LANDING
    landingPage.style.display = 'none';


    // SHOW SCENE
    arScene.style.display = 'block';


    // HIDE LOADING
    loadingScreen.style.display = 'none';


    // SHOW GUIDE
    scanGuide.style.display = 'flex';

  }

  catch(error){

    console.error(error);

    alert(
      'Camera gagal dibuka atau browser tidak support.'
    );

  }

});
