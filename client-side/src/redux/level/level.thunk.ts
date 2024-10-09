import { getLevels } from "../../services/options";
import { OptionType } from "../../types/optionType.types";
import { AppThunk } from "../store";
import { init } from "./level.slice";

export const initLevel = (): AppThunk<OptionType> => async (dispatch, getState) => {

    try {
        let response = await getLevels();
        dispatch(init(response))
        return response;
    } catch (error) {

        alert("failed to add")
        return null;
    }
}