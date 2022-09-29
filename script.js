var memo = "3141592653589793238462643383279502884197169399375105820974944592307816406286"; // What number is our memo?

//These variables scale by page.
var split_memo_nums = [""] // Split memo into pages.
var split_memo_unds = [""] // Underscores.
var split_memo_lens = [] // How long are all of our pages?
var split_memo_compound_lens = [0] // How big is the sum of all numbers for all pages?
var split_memo_user_input = [""] // Let's make sure we record our input... somewhere
var split_memo_user_input_len = [""] // The lengths of all inputs, per page.

var user_input_len_correct = false // If memo = "314", are our inputs of length 3, 1, 4?
var current_page = 0 // What section are we on?
var page_len = 0 // How long is this page?
var page_input_len = 0 // How many characters has the user entered on this page?
var pages = 0 // How many pages are in our memo?
var current_num = 0 // How many digits in total have we gone through?

var str_prev = ""; // What was our previous string before input?
var current_spaces = 0; // 

function saveUserInput(){
    split_memo_user_input[current_page] = document.getElementById("input").value;
}

function highlightNext(){
    saveUserInput()
    if (split_memo_user_input[current_page].length - current_spaces == split_memo_compound_lens[current_page] & current_page != pages-1){
        document.getElementById("nextPage").classList.remove("opacity-20")
    } else {
        document.getElementById("nextPage").classList.add("opacity-20")
    }
}

function highlightPrev(){
    if (current_page > 0){
        document.getElementById("prevPage").classList.remove("opacity-20")
    } else {
        document.getElementById("prevPage").classList.add("opacity-20")
    }
}

function main(){

    for (let i in memo){
        i = memo[parseInt(i)];
        split_memo_nums[current_page] = String(split_memo_nums[current_page]).concat(String(i))
        split_memo_unds[current_page] = String(split_memo_unds[current_page]).concat("_".repeat(i)+" ");
        split_memo_compound_lens[current_page] = split_memo_compound_lens[current_page] + parseInt(i)
        page_len ++
        current_num ++
        if (i == 0){
            current_page ++
            split_memo_nums.push("")
            split_memo_unds.push("")
            split_memo_lens.push(page_len)
            split_memo_compound_lens.push(0)
            split_memo_user_input.push("")
            page_len = 0
            pages ++

        }
    }
    current_page = 0
    document.getElementById("underscores").innerHTML = split_memo_unds[current_page];
    displayNum()
    document.getElementById("currentPage").innerHTML = String(current_page+1)
    document.getElementById("pagesCount").innerHTML = String(pages+1)

    highlightNext()
    highlightPrev()  
}

function nextPage(){
    if (current_page < pages){
        saveUserInput()
        current_page++
        current_num += split_memo_lens[current_page]
        document.getElementById("currentPage").innerHTML = String(current_page+1)
        document.getElementById("underscores").innerHTML = split_memo_unds[current_page];
        document.getElementById("input").value = split_memo_user_input[current_page]
        displayNum(true)
    }
    highlightNext()
    highlightPrev()
}

function prevPage(){
    if (current_page > 0){
        saveUserInput()
        current_page--
        current_num -= split_memo_lens[current_page]
        document.getElementById("currentPage").innerHTML = String(current_page+1)
        document.getElementById("underscores").innerHTML = split_memo_unds[current_page];
        document.getElementById("input").value = split_memo_user_input[current_page]
        displayNum(true)
    }
    highlightNext()
    highlightPrev()
}

function scrollPage(for_or_back){
    updateUserInput()
    if (for_or_back == "next" && split_memo_user_input[current_page].length - current_spaces == split_memo_compound_lens[current_page]){
        nextPage()
    } else if (for_or_back == "prev"){
        prevPage()
    }

}

function updateUserInput(){ // this function simply updates how many characters we've written
    current_spaces = (document.getElementById("input").value.match(/ /g) || []).length;
    split_memo_user_input[current_page] = document.getElementById("input").value;
}

function displayNum(initialize = false){
    if (initialize){
        current_spaces = (document.getElementById("input").value.match(/ /g) || []).length;
    }

    let current_num = split_memo_nums[current_page] // let's not manually grab this value anymore than we need...
    let non_span_one = current_num
    let non_span_two = ""

    let to_span = current_num.charAt(current_spaces) // this variable should be one number long, and go within our span container
    if (!(current_spaces == current_num.length-1)){
        non_span_one = current_num.substring(0,current_spaces) // this variable should be the string leading up to the span]
        non_span_two = current_num.substring(current_spaces+1,current_num.length) // this variable should be the string after the span.
    }
    // both non_span_one and non_span_two can be [0 <= n <= infinity] sized

    document.getElementById("numsPreSpan").innerHTML = non_span_one
    document.getElementById("numsSpan").innerHTML = to_span
    document.getElementById("numsPostSpan").innerHTML = non_span_two

    
}

function updateMain(){
    var str_curr = document.getElementById("input").value;

    let old_spaces = current_spaces
    //this mess of a line counts the amounts of spaces in the input.

    current_spaces = (document.getElementById("input").value.match(/ /g) || []).length;

    if (old_spaces != current_spaces){
        displayNum() // if the amount of spaces changes, display the number
    }

    split_memo_user_input_len = [0]
    let user_input_len_index = 0
    let pi_counter = 0
    for (var i = 0; i < document.getElementById("input").value.length; i++){
        pi_counter += 1
        split_memo_user_input_len[user_input_len_index] ++
        if (pi_counter != memo[user_input_len_index]){
            user_input_len_correct = false
            console.log(pi_counter)
            console.log(memo[user_input_len_index])
            console.log("----")
        }
        if (document.getElementById("input").value == " "){
            split_memo_user_input_len.push(0)
            user_input_len_index++
            pi_counter = 0
        }

        console.log(user_input_len_correct)
    }

    
    str_prev = document.getElementById("input").value;
    highlightNext()
    highlightPrev()
}