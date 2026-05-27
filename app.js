const start = async () => {

  const loading = document.querySelector("#loading");

  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: './target.mind',

    uiScanning: false,
    uiLoading: false,
    uiError: false,

    maxTrack: 1,

    filterMinCF: 0.0001,
    filterBeta: 0.01,

    warmupTolerance: 5,
    missTolerance: 5,
  });

  const {
    renderer,
    scene,
    camera
  } = mindarThree;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100vw';
  renderer.domElement.style.height = '100vh';
  renderer.domElement.style.objectFit = 'cover';

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  const anchor = mindarThree.addAnchor(0);

  // OBJECT TESTING DULU
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

  const material = new THREE.MeshStandardMaterial({
    color: 0x00ffcc,
    metalness: 0.3,
    roughness: 0.2,
  });

  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(0, 0, 0);

  anchor.group.add(cube);

  anchor.onTargetFound = () => {
    console.log("Kemasan Terdeteksi");
  };

  anchor.onTargetLost = () => {
    console.log("Kemasan Hilang");
  };

  await mindarThree.start();

  // FORCE FULLSCREEN MOBILE
  const enterFullscreen = async () => {
    const el = document.documentElement;

    if (el.requestFullscreen) {
      await el.requestFullscreen();
    }
  };

  document.body.addEventListener('click', enterFullscreen, {
    once: true
  });

  // RENDER LOOP
  renderer.setAnimationLoop(() => {

    cube.rotation.y += 0.02;

    renderer.render(scene, camera);
  });

  loading.style.display = 'none';
};

start();
