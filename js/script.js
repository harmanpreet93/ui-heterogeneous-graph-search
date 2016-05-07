jQuery(document).ready(function() {

	// console.log( $('input[name=radio]:checked').val());

	var selected_label = $('input[name=radio]:checked').val();
	var k_value = $('k_value').val();

	console.log(k_value);

	// if (selected_label == "Actor") {
	// 	console.log("selected_label: " + selected_label);
	// }

	$('input[type=radio][name=radio]').change(function() {
	        if (this.value == 'Actor') {
	            // console.log($('input[name=radio]:checked').val());
	            selected_label = this.value;
	        }
	        else if (this.value == 'Actress') {
	            console.log(this.value);
	        }
	        else if (this.value == 'Director') {
	            console.log(this.value);
	        }
	        else if (this.value == 'Movie') {
	            console.log(this.value);
	        }
	    });

		

	$('ul.mdl-menu li').click(function(e) { 
		// alert($(this).text());
		var path = $(this).text();
		$('#demo-menu-lower-left').text(path);
    });

});
