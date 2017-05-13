$(document).ready(function(){
	$.getJSON('http://www.transltr.org/api/getlanguagesfortranslate', function(data) {
		$.each( data, function( key, val ) {
			$('#fromSelect').append('<option id="from_'+ val.languageCode +'" value="'+ val.languageCode +'">'+ val.languageName +'</option>')
			$('#toSelect').append('<option id="to_'+ val.languageCode +'" value="'+ val.languageCode +'">'+ val.languageName +'</option>')
			if(val.languageName === 'French') {
				$('#from_fr').attr('selected', 'selected')
			}
			if(val.languageName === 'English') {
				$('#to_en').attr('selected', 'selected')
			}
		});
	});

	$("#fromText").keyup(function() {
		translate();  	
	});
	$( "#fromSelect" ).change(function() {
		translate(); 
	});
	$( "#toSelect" ).change(function() {
		translate(); 
	});
	$( "#switchBtn" ).click(function() {
	 	var langFrom = $("#fromSelect option:selected").attr('value')
	 	var langTo = $("#toSelect option:selected").attr('value')
	 	$("#fromSelect option:selected").removeAttr('selected')
	 	$("#toSelect option:selected").removeAttr('selected')
	 	$('#from_'+langTo).attr('selected', 'selected')
	 	$('#to_'+langFrom).attr('selected', 'selected')
	 	translate(); 
	});
});

function translate(){
	$.getJSON('http://www.transltr.org/api/translate?text='+ $('#fromText').val() +'&to='+ $("#toSelect option:selected").attr('value')+'&from='+$("#fromSelect option:selected").attr('value'), function(data){
		$('#toText').val(data.translationText)
	});
}