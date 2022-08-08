import axios from "axios";
import {storage} from "../../Firebase";
import {actionTypes} from "./types";

export const upLoadFile = (file, folder) => {
    return async dispatch => {
        if (file) {
            dispatch({
                type: actionTypes.LOADING
            });

            const uploadtask = storage.ref(`${folder}/${file.name}`).put(file);
            uploadtask.on(
                "state_changed",
                (snapshot) => {},
                (err) => {
                    console.log(err);
                    dispatch({
                        type: actionTypes.LOADING
                    });

                },
                () => {
                    storage
                        .ref("images")
                        .child(file.name)
                        .getDownloadURL()
                        .then((url) => {
                            console.log(url)
                            alert("Upload thanh cong!");
                            dispatch({
                                type: actionTypes.LOADING
                            });

                        });
                }
            );
        } else alert("VUi long chon file");
    }
}




