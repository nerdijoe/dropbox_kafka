import * as actionType from '../actions/constants';

const initialState = {
  is_authenticated: false,
  user: {},
  list: [''], // array
  about: {
    overview: '',
    work: '',
    education: '',
    contact_info: '',
    life_events: '',
  },
  interest: {
    music: '',
    shows: '',
    sports: '',
    fav_teams: '',
  },
  files: [],
  folders: [],
  breadcrumb: [],
  shareFiles: [],
  shareFolders: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_SIGN_IN: {
      // not sure what to do here
      return {
        ...state,
        is_authenticated: true,
      };
    }
    case actionType.USER_SIGN_UP: {
      return {
        ...state,
        user: {
          firstname: action.data.firstname,
          lastname: action.data.lastname,
          email: action.data.email,
        },
      };
    }
    case actionType.USER_SIGN_OUT: {
      return {
        ...state,
        is_authenticated: false,
      };
    }
    case actionType.FETCH_LISTING: {
      console.log('*** reducer action.list', action);

      return {
        ...state,
        list: action.data,
      };
    }
    case actionType.FETCH_USER_ABOUT: {
      console.log('*** reducer FETCH_USER_ABOUT', action);
      return {
        ...state,
        about: { ...action.data },
      };
    }
    case actionType.UPDATE_USER_ABOUT: {
      console.log('*** reducer UPDATE_USER_ABOUT', action);
      return {
        ...state,
        about: { ...action.data },
      };
    }
    case actionType.FETCH_USER_INTEREST: {
      console.log('*** reducer FETCH_USER_INTEREST', action);
      return {
        ...state,
        interest: { ...action.data },
      };
    }
    case actionType.UPDATE_USER_INTEREST: {
      console.log('*** reducer UPDATE_USER_INTEREST', action);
      return {
        ...state,
        interest: { ...action.data },
      };
    }
    case actionType.FETCH_FILES: {
      console.log('*** reducer FETCH_FILES', action);
      return {
        ...state,
        files: [...action.data],
      };
    }
    case actionType.ADD_NEW_FILE: {
      console.log('*** reducer ADD_NEW_FILE');
      return {
        ...state,
        files: [...state.files, action.data],
      };
    }
    case actionType.STAR_FILE: {
      console.log('*** reducer STAR_FILE action.data', action.data);
      const updatedFiles = [...state.files];
      const pos = updatedFiles.findIndex(i => i.id === action.data.id);
      if (pos !== -1) {
        console.log(typeof updatedFiles[pos].is_starred);
        console.log(`--> updatedFiles[${pos}].is_starred=${updatedFiles[pos].is_starred}`);
        // const star_status = (updatedFiles[pos].is_starred == 'true');
        updatedFiles[pos].is_starred = !updatedFiles[pos].is_starred;
      }
      return {
        ...state,
        files: updatedFiles,
      };
    }
    case actionType.DELETE_FILE: {
      console.log('*** reducer DELETE_FILE action.data', action.data);
      const updatedFiles = [...state.files];
      const pos = updatedFiles.findIndex(i => i.id === action.data.id);
      if (pos !== -1) {
        console.log(typeof updatedFiles[pos].is_deleted);
        console.log(`--> updatedFiles[${pos}].is_deleted=${updatedFiles[pos].is_deleted}`);

        updatedFiles[pos].is_deleted = !updatedFiles[pos].is_deleted;
      }
      return {
        ...state,
        files: updatedFiles,
      };
    }
    case actionType.FETCH_FOLDERS: {
      console.log('*** reducer FETCH_FOLDERS', action);
      return {
        ...state,
        folders: [...action.data],
      };
    }
    case actionType.ADD_NEW_FOLDER: {
      console.log('*** reducer ADD_NEW_FOLDER');
      return {
        ...state,
        folders: [...state.folders, action.data],
      };
    }
    case actionType.STAR_FOLDER: {
      console.log('*** reducer STAR_FOLDER action.data', action.data);
      const updatedFolders = [...state.folders];
      const pos = updatedFolders.findIndex(i => i.id === action.data.id);
      if (pos !== -1) {
        console.log(typeof updatedFolders[pos].is_starred);
        console.log(`--> updatedFolders[${pos}].is_starred=${updatedFolders[pos].is_starred}`);
        // const star_status = (updatedFiles[pos].is_starred == 'true');
        updatedFolders[pos].is_starred = !updatedFolders[pos].is_starred;
      }
      return {
        ...state,
        folders: updatedFolders,
      };
    }
    case actionType.FETCH_CONTENTS_BY_FOLDER_ID: {
      console.log('*** reducer FETCH_CONTENTS_BY_FOLDER_ID', action);
      return {
        ...state,
        files: [...action.data.files],
        folders: [...action.data.folders],
      };
    }
    case actionType.BREADCRUMB_PUSH: {
      console.log('*** reducer BREADCRUMB_PUSH', action);

      return {
        ...state,
        breadcrumb: [...state.breadcrumb, action.data],
      };
    }
    case actionType.BREADCRUMB_POP: {
      console.log('*** reducer BREADCRUMB_POP', action);

      let updated = [...state.breadcrumb];
      const pos = updated.findIndex(i => i.id === action.data.id);
      if (pos !== -1) {
        console.log('updated[pos]=', updated[pos]);
        updated.splice(pos + 1);
      }

      return {
        ...state,
        breadcrumb: updated,
      };
    }
    case actionType.BREADCRUMB_CLEAR: {
      console.log('*** reducer BREADCRUMB_CLEAR', action);

      return {
        ...state,
        breadcrumb: [],
      };
    }
    case actionType.FILE_SHARING_ADD: {
      console.log('*** reducer FILE_SHARING_ADD', action);

      const updatedFiles = [...state.files];
      const pos = updatedFiles.findIndex(i => i.id === action.data[0].id);
      if (pos !== -1) {
        // console.log(typeof updatedFiles[pos].is_starred);
        // console.log(`--> updatedFiles[${pos}].is_starred=${updatedFiles[pos].is_starred}`);
        // const star_status = (updatedFiles[pos].is_starred == 'true');
        // updatedFiles[pos].Users = action.data.Users;
        updatedFiles.splice(pos, 1, action.data[0]);
      }
      return {
        ...state,
        files: updatedFiles,
      };
    }
    case actionType.FILE_SHARING_REMOVE: {
      console.log('*** reducer FILE_SHARING_REMOVE', action);

      const updatedFiles = [...state.files];
      const pos = updatedFiles.findIndex(i => i.id === action.data.file_id);
      if (pos !== -1) {
        const userPos = updatedFiles[pos].Users.findIndex(user => user.id === action.data.user_id);
        if (userPos !== -1) {
          updatedFiles[pos].Users.splice(userPos, 1);
        }
      }

      return {
        ...state,
        files: updatedFiles,
      };
    }
    case actionType.FETCH_SHARE_FILES: {
      console.log('*** reducer FETCH_SHARE_FILES', action);
      return {
        ...state,
        shareFiles: [...action.data],
      };
    }
    case actionType.FOLDER_SHARING_ADD: {
      console.log('*** reducer FOLDER_SHARING_ADD', action);

      const updatedFolders = [...state.folders];
      const pos = updatedFolders.findIndex(i => i.id === action.data[0].id);
      if (pos !== -1) {
        updatedFolders.splice(pos, 1, action.data[0]);
      }
      return {
        ...state,
        folders: updatedFolders,
      };
    }
    case actionType.FOLDER_SHARING_REMOVE: {
      console.log('*** reducer FOLDER_SHARING_REMOVE', action);

      const updatedFolders = [...state.folders];
      const pos = updatedFolders.findIndex(i => i.id === action.data.folder_id);
      if (pos !== -1) {
        const userPos = updatedFolders[pos].Users.findIndex(user => user.id === action.data.user_id);
        if (userPos !== -1) {
          updatedFolders[pos].Users.splice(userPos, 1);
        }
      }

      return {
        ...state,
        folders: updatedFolders,
      };
    }
    case actionType.FETCH_SHARE_FOLDERS: {
      console.log('*** reducer FETCH_SHARE_FOLDERS', action);
      return {
        ...state,
        shareFolders: [...action.data],
      };
    }

    default:
      return state;
  }
};

export default UserReducer;
