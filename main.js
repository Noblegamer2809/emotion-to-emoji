Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach( "#camera" );

function takesnapshot()
{
    Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ORdARSJCL/model.json',modelLoaded);

function modelLoaded()
{
console.log('Model Loaded!')
}


function speak()
{
    var synth =window.speechSynthesis;

    speak_data_1 = 'the first prediction is' + prediction_1;
    speak_data_2 = 'and the second prediction is' + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis); 
}

function check()
{
    img= document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults( error, results)
{
    if (error) {
        console.error(error)
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
      document.getElementById("result_emotion_name2").innerHTML=results[1].label;
      prediction_1=results[0].label;
      prediction_2=results[1].label;
      if (results[0].label == "happy")
      {
          document.getElementById("update_emoji").innerHTML="😀"
      }

      if (results[0].label == "sad")
      {
          document.getElementById("update_emoji").innerHTML="😔"
      }

      if (results[0].label == "angry")
      {
          document.getElementById("update_emoji").innerHTML="😡"
      }



      if (results[1].label == "happy")
      {
          document.getElementById("update_emoji2").innerHTML="😀"
      }

      if (results[1].label == "sad")
      {
          document.getElementById("update_emoji2").innerHTML="😔"
      }

      if (results[1].label == "angry")
      {
          document.getElementById("update_emoji2").innerHTML="😡"
      }
    }
    
    
}