jQuery(document).ready(function() {
    
    // console.log( $('input[name=radio]:checked').val());
    var selected_label = $('input[name=radio]:checked').val();
    // var k_value = $('k_value').val();
    if (selected_label == "Actor") {
        processMetapath();
    }
    
    $('input[type=radio][name=radio]').change(function() {
        if (this.value == 'Actor') {
            $('#metapaths').html('<li class="mdl-menu__item">AMA</li><li class="mdl-menu__item">AMAMA</li> \
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
            $('#metapaths').html('<li class="mdl-menu__item">MGM</li><li class="mdl-menu__item">MAM</li><li class="mdl-menu__item">AxMAxMAx</li> \
	            	<li class="mdl-menu__item">AxMDMAx</li><li class="mdl-menu__item">AxMGMAx</li>');
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
 
	// var dialog = document.querySelector('dialog');
	var dialog = $("dialog")[0];

    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    $("#display_results").on('click', function(e) {
        var k_value = $('#k_value').val();
        var search_item = $('#search').val();
        var metapath = $('#select_metapath').text();
        if (k_value.length <= 0 || search_item.length <= 0 || metapath == "Select Metapath") {
            // alert("Please fill out the fields");
            dialog.showModal();
            dialog.querySelector('.close').addEventListener('click', function() {
              dialog.close();
            });
        }
         else {
            console.log("label:" + $('input[name=radio]:checked').val() + " k:" + k_value + " query:" + search_item + " metapath:" + metapath);
            $.ajax({
                type: "POST",
                url: "test.php",
                data: 'json',
                // beforeSend: function() {
                //     $("#search-box").css("background", "#FFF url(LoaderIcon.gif) no-repeat 165px");
                // },
                success: function(data) {
                    console.log("data: " + data);
                },
                error: function( jqxhr, textStatus, error ) {
                    var err = textStatus + ", " + error;
                    console.log( "Request Failed: " + err );
                    // console.log(jqxhr);
                }
            });
        }
    });

    function processMetapath() {
        $('#metapaths').html('<li class="mdl-menu__item">AMA</li><li class="mdl-menu__item">AMAMA</li><li class="mdl-menu__item">AMAxMA</li> \
	            	<li class="mdl-menu__item">AMDMA</li><li class="mdl-menu__item">AMGMA</li>');
        $('#select_metapath').text('Select Metapath');
    }
});