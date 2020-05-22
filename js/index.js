"use strict"
$(document).ready(function () {
    console.log("ready!");
    // Define our genres to use it to handle filters
    let genres = [];

    // If page over clicked hide this items
    $("#over").hide();
    $("#klikOver").click(function () {
        $("#voorstellingen").hide();
        $("#form").hide();
        $("#imgheader").hide();
        $("#over").show();
    });

    // Start Show Data from Json file
    fetch("./json/entries.json").then(function (response) {
        return response.json();
    })
        .then(function (data) {
            showVoorstellingen(data.items);
            // console.log('data:', data.items);

            // add the genre to genres list
            data.items.forEach(item => {
                genres.push(item["genre-v2"])
            })

            // a shortcut to remove dublicates values from the array
            genres = [...new Set(genres)]

            // handle buttons click for genres filters
            genres.forEach(function (genre) {
                $(`#${genre.toLowerCase()}`).on('click', function (e) {
                    filterItem(genre.toLowerCase())
                })
            })
        });
    // End Show Data from Json file
    // Start ShowVoorstellingen
    function showVoorstellingen(items) {
        for (let voorstelling of items) {
            let category = voorstelling.category;
            let genre = voorstelling["genre-v2"];
            let image = voorstelling.thumbnail.url;
            let name = voorstelling.name;
            let excerpt = voorstelling.excerpt;
            let recorded = voorstelling["recorded-at"];
            let videolength = voorstelling["video-length"];
            let age = voorstelling.age;

            // Add genre to our genres list
            genres.push(genre)

            // HTML DataStructuur
            $("#voorstellingen").append(`
            <div class="col-lg-4 itemsView" data-category="${category}" data-genre="${genre}">
            <div class="card card-deck" style="width: 18rem;">
            <div>
            <h1 class="text" class="sticky-top col-lg-12 ">${category}</h1>
            <img class="card-img-top " src="${image}">
            </div>
            <div class="card-body">
            <h4 class="card-text bold">${name}</h4>
            <p class="card-text bold">${genre}</p>
            <p class="card-text">${excerpt}</p>
            <p class="card-text">videolength: ${videolength}</p>
            <p class="card-text">recorded at: ${recorded}</p>
            <p class="card-text">age :${age}</p>
            </div>
            </div>
            `)
        }
    }
    // End ShowVoorstellingen

    // start Jquery filtering 
    let doelgroep = "";
    let selectedDoelgroep = []

    function doelGroepen(id) {
        doelgroep = id;

        // Check if doelgroep exist when click to remove it
        // or add it if it's not exist
        if (selectedDoelgroep.indexOf(id) > -1) {
            selectedDoelgroep = selectedDoelgroep.filter(g => g !== id);
        } else {
            selectedDoelgroep.push(id);
        }

        // now checking and showing the category
        filterCategory(doelgroep);

        // if item is selceted apply selected style 
        if (selectedDoelgroep.indexOf(id) > -1) {
            change_button_color(id, "#BF5330", "white")
        } else {
            change_button_color(id, "white", "black")
        }
    }
    // This aarray will store the ids of clicked elements
    let itemsArray = Array();

    function filterItem(genre) {
        // if item is not present in the array then it means it has been clicked first time
        if (include(itemsArray, genre) == false) {
            //pusing id into array 
            itemsArray.push(genre);
            //changing the color of button
            change_button_color(genre, "#BF5330", "white");
            // fitering cards
            genres_filter(genre);
        } else {
            //this means that element has been reclicked so it's filter should be removed
            // removing element's id from array
            remove_from_array(genre);
            // changing the colors of button to default 
            change_button_color(genre, "#5a9c77", "white");
            // now this id has been removed so cards will be filtered for the remaining ids in array
            genres_filter(genre);
        }
    }
    // this function removes the given element from array
    function remove_from_array(className) {
        // getting index of element in array
        const index = itemsArray.indexOf(className);
        // this means element is present in the array
        if (index > -1) {
            itemsArray.splice(index, 1);
        }
    }

    function filterItemsView() {
        //first hiding all the cards 
        $(".itemsView").css({
            "display": "none"
        });
        let arrLength = itemsArray.length;
        // if no element is in array then it means user has un clicked all buttons so show everything
        if (arrLength == 0) {
            $(".itemsView").show();
        } else {
            // Now showing all those cards present in the array as those are the cards which user has clicked
            for (let i = 0; i < arrLength; i++) {
                $("." + itemsArray[i]).show();
            }
        }
        filterCategory();
    }

    // Familie and volwassenen
    function filterCategory() {
        if (doelgroep != "") {
            $('.itemsView').each(function (i, obj) {
                if (selectedDoelgroep.indexOf(obj.dataset.category) < 0) {
                    $(this).css({
                        "display": "none"
                    });
                } else {
                    $(this).css({
                        "display": "block"
                    });
                }
            });
        }
    }
    // store selected genres to check for multiple selection
    let selectedGenres = [];

    function genres_filter(genre) {
        if (doelgroep !== '') {
            // Check if genre exist when click to remove it
            // or add it if it's not exist
            if (selectedGenres.indexOf(genre) > -1) {
                selectedGenres = selectedGenres.filter(g => g !== genre);
            } else {
                selectedGenres.push(genre);
            }
            $('.itemsView').each(function (i, obj) {
                if (selectedGenres.indexOf(obj.dataset.genre) < 0 && obj.dataset.category === doelgroep) {
                    $(this).css({
                        "display": "none"
                    });
                } else {
                    $(this).css({
                        "display": "block"
                    });
                }
            });
        } else if (genre != "") {
            // Check if genre exist when click to remove it
            // or add it if it's not exist
            if (selectedGenres.indexOf(genre) > -1) {
                selectedGenres = selectedGenres.filter(g => g !== genre);
            } else {
                selectedGenres.push(genre);
            }
            $('.itemsView').each(function (i, obj) {
                if (selectedGenres.indexOf(obj.dataset.genre) < 0) {
                    $(this).css({
                        "display": "none"
                    });
                } else {
                    $(this).css({
                        "display": "block"
                    });
                }
            });
        }
    }

    //changes button color upon clicking
    function change_button_color(className, bg_color, text_color) {
        $("#" + className).css({
            "background-color": bg_color,
            "color": text_color,
        });
    }
    // checks whether an element is present in the array or not
    function include(arr, obj) {
        return (arr.indexOf(obj) != -1);
    }
    // show all cards
    function show_all() {
        //removing button colors of doelgroep categories button
        change_button_color("volwassenen", "white", "black");
        change_button_color("familie", "white", "black");
        doelgroep = "";
        //removing button colors of other buttons
        let arrLength = itemsArray.length;
        for (let i = 0; i < arrLength; i++) {
            change_button_color(itemsArray[i], "white", "black");
        }
        itemsArray = Array();
        $(".itemsView").show();
    }

    // handle buttons click for Doelgroep filters 
    $("#volwassenen").on('click', function (e) {
        doelGroepen('volwassenen')
    })

    $("#familie").on('click', function (e) {
        doelGroepen('familie')
    })

    // clear filters
    $("#show_all").on('click', function (e) {
        show_all();
    })

    // Search item 
    $('#search').on('keyup', function (e) {
        e.preventDefault();
        let value = $(this).val();
        console.log('Value = ', value);
        let data = searchData(value, itemsArray);
    });

    function searchData(vaule, data) {
        let filteredData = []
        for (let i = 0; i < data.length; i++) {
            vaule = vaule.toLowerCase();
            let name = data[i].name.toLowerCase();
            if (name.include(vaule)) {
                filteredData.push(data[i]);
            }
        }
        return filteredData;
    }

});
