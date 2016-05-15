jQuery(document).ready(function() {
    
    // console.log( $('input[name=radio]:checked').val());
    var selected_label = $('input[name=radio]:checked').val();
    // var k_value = $('k_value').val();
    if (selected_label == "Actor") {
        processMetapath();
    }
    
    $('input[type=radio][name=radio]').change(function() {
        if (this.value == 'Actor') {
            $('#metapaths').html('<li class="mdl-menu__item">AMA</li><li class="mdl-menu__item">AMA_Jaccard</li><li class="mdl-menu__item">AMAMA</li> \
	            	<li class="mdl-menu__item">AMAxMA</li><li class="mdl-menu__item">AMDMA</li> \
	            	<li class="mdl-menu__item">AMGMA</li>');
            $('#select_metapath').text('Select Metapath');
        } else if (this.value == 'Actress') {
            $('#metapaths').html('<li class="mdl-menu__item">AxMAx</li><li class="mdl-menu__item">AxMAMAx</li><li class="mdl-menu__item">AxMAxMAx</li> \
	            	<li class="mdl-menu__item">AxMDMAx</li><li class="mdl-menu__item">AxMGMAx</li>');
            $('#select_metapath').text('Select Metapath');
        } else if (this.value == 'Director') {
            $('#metapaths').html('<li class="mdl-menu__item">DMD</li><li class="mdl-menu__item">DMAMD</li><li class="mdl-menu__item">DMAxMD</li> \
	            	<li class="mdl-menu__item">DMDMD</li><li class="mdl-menu__item">DMGMD</li>');
            $('#select_metapath').text('Select Metapath');
        } else if (this.value == 'Movie') {
            $('#metapaths').html('<li class="mdl-menu__item">MGM</li><li class="mdl-menu__item">M-weighted</li>');
            $('#select_metapath').text('Select Metapath');
        }
    });
    
    $("ul.mdl-menu").on("click", "li.mdl-menu__item", function() {
        $('#select_metapath').text($(this).text());
    });
    
    $("#clear").on('click', function(e) {
        processMetapath();
        $("#search").val('');
        $("#k_value").val('');
    });
 
    // var snackbarContainer = document.querySelector('#demo-toast-example');
    var snackbarContainer = $('#demo-toast-example')[0];
    var message = {
    	message: 'Please fill out all the fields',
    	timeout: 1500,
    };

    $("#display_results").on('click', function(e) {
		var label = $('input[name=radio]:checked').val();
        var k_value = $('#k_value').val();
        var query = $('#search').val();
        var meta_path = $('#select_metapath').text();
        if (k_value.length <= 0 || query.length <= 0 || meta_path == "Select Metapath") {
        	  'use strict';
        	   snackbarContainer.MaterialSnackbar.showSnackbar(message);
        }
		else {
		$.ajax({
		    type: "POST",
		    url: "http://172.16.161.60:8000/web/get-topk-results/",
		    data: { label : label, k_value : k_value, query: query, meta_path: meta_path },
		    dataType: "json",
		    beforeSend: function() {
		    	console.log("working");
		    	 // document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
        //       	this.MaterialProgress.setProgress(44);
            // });
		    },
		    success: function(data) {
				// console.log(data['data']);
				// alert(data['data']);
		        processData(data['data']);
		    },
		    error: function( jqxhr, textStatus, error ) {
		        var err = textStatus + ", " + error;
		        console.log( "Request Failed: " + err );
		        // console.log(jqxhr);
		    }
		});
        }
    });

    // AJAX call for autocomplete 
    $("#search").keyup(function() {
    	var search_query = $('#search').val();
    	console.log("val: " + search_query); 
        $.ajax({
            type: "POST",
            url: "http://172.16.161.60:8000/web/auto-complete/",
		    dataType: "json",
            data: {'query': search_query},
            beforeSend: function() {
                $("#search").css("background", "#FFF url(LoaderIcon.gif) no-repeat 165px");
            },
            success: function(data) {
                console.log("data: " + data["suggestions"]);
                var availableTags = data["suggestions"];
                $( "#search" ).autocomplete({
                  source: availableTags,
                });
                $("#search").css("background", "#FFF");

                // $("#suggesstion-box").show();
                // $("#suggesstion-box").html(data);
                // $("#search").css("background", "#FFF");
            }
        });
    });

    function processMetapath() {
        $('#metapaths').html('<li class="mdl-menu__item">AMA</li><li class="mdl-menu__item">AMA_Jaccard</li><li class="mdl-menu__item">AMAMA</li><li class="mdl-menu__item">AMAxMA</li> \
	            	<li class="mdl-menu__item">AMDMA</li><li class="mdl-menu__item">AMGMA</li>');
        $('#select_metapath').text('Select Metapath');
    }

    function processData(data) {

    	if(data.length == 0) {
    		var message = {
    			message: 'No Results',
    			timeout: 2500,
    		};
    		'use strict';
    		 snackbarContainer.MaterialSnackbar.showSnackbar(message);
    	}
    	else if(data == 'Error') {
    		var message = {
    			message: 'Server Error, Please try again later',
    			timeout: 2500,
    		};
    		'use strict';
    		 snackbarContainer.MaterialSnackbar.showSnackbar(message);
    	}
    	else {
    	$('#results').html('<thead><tr>\
	                <th class="mdl-data-table__cell--non-numeric">Label</th>\
	                <th>Score</th>\
	              </tr>\
	            </thead><tbody>');

    	for (var i = 0; i < data.length; i++) {
    		name = data[i]['name'];
    		score = data[i]['score'];
    		$('#results').append('<tr>\
                <td class="mdl-data-table__cell--non-numeric">'+name+'</td>\
                <td>'+score+'</td>\
              </tr>');
    	}
    	$('#results').append('</tbody>');
		}


    }


});