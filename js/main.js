// LISTENERS
$('#fretboard').click(function(e){
	var horizontalPerc = (e.offsetX / $(this).width() * 100).toFixed(2);
	var verticalPerc = (e.offsetY / $(this).height() * 100).toFixed(2);

    var markerObject = checkString(verticalPerc);
    var marker;
    if (markerObject.string === "lowE") {
    	marker = $('#lowE');
    } else if (markerObject.string === "A") {
    	marker = $('#A');
    } else if (markerObject.string === "D") {
    	marker = $('#D');
    } else if (markerObject.string === "G") {
    	marker = $('#G');
    } else if (markerObject.string === "B") {
    	marker = $('#B');
    } else if (markerObject.string === "highE") {
    	marker = $('#highE');
    }


	$(marker).css({
    	left: checkFret(horizontalPerc), 
    	top: markerObject.location,
    	visibility: 'visible'
    });

});

$('.marker').click(function() {
	if ($(this).css('visibility') == 'visible') {
		$(this).css('visibility', 'hidden');
	}
});

$('#findChord').click(function() {
	var notesList = [];
	var scale;

	$('.marker').each(function(index) {
		if ($(this).css('visibility') == 'visible') {
			var stringPerc = $(this)[0].style.top;
			var fretPerc = $(this)[0].style.left
			notesList.push(getNote(getFretFromPerc(fretPerc)+getStringFromPerc(stringPerc)));
		}
	});

	if (notesList.length === 0) {
		$('#warning').text('Please select frets to identify a chord.');
	} else {
		$('#warning').text('');
		scale = getScale(notesList[0]);
		$('#chordName').text(notesList[0]+' '+identifyChord(getInterval(notesList, scale)));
		$('#modal').modal('show');
	}
});

$('#clearAll').click(function() {
	$('.marker').each(function(index) {
		$(this).css('visibility', 'hidden');
	});
});

// FUNCTIONS

function checkFret(perc) {
	if (perc >= 0.00 && perc <= 0.58) {
    	return "0";
    } else if (perc >= 0.59 && perc <= 7.40) {
    	return "3.5%";
    } else if (perc >= 7.41 && perc <= 14.35) {
    	return "10.65%";
    } else if (perc >= 14.36 && perc <= 20.90) {
    	return "17.4%";
    } else if (perc >= 20.91 && perc <= 27.10) {
    	return "23.9%";
    } else if (perc >= 27.11 && perc <= 33.00) {
    	return "29.85%";
    } else if (perc >= 33.01 && perc <= 38.50) {
    	return "35.55%";
    } else if (perc >= 38.51 && perc <= 43.75) {
    	return "40.9%";
    } else if (perc >= 43.76 && perc <= 48.70) {
    	return "46.0%";
    } else if (perc >= 48.71 && perc <= 53.30) {
    	return "50.8%";
    } else if (perc >= 53.31 && perc <= 57.70) {
    	return "55.2%";
    } else if (perc >= 57.72 && perc <= 61.80) {
    	return "59.45%";
    } else if (perc >= 61.81 && perc <= 65.70) {
    	return "63.55%";
    } else if (perc >= 65.71 && perc <= 69.40) {
    	return "67.4%";
    }
}

function getFretFromPerc(perc) {
	if (perc == '0px') {
    	return 0;
    } else if (perc == '3.5%') {
    	return 1;
    } else if (perc == '10.65%') {
    	return 2;
    } else if (perc == '17.4%') {
    	return 3;
    } else if (perc == '23.9%') {
    	return 4;
    } else if (perc == '29.85%') {
    	return 5;
    } else if (perc == '35.55%') {
    	return 6;
    } else if (perc == '40.9%') {
    	return 7;
    } else if (perc == '46%') {
    	return 8;
    } else if (perc == '50.8%') {
    	return 9;
    } else if (perc == '55.2%') {
    	return 10;
    } else if (perc == '59.45%') {
    	return 11;
    } else if (perc == '63.55%') {
    	return 12;
    } else if (perc == '67.4%') {
    	return 13;
    }
}

