import { OptionType } from "../types/optionType.types";
type Prop={
    label:string
}
export function getOptionById(options:OptionType[],id:number){
    let answer=""
    options.forEach(value=>{
        if(value.id===id){
            answer= value.description
        }
    });
    return answer;
}

export function getOptionByDescription(options:OptionType[], description: string){
    let answer=-1
    options.forEach(value=>{
        if(value.description===description){
            answer= value.id
        }
    });
    return answer;
}

export function getDescriptionArray(options:OptionType[]){
    let newOptions=[] as string[]
    options.forEach(value=>{
        newOptions.push(value.description)
    });
    return [...newOptions];
}


