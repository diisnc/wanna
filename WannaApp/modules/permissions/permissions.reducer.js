//Reducer
let initialState = {
	hasGrantedCameraPermission: false,
    hasGrantedCameraRollPermission: false
};

export const setCameraPermission = () => {
	return {
		type: 'CAMERA_PERMISSION_TRUE',
	};
};

export const setCameraFolderPermission = () => {
	return {
		type: 'CAMERA_FOLDER_PERMISSION_TRUE',
	};
};

export default function(state = initialState, action) {
	switch (action.type) {
	case 'CAMERA_PERMISSION_TRUE':
		return {
			...state,
			hasGrantedCameraPermission: true
		};
	case 'CAMERA_FOLDER_PERMISSION_TRUE':
		return {
			...state,
			hasGrantedCameraRollPermission: true
        };
    default:
        return state;
    }
}