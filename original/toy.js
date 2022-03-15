var pressing = {};
var audioCtx;
var sheet = [];
const LENGTH = 16;
const ON = 1;
const OFF = 0;
var recording_row = [];
var recording = false;
var playing = false;
var current_column = 0;
var sound_list = [];

window.onload = function (){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var gainNode = audioCtx.createGain();

    gainNode.gain.value = 0.8;

    var source = audioCtx.createBufferSource();

    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    audioLoad( audioCtx, 0, './sound/kit/kick.wav');
    audioLoad( audioCtx, 1, './sound/kit/tom1.wav');
    audioLoad( audioCtx, 2, './sound/kit/tom2.wav');
    audioLoad( audioCtx, 3, './sound/kit/tom3.wav');
    audioLoad( audioCtx, 4, './sound/kit/snare.wav');
    audioLoad( audioCtx, 5, './sound/kit/hihat.wav');
    audioLoad( audioCtx, 6, './sound/1up.wav');

    sheet.push([]);
    sheet.push([]);
    sheet.push([]);
    sheet.push([]);
    sheet.push([]);
    sheet.push([]);
    sheet.push([]);
    sheet.push([]);
    sheet.push([]);
    sheet.push([]);

    var noteList = document.querySelectorAll(".note");
    for( let [index, value] of noteList.entries())
    {
        value.onclick = function(){
            
            if( value.classList.contains("pressed") === true )
            {
                value.classList.remove("pressed");
                sheet[9-parseInt(index/LENGTH)][index%LENGTH] = OFF;
            }
            else
            {
                value.classList.add("pressed");
                sheet[9-parseInt(index/LENGTH)][index%LENGTH] = ON;
            }
        }
    }

    var headList = document.querySelectorAll(".note_head");
    for( let [index, value] of headList.entries())
    {
        value.onclick = function(){
            
            if( value.classList.contains("pressed") === true )
            {
                value.classList.remove("pressed");
                recording_row[9-index] = OFF;
            }
            else
            {
                value.classList.add("pressed");
                recording_row[9-index] = ON;
            }
        }
    }

    var cellList = document.querySelectorAll(".cell");
    for( let [index, value] of cellList.entries())
    {
        switch(value.id)
        {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                value.ontouchstart = function(){
                    value.classList.add("pressed");
                    pressNum(value);
                }
                value.ontouchend = function()
                {
                    value.classList.remove("pressed");
                }
                break;
            case "+":
                value.onclick = function(){
                    pressPlus(value);
                }
                // value.ontouchend = function()
                // {
                //     value.classList.remove("pressed");
                // }
                break;
            case "Enter":
                value.onclick = function(){
                    pressEnter(value);
                }
                // value.ontouchend = function()
                // {
                //     value.classList.remove("pressed");
                // }
                break;
        }
    }
}

function pressNum( element )
{
    let index = parseInt(element.id);

    if( index >= 0 && index <= 9 )
    {
        if( recording && (recording_row[index] === ON || recording_row.findIndex(e=>e===ON) === -1 ))
        {
            sheet[index][current_column] = ON;
            let e = document.getElementsByClassName("note");
            e[(9-index)*LENGTH+current_column].classList.add("pressed");
        }

        audioPlay( audioCtx, sound_list[index]);
    }
}


function pressPlus( element )
{
    if( pressing[element.id] )
    {
        element.classList.remove("pressed");
        pressing[element.id] = false;
        recording = false;
        playing = false;
        return;
    }
    else
    {
        element.classList.add("pressed");
        pressing[element.id] = true;
        recording = true;
        playing = true;
        setTimeout(sheetRecord, 0, document.getElementById("bpm").value, LENGTH);
    }
}

function pressEnter( element )
{
    if( pressing[element.id] )
    {
        element.classList.remove("pressed");
        pressing[element.id] = false;
        playing = false;
        return;
    }
    else
    {
        element.classList.add("pressed");
        pressing[element.id] = true;
        playing = true;
        setTimeout(sheetPlay, 0, document.getElementById("bpm").value, LENGTH);
    }
}

