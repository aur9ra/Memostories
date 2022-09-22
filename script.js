var memo = "3141592653589793238462643383279502884197169399375105820974944592307816406286"; // What number is our memo?
var split_memo_nums = [""] // Split memo into pages.
var split_memo_unds = [""] // Underscores.
var split_memo_lens = [] // How long are all of our pages?

var current_page = 0 // What section are we on?
var page_len = 0 // How long is this page?
var pages = 0 // How many pages are in our memo?
var current_num = 0 // How many digits in total have we gone through?

var str_prev = ""; // What was our previous string before input?
var current_spaces = 0; // 
var current_length_needed = 0;

var expected_length = 0;
var running_total = 0;

function main(){
    for (let i in memo){
        i = memo[parseInt(i)];
        split_memo_nums[current_page] = String(split_memo_nums[current_page]).concat(String(i))
        split_memo_unds[current_page] = String(split_memo_unds[current_page]).concat("_".repeat(i)+" ");
        page_len ++
        current_num ++
        if (i == 0){
            current_page ++
            split_memo_nums.push("")
            split_memo_unds.push("")
            split_memo_lens.push(page_len)
            page_len = 0
            pages ++
            console.log(split_memo_lens)

        }
    }
    current_page = 0
    console.log(underscores)
    document.getElementById("underscores").innerHTML = split_memo_unds[current_page];
    document.getElementById("currentNums").innerHTML = String(split_memo_nums[current_page])
    document.getElementById("currentPage").innerHTML = String(current_page+1)
}

function nextPage(){
    if (current_page < pages){
        current_page++
        current_num += split_memo_lens[current_page]
        document.getElementById("currentPage").innerHTML = String(current_page+1)
        document.getElementById("currentNums").innerHTML = String(split_memo_nums[current_page])
        console.log(current_page)
    }   
}

function prevPage(){
    if (current_page > 0){
        current_page--
        current_num -= split_memo_lens[current_page]
        document.getElementById("currentPage").innerHTML = String(current_page+1)
        document.getElementById("currentNums").innerHTML = String(split_memo_nums[current_page])
        console.log(current_page)
    }   
}

function scrollPage(for_or_back){
    if (for_or_back == "next"){
        nextPage()
    } else if (for_or_back == "prev"){
        prevPage()
    }

}

function updateRunningTotal(){
    running_total = 0
    for (var i = 0; i < current_spaces; i++){
        running_total += parseInt(memo[i])
        
    }
    console.log(running_total)
}

function updateMain(){
    var str_curr = document.getElementById("input").value;


    // if this is true, that means that there was something erased from the input
    if ( str_curr.length < str_prev.length ){
        var erased = str_prev.charAt(str_prev.length-1)

        //if we erased a space, we want to make sure our spaces are updated
        if (erased == " "){
            current_spaces -= 1
        }
        console.log(erased)
    }

    // if this is true, that means that there was something added to the input
    else if ( str_curr.length > str_prev.length ){
        var added = str_curr.charAt(str_curr.length-1)

        //if we added a space, we want to make sure our spaces are updated
        if (added == " "){
            current_spaces ++
            updateRunningTotal()
        }

    
    }

    
    str_prev = document.getElementById("input").value;
}