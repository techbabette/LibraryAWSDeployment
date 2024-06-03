function getParam(params, requestedParam){
    if(!params){
        return undefined;
    }
    let paramPairs = params.split("|");

    let requestedParamChunk = paramPairs.filter((pair) => pair.split(":")[0] === requestedParam)[0] ?? "";

    let requestedParamValue = requestedParamChunk.split(":")[1] ?? undefined;
    return requestedParamValue;
}

export default getParam;
// let stringOfParams = "target:value|method:value2|callerValue:dsadsa";
// console.log(getParam(stringOfParams, 'target'));