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


// TARGET EVENTS
target.addEventListener('targetFound', () => {

  console.log('TARGET FOUND');

});

target.addEventListener('targetLost', () => {

  console.log('TARGET LOST');

});


// START BUTTON
startButton.addEventListener('click', async () => {

  try{

    // SHOW LOADING
    loadingScreen.style.display = 'flex';


    // IMPORTANT:
    // SIMPLE CAMERA REQUEST
    // DO NOT USE exact/environment

    const stream =
      await navigator.mediaDevices.getUserMedia({

        video:true,
        audio:false

      });


    // STOP TEMP STREAM
    stream.getTracks().forEach(track => {
      track.stop();
    });


    // SHOW AR
    arScene.style.display = 'block';


    // WAIT AFRAME READY
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
    const mindarSystem =
      arScene.systems['mindar-image-system'];

    await mindarSystem.start();


    // FORCE REAR CAMERA AFTER START
    const video =
      document.querySelector('video');

    if(video){

      const devices =
        await navigator.mediaDevices.enumerateDevices();

      const backCamera =
        devices.find(device => {

          return (
            device.kind === 'videoinput' &&
            device.label.toLowerCase().includes('back')
          );

        });

      if(backCamera){

        const rearStream =
          await navigator.mediaDevices.getUserMedia({

            video:{
              deviceId:{
                exact: backCamera.deviceId
              }
            },

            audio:false

          });

        video.srcObject = rearStream;

      }

    }


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
      'Camera gagal dibuka. Coba gunakan Chrome Android terbaru atau Safari iPhone.'
    );

  }

});
