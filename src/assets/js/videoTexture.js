
const THREE = window.MINDAR.IMAGE.THREE;


const loadVideo = (path) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.addEventListener('loadeddata', () => {
        video.setAttribute('playsinline', '');
        resolve(video);
      });
      video.src = path;
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: 'assets/TargetMind/Nissan.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    for(var i=0;i<5;i++)
    {
    const video = await loadVideo("assets/CarVideo/Demo"+i+".mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 320/480);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(i);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
    });
}

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
