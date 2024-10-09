import { getDayPart } from "../../services/options";
import { OptionType } from "../../types/optionType.types";
import { AppThunk } from "../store";
import { init } from "./dayPart.slice";

export const initDayPart = (): AppThunk<OptionType> => async (dispatch, getState) => {

    try {
        let response = await getDayPart();
        dispatch(init(response))
        return response;
    } catch (error) {

        alert("failed to add")
        return null;
    }
}