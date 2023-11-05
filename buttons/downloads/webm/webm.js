async function record() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
    })

    //нужно для лучшей поддержки браузера
    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
        ? "video/webm; codecs=vp9"
        : "video/webm"
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime
    })


    let chunks = []
    mediaRecorder.addEventListener('dataavailable', function (e) {
        chunks.push(e.data)
    })

    mediaRecorder.addEventListener('stop', function () {
        let blob = new Blob(chunks, {
            type: chunks[0].type
        })
        let url = URL.createObjectURL(blob)


        //Create window with video
        // let video = document.createElement("video");
        // video.width = 600;
        // video.controls = true;
        // let video = document.querySelector("video")
        // video.src = url

        let a = document.createElement('a')
        a.href = url
        a.download = 'video.webm'
        a.click()
    })

    //начинать запись нужно вручную
    mediaRecorder.start();
}

record();