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
      let pos = updatedFiles.findIndex( i => i.id === action.data.id )
      if(pos !== -1) {
        console.log(typeof updatedFiles[pos].is_starred);
        console.log(`--> updatedFiles[${pos}].is_starred=${updatedFiles[pos].is_starred}`);
        // const star_status = (updatedFiles[pos].is_starred == 'true');
        updatedFiles[pos].is_starred = !updatedFiles[pos].is_starred;
      }
      return {
        ...state,
        files: updatedFiles,
      }
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

    default:
      return state;
  }
};

export default UserReducer;
