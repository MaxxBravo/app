let $FAVS = $('#favContacts');
let $OTHERS = $('#otherContacts');

function showProfilePictures($zone, data){    
    $zone.append(data.map(contact => 
        $(`<div id="${contact.id}" class="fader"><img src="${contact.smallImageURL}" style="max-height: 100px"></div>`)
    )); 

    $('.fader', $zone).on('click', function(){
        $(this).slideUp();
    });
}


$(document).ready(() => {   
    $FAVS.css('background', 'grey');
    $OTHERS.css('background', 'blue');
    $.ajax({
        url: '/showFavorites',
        method: 'PUT',
        success: (data) => {
            showProfilePictures($FAVS, data);
        }
    })
    $.ajax({
        url: '/showNotFavorites',
        method: 'PUT',
        success: (data) => {
            showProfilePictures($OTHERS, data);
        }
    })
});