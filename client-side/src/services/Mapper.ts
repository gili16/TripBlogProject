var Experience=["junior","not bad","pretty good","very good","an expert"];
var Companies=["alone","with friends","with coleagues","with family"];
var DayParts=["morning","evening","noon","afternoon","night"];
var Levels=["easy","medium","hard","extreme"];
var Status=["single","married","has children"];
var Views=["forest","sea","dessert","city","market"];
var Categories=["field","school","family","sail","walk","drive","food","climb","bike","nature","city"];
export function getExperienceById(id:number)
{
    switch(id)
    {
        case 1:return "junior";
        case 2:return"not bad";
        case 3:return "pretty good";
        case 4:return "very good";
        case 5: return "an expert";
        default: return "not a beginner";
    }
}
export function getExperienceByDescription(description:string)
{
    switch(description)
    {
        case "junior":return 1;
        case "not bad":return 2;
        case "pretty good":return 3;
        case "very good":return 4;
        case "an expert": return 5;
        default: return 6;
    }
}

export function getCompanyById(id:number)
{
    return Companies[id-1];
}
export function getLevelById(id:number)
{
    return Levels[id-1];
}
export function getDayPartyById(id:number)
{
    return DayParts[id-1];
}
export function getStatusById(id:number)
{
    return Status[id-1];
}
export function getViewById(id:number)
{
    return Views[id-1];
}
export function getCategoryById(id:number)
{
    return Categories[id-1];
}
export function getCompanyByDescription(description:string)
{
    switch(description)
    {
        case Companies[0]:return 1;
        case Companies[1]:return 2;
        case Companies[2]:return 3;
        case Companies[3]:return 4;
        case Categories[4]:return 5;
        case Categories[5]:return 6;
        case Categories[6]:return 7;
        case Categories[7]:return 8;
        case Categories[8]:return 9;
        case Categories[9]:return 10;
        default: return 0;
    }
}
export function getCategoryByDescription(description:string)
{
    switch(description)
    {
        case Categories[0]:return 1;
        case Categories[1]:return 2;
        case Categories[2]:return 3;
        case Categories[3]:return 4;
        
        default: return 0;
    }
}
export function getLevelByDescription(description:string)
{
    switch(description)
    {
        case Levels[0]:return 1;
        case Levels[1]:return 2;
        case Levels[2]:return 3;
        case Levels[3]:return 4;
        
        default: return 0;
    }
}
export function getStatusByDescription(description:string)
{
    switch(description)
    {
        case Status[0]:return 1;
        case Status[1]:return 2;
        case Status[2]:return 3;
        
        
        default: return 0;
    }
}
export function getDayPartByDescription(description:string)
{
    switch(description)
    {
        case DayParts[0]:return 1;
        case DayParts[1]:return 2;
        case DayParts[2]:return 3;
        case DayParts[3]:return 4;
        case DayParts[4]:return 5;
        default: return 0;
    }
}
export function getViewByDescription(description:string)
{
    switch(description)
    {
        case Views[0]:return 1;
        case Views[1]:return 2;
        case Views[2]:return 3;
        case Views[3]:return 4;
        case Views[4]:return 5;
        default: return 0;
    }
}
export {Levels,Categories,Companies,Status,Experience,Views,DayParts}