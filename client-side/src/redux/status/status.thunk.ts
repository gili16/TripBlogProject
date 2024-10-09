import { getStatuses } from "../../services/options";
import { OptionType } from "../../types/optionType.types";
import { AppThunk } from "../store";
import { init } from "./status.slice";

export const initStatus = (): AppThunk<OptionType> => async (dispatch, getState) => {

    try {
        let response = await getStatuses();
        dispatch(init(response))
        return response;
    } catch (error) {

        alert("failed to add")
        return null;
    }
}