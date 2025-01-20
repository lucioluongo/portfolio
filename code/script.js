
/*video works*/
document.addEventListener('DOMContentLoaded', () => {
    const videoCards = document.querySelectorAll('.video-card video');
    const body = document.body;

    videoCards.forEach(video => {
        video.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.classList.add('lightbox');
            
            const clonedVideo = video.cloneNode(true);
            clonedVideo.controls = true;
            clonedVideo.autoplay = true;

            overlay.appendChild(clonedVideo);
            body.appendChild(overlay);

            overlay.addEventListener('click', () => {
                body.removeChild(overlay);
                

                });
              });
            });
        });
    
function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
