
export function createRecorder(stream) {
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  mediaRecorder.onstart = () => {
    console.log("start", mediaRecorder.state);
  };
  mediaRecorder.onstop = () => {
    console.log("stop", mediaRecorder.state);
    // 数据块合成blob对象
    var blob = new Blob(chunks, { type: "audio/webm;codecs=opus" });
    console.log(blob);

    var audio = document.createElement("audio");
    var url = (window.URL || webkitURL).createObjectURL(blob);
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    console.log(audio, url);
  };
  mediaRecorder.ondataavailable = (e) => {
    console.log("data");
    console.log(e);
    chunks.push(e.data);
  };
  return mediaRecorder
}