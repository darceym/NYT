// variables: search-keyword, number to retrieve, start-Year, end-Year
// need to two buttons- search and clear
// we need click handlers
// ajax retrieval function
    // - API Key
    // - read docs to format url properly
// create elements to put new info
// look at JSON response to format info properly
// take the info needed from JSON & append to appropriate elements
// need for loop to go through the number of articles requested


function displayArticles() {

    event.preventDefault();

   // Constructing our URL to send to the API
    var searchKeyword = $('#search-input').val(),
        optionalYearStart = $('#startYear').val(),
        optionalYearEnd = $('#endYear').val();

    var queryURL;
    
    if (optionalYearStart && optionalYearEnd) {
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchKeyword + "&facet_field=pub_Year&begin_date=" + optionalYearStart + "0101&end_date=" + optionalYearEnd + '1231&facet_filter=true&fq=type_of_material:("news" "video" "article" "editorial" "front page" "interview" "obituary" "Op-Ed")&api-key=EGqdME3xK524UJG7bpvP2lG93mMYM8HT';
    } else if (optionalYearStart) {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchKeyword + "&facet_field=pub_Year&begin_date=" + optionalYearStart + '0101&facet_filter=true&fq=type_of_material:("news" "video" "article" "editorial" "front page" "interview" "obituary" "Op-Ed")&api-key=EGqdME3xK524UJG7bpvP2lG93mMYM8HT';
    } else if (optionalYearEnd) {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchKeyword + "&facet_field=pub_Year&end_date=" + optionalYearEnd + '1231&facet_filter=true&fq=type_of_material:("news" "video" "article" "editorial" "front page" "interview" "obituary" "Op-Ed")&api-key=EGqdME3xK524UJG7bpvP2lG93mMYM8HT';

    } else {
        // filtering the database for certain types of materials based on search keyword to get faster, more defined results
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchKeyword + '&fq=type_of_material:("news" "video" "article" "editorial" "front page" "interview" "obituary" "Op-Ed")&api-key=EGqdME3xK524UJG7bpvP2lG93mMYM8HT'; 
    };
    
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        $('#results-div').html(JSON.stringify(response));
    });
    
    // limit number of results by returning data based on index# ??? e.g. 1 article is index 0, 5 is index 4, 10 is automatically shown from API
    // var recordsToGet = $('#numOfRecords > option').click(function () {
    //         $(this).text()});
 }

// click handlers for search & clear results buttons
 $('#submit-search').on("click", displayArticles);
 $('#clear-results').on("click", function(){
     $('.form-fields').empty();
     $('#results-div').empty();
 });


 