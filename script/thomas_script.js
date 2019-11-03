
//-- To get the DND API working
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
    }
});

//-- Calling the DND API
$.ajax({
    url: "http://dnd5eapi.co/api/monsters/150/actions",
    method: "GET"
}).then(function (response) {
    console.log(response);
});


//-- Creating the Arrays of monsters

crOne = {
    Goblin =[$.ajax({
        url: "http://dnd5eapi.co/api/monsters/150/actions",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
    ,]
}