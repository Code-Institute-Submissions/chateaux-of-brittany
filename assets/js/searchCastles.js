function searchCastles() {
    castleName = $("#chateau-search-name").val();
    castleLength = castleName.length

    if (castleLength == 0) {
        emptyData()
    } else if ((castleLength < 3) && castleLength > 0) {
        emptyData()
        $("#loading-data").html(`<div id="loader"><i class="fa fa-map-marker"></i> . . .  Loading castle data . . . <i class="fa fa-globe fa-spin"></i> </div>`);
    } else {
        // search for anything typed into the search box accompagnied with "chateau" to force the results
        var request = {
            location: { lat: 48.000, lng: -3.000 },
            radius: 20000,
            query: ['chateau', castleName],
            fields: ['name', 'geometry', 'photos', 'rating']
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) { // refresh map to remove old markers
                map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 48.000, lng: -3.000 },
                    zoom: 7.5
                });
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    createMarker(results[i]);
                }
                if (results.length == 0) {
                    emptyData()
                    $("#castle-data-name").html(`<h4>No Results Found.</h4>`); // display no results found
                    $("#castle-data").html(`<p>Please enter another name and try again!</p>`);
                }
            } else { // no results are found
                emptyData()
            }
        }
    }
}

function emptyData() {
    $("#castle-data-name").html(``); // empty the data that might already be there from clicking on the map
    $("#castle-data").html(``);
    $('#castle-photos').html(``);
    $('#loading-data').html(``);
}
