/*
    Goal for Midterm:
    load page, create buttons based on audio files in database, and images load based on images in data base
*/

// audio
var $audio_element = $('<audio>', { src: '' });
$audio_element.prop('volume',0.5);
$audio_element.attr('loop','true');

function loadImages(){
}

function loadSound(link){
    $audio_element.attr('src',link);
    $audio_element.load();
	$audio_element.trigger('play');
}

function loadGreeting(user_id){
}

function loadQuote(day){
}

// runs everything
function runMainProgram(){
    // check to make sure we got it
    console.log(siteData);
    
    //create buttons with audio names
    audioFiles = siteData["data_set"][0].sound_set;
    for (var i = 0; i < audioFiles.length; i++){
        var main = $('#main');
        var audioButton = $('<button></button>');
        audioButton.attr('onClick','loadSound("'+audioFiles[i].link+'")');
        audioButton.text(audioFiles[i].name);
        main.append(audioButton);
    }
    
    // show image onto page
    imageFiles = siteData["data_set"][0].image_set;
    for (var i = 0; i < imageFiles.length; i++)
    {
        var main = $('#main');
        var image = $('<img>');
        image.attr('src',''+imageFiles[i].link+'');
        main.append(image);
    }
}

var siteData = {};
var audioFiles;
var imageFiles;

// get the data
$.ajax({
			dataType:'json',
			url:'./scripts/data.json',
			success:function(returnData, statusValue, weirdNewObject) { 
				siteData = returnData;
				console.log('got it, move along'); 
				runMainProgram();
			},
             error: function(xhr, error){
                console.debug(xhr); console.debug(error);
                },
		});