function checkString(perc) {
	var marker = {};
	if (perc >= 85.00 && perc <= 100.00) {
    	marker.string = "lowE";
    	marker.location = "85%";
    } else if (perc >= 67.00 && perc <= 84.99) {
    	marker.string = "A";
    	marker.location = "69%";
    } else if (perc >= 51.50 && perc <= 66.99) {
    	marker.string = "D";
    	marker.location = "52%";
    } else if (perc >= 35.00 && perc <= 51.49) {
    	marker.string = "G";
    	marker.location = "35%";
    } else if (perc >= 16.51 && perc <= 34.99) {
    	marker.string = "B";
    	marker.location = "19%";
    } else if (perc >= 0.00 && perc <= 16.50) {
    	marker.string = "highE";
    	marker.location = "2%";
    }
    return marker;
}

function getStringFromPerc(perc) {
	if (perc == '85%') {
    	return 'lowE';
    } else if (perc == '69%') {
    	return 'A';
    } else if (perc == '52%') {
    	return 'D';
    } else if (perc == '35%') {
    	return 'G';
    } else if (perc == '19%') {
    	return 'B';
    } else if (perc == '2%') {
    	return 'highE';
    }
}

function getNote(param) {
	if (param == '0lowE' || param == '7A' || param == '2D' || param == '9G' || param == '5B' || param == '0highE' || param == '12lowE' || param == '12highE') {
		return 'E';
	} else if (param == '1lowE' || param == '13lowE' || param == '8A' || param == '3D' || param == '10G' || param == '6B' || param == '1highE' || param == '13highE') {
		return 'F';
	} else if (param == '2lowE' || param == '9A' || param == '4D' || param == '11G' || param == '7B' || param == '2highE') {
		return 'F#';
	} else if (param == '3lowE' || param == '10A' || param == '5D' || param == '0G' || param == '8B' || param == '3highE' || param == '12G') {
		return 'G';
	} else if (param == '4lowE' || param == '11A' || param == '6D' || param == '1G' || param == '13G' || param == '9B' || param == '4highE') {
		return 'G#';
	} else if (param == '5lowE' || param == '0A' || param == '7D' || param == '2G' || param == '10B' || param == '5highE' || param == '12A') {
		return 'A';
	} else if (param == '6lowE' || param == '1A' || param == '13A' || param == '8D' || param == '3G' || param == '11B' || param == '6highE') {
		return 'A#';
	} else if (param == '7lowE' || param == '2A' || param == '9D' || param == '4G' || param == '0B' || param == '7highE' || param == '12B') {
		return 'B';
	} else if (param == '8lowE' || param == '3A' || param == '10D' || param == '5G' || param == '1B' || param == '13B' || param == '8highE') {
		return 'C';
	} else if (param == '9lowE' || param == '4A' || param == '11D' || param == '6G' || param == '2B' || param == '9highE') {
		return 'C#';
	} else if (param == '10lowE' || param == '5A' || param == '0D' || param == '7G' || param == '3B' || param == '10highE' || param == '12D') {
		return 'D';
	} else if (param == '11lowE' || param == '6A' || param == '1D' || param == '13D' || param == '8G' || param == '4B' || param == '11highE') {
		return 'D#';
	}
}

function getScale(note) {
	if (note == 'E') {
		return ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];
	} else if (note == 'F') {
		return ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'];
	} else if (note == 'F#') {
		return ['F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'];
	} else if (note == 'G') {
		return ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'];
	} else if (note == 'G#') {
		return ['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'];
	} else if (note == 'A') {
		return ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
	} else if (note == 'A#') {
		return ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'];
	} else if (note == 'B') {
		return ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'];
	} else if (note == 'C') {
		return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	} else if (note == 'C#') {
		return ['C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'];
	} else if (note == 'D') {
		return ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'];
	} else if (note == 'D#') {
		return ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'];
	}
}