window.onkeydown = function(event)
{
    var pressed = document.getElementById(event.key);

    if( pressed == null )
    {
        return;
    }

    if( event.key === "Enter" && pressing[event.key] )
    {
        pressed.classList.remove("pressed");
        pressing[event.key] = false;
        playing = false;
        return;
    }
    else if( event.key === "+" && pressing[event.key] )
    {
        pressed.classList.remove("pressed");
        pressing[event.key] = false;
        recording = false;
        playing = false;
        return;
    }
    else if( pressing[event.key] )
    {
        return;
    }

    if( event.key === "Enter" )
    {
        playing = true;
        setTimeout(sheetPlay, 0, document.getElementById("bpm").value, LENGTH);
    }
    else if( event.key === "+" )
    {
        recording = true;
        playing = true;
        setTimeout(sheetRecord, 0, document.getElementById("bpm").value, LENGTH);
    }
    else if( event.keyCode >= 96 && event.keyCode <= 106 )
    {
        let row = event.keyCode - 96;

        if( recording && (recording_row[row] === ON || recording_row.findIndex(e=>e===ON) === -1 ))
        {
            sheet[row][current_column] = ON;
            let e = document.getElementsByClassName("note");
            e[(9-row)*LENGTH+current_column].classList.add("pressed");
        }

        audioPlay( audioCtx, sound_list[row]);
    }

    pressed.classList.add("pressed");
    pressing[event.key] = true;
}

window.onkeyup = function(event)
{
    console.log(event.key);
    var pressed = document.getElementById(event.key);

    if( pressed == null || event.key === "Enter" || event.key === "+" )
    {
        return;
    }

    pressed.classList.remove("pressed");
    pressing[event.key] = false;
}

/*const audioPlay = async url => {
    const context = new AudioContext();
    const source = context.createBufferSource();
    const audioBuffer = await fetch(url)
      .then(res => res.arrayBuffer())
      .then(ArrayBuffer => context.decodeAudioData(ArrayBuffer));
  
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
  };*/

function audioLoad( context, index, url )
{
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
        context.decodeAudioData(request.response,function(buffer){sound_list[index]=buffer;});
    }

    request.send();
}

function audioPlay( context, buffer )
{
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
}

function sheetLoad()
{
    let noteList = document.getElementsByClassName("note");

    let i = 0;
    for( let e of noteList )
    {
        if( e.classList.contains("pressed") === true )
            sheet[parseInt(i/LENGTH)][i%LENGTH]  = ON;
        else
            sheet[parseInt(i/LENGTH)][i%LENGTH]  = OFF;

        i++;
    }
}

function sheetPlay(bpm, remain)
{
    console.log("진입");
    
    if( remain > 0 && playing === true )
    {
        let millisecond = 1000 * (60 / bpm);
        setTimeout(sheetPlay, millisecond, bpm, remain-1);
    }
    else{
        sheetTurnOff(LENGTH - remain - 1);
        document.getElementById("Enter").classList.remove("pressed");
        pressing["Enter"] = false;
        playing = false;
        return;
    }

    let index = LENGTH - remain;

    sheetTurnOn(index);
    sheetPlayByColumn(index);
    if( index > 0 )
        sheetTurnOff(index-1);
}

function sheetPlayByColumn( index )
{
    for( let i=0; i<=9; i++)
    {
        if( sheet[i][index] === ON )
        {
            audioPlay( audioCtx, sound_list[i]);
        }
    }
}

function sheetRecord(bpm, remain)
{
    current_column = LENGTH - remain;
    
    if( remain > 0 && recording === true )
    {
        let millisecond = 1000 * (60 / bpm);
        setTimeout(sheetRecord, millisecond, bpm, remain-1);
    }
    else{
        sheetTurnOff(LENGTH - remain - 1);
        document.getElementById("+").classList.remove("pressed");
        playing = false;
        pressing["+"] = false;
        recording = false;
        return;
    }

    let index = LENGTH - remain;

    sheetTurnOn(index);
    sheetPlayByColumn(index);
    if( index > 0 )
        sheetTurnOff(index-1);
}

function sheetTurnOn( column )
{
    let noteList = document.getElementsByClassName("note");

    for( let i = column; i < noteList.length; i +=LENGTH )
    {
        noteList[i].classList.add("playing");
    }
}

function sheetTurnOff( column )
{
    let noteList = document.getElementsByClassName("note");

    for( let i = column; i < noteList.length; i +=LENGTH )
    {
        noteList[i].classList.remove("playing");
    }
}

function B2M( bpm )
{
    return 1000 * (60 / bpm);
}