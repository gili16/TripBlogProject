import { getExperiences } from "../../services/options";
import { OptionType } from "../../types/optionType.types";
import { AppThunk } from "../store";
import { init } from "./experience.slice";

export const initExperience = (): AppThunk<OptionType> => async (dispatch, getState) => {

    try {
        let response = await getExperiences();
        dispatch(init(response))
        return response;
    } catch (error) {

        alert("failed to add")
        return null;
    }
}