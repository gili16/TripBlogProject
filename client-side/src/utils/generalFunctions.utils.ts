export default function getTrackLength(length:number){
    let newLength="";
    if(length>=48){
        newLength+=Math.floor(length/24)+" days";
    }else{
        if(length>=24){
            newLength+="1 day";
        }
    }
    if(length%24>0){
        newLength+=" and "+length%24+" hours";
    }
    return newLength;
}