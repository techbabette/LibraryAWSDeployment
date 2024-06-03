function LimitToFullWords (text, maximumCharacterLength) {
    if(!text){
        return "";
    }
    let textSplit = text.split(" ");
    let returnText = "";
    for (let word of textSplit) {
        if (word.length + returnText.length <= maximumCharacterLength)
            returnText += word + " ";
        else {
            returnText = returnText.trim() + "...";
            break;
        }
    }
    return returnText;
}

export default LimitToFullWords;