function getInterval(notes, scale) {
	var interval = new Array();
	for (var i=0; i<notes.length; i++) {
		for (var j=0; j<scale.length; j++) {
			if (notes[i] === scale[j]) {
				var index;
				switch (j) {
					case 0: index = '1'; break; 
					case 1: index = 'b2'; break;
					case 2: index = '2'; break;
					case 3: index = 'b3'; break;
					case 4: index = '3'; break;
					case 5: index = '4'; break;
					case 6: index = 'b5'; break;
					case 7: index = '5'; break;
					case 8: index = '#5'; break;
					case 9: index = '6'; break;
					case 10: index = 'b7'; break;
					case 11: index = '7'; break;
				}
				if (interval.indexOf(index) === -1) {
					interval.push(index);
				}
			}
		}
	}
	return interval.sort();
}

function identifyChord(interval) {
	if (interval.indexOf('1') >= 0 &&  interval.indexOf('2') >= 0 && interval.indexOf('3') >= 0 && interval.indexOf('7') >= 0) {
		return 'Major 9th';
	} else if (interval.indexOf('1') >= 0 &&  interval.indexOf('2') >= 0 && interval.indexOf('b3') >= 0 && interval.indexOf('b7') >= 0) {
		return 'Minor 9th';
	} else if (interval.indexOf('1') >= 0 &&  interval.indexOf('b3') >= 0 && interval.indexOf('b5') >= 0 && interval.indexOf('b7') >= 0) {
		return 'Half Diminished';
	} else if (interval.indexOf('1') >= 0 &&  interval.indexOf('2') >= 0 && interval.indexOf('3') >= 0 && interval.indexOf('b7') >= 0) {
		return 'Dominant 9th';
	} else if (interval.indexOf('1') >= 0 &&  interval.indexOf('b3') >= 0 && interval.indexOf('b5') >= 0 && interval.indexOf('6') >= 0) {
		return 'Diminished 7th';
	} else if (interval.indexOf('1') >= 0 &&  interval.indexOf('3') >= 0 && interval.indexOf('#5') >= 0 && interval.indexOf('b7') >= 0) {
		return 'Augmented 7th';
	} else if (interval.indexOf('1') >= 0 &&  interval.indexOf('3') >= 0 && interval.indexOf('b5') >= 0 && interval.indexOf('b7') >= 0) {
		return 'Seventh Flat 5';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('3') >= 0 && interval.indexOf('7') >= 0) {
		return 'Major 7th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('b3') >= 0 && interval.indexOf('b7') >= 0) {
		return 'Minor 7th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('b3') >= 0 && interval.indexOf('7') >= 0) {
		return 'Major/Minor 7th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('3') >= 0 && interval.indexOf('6') >= 0) {
		return 'Major 6th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('b3') >= 0 && interval.indexOf('6') >= 0) {
		return 'Minor 6th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('b3') >= 0 && interval.indexOf('4') >= 0) {
		return 'Minor Add 4th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('3') >= 0 && interval.indexOf('b7') >= 0) {
		return 'Dominant 7th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('3') >= 0 && interval.indexOf('4') >= 0) {
		return 'Major Add 4th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('4') >= 0 && interval.indexOf('b7') >= 0) {
		return '7th Suspended 4th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('b3') >= 0 && interval.indexOf('b5') >= 0) {
		return 'Diminished';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('3') >= 0) {
		return 'Major';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('b3') >= 0) {
		return 'Minor';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('2') >= 0) {
		return 'Suspended 2nd';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('4') >= 0) {
		return 'Suspended 4th';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('5') >= 0) {
		return 'Fifth (Power Chord)';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('b5') >= 0) {
		return 'Flat Fifth';
	} else if (interval.indexOf('1') >= 0 && interval.indexOf('#5') >= 0) {
		return 'Augmented';
	} else if (interval.indexOf('1') >= 0) {
		return 'Octave';
	} else {
		return 'Unknown Chord';
	}
}