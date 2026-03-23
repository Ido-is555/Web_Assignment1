// --- reading the id from URL params ---
function getDogIDFromURL(){
    var params = new URLSearchParams(window.location.search); 
    var id = params.get("id");
    return id;
}

// --- converts from boolean to english ---
function formatBoolean(value){
    if (value == true)
        return "Yes";
    if (value == false)
        return "No";
    else
        return "Unknown";
}