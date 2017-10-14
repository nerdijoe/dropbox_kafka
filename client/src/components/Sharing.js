import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import {
  Container,
  Table,
  Icon,
  Button,
  Header,
  Modal,
  Input,
  Form,
  Popup,
  Menu,
} from 'semantic-ui-react';

import FolderBreadcrumb from './FolderBreadcrumb';

import SharingFiles from './SharingFiles';
import SharingFolders from './SharingFolders';

import {
  axiosStarFile,
  axiosStarFolder,
  axiosFetchContentsByFolderId,
  axiosFileShareAdd,
  checkAuthentication,
  axiosFetchShareFiles,
} from '../actions';

class Listing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'folders',
      open: false,
      shareUsers: '',
      shareFileId: 0,
      shareFileName: '',
    }
  }

  componentDidMount() {
    this.props.checkAuthentication();
    this.props.axiosFetchShareFiles();
  }
  

  // handleRef = component => (this.ref = component);
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleModalShareFileOpen(openValue, file) {
    console.log(`handleModalShareFileOpen openValue=${openValue}, file.id=${file.id}`);
    this.setState({
      open: openValue,
      shareFileId: file.id,
      shareFileName: file.name,
    });

  }

  handleClick(file) {
    console.log('Listing handleClick', file);
    this.props.axiosStarFile(file);
  }

  handleStarFolder(folder) {
    console.log('Listing handleStarFolder', folder);
    this.props.axiosStarFolder(folder);
  }

  handleClickFolder(folder) {
    console.log('Listing handleClickFolder', folder);
    this.props.axiosFetchContentsByFolderId(folder);
  }

  openInNewTab(url) {
    // e.preventDefault();
    var win = window.open(url, '_blank');
    win.focus();
    console.log('openInNewTab', url)
  }

  // Modal
  handleFileShareSubmit(e) {
    e.preventDefault();
    console.log(`Modal handleSubmit ${this.state.shareUsers}, ${this.state.shareFileId}`);



    this.close();

    this.props.axiosFileShareAdd(this.state.shareUsers, this.state.shareFileId)
    this.setState({
      shareUsers: '',
      shareFileId: 0,
    })
  }

  handleChange(e) {
    const target = e.target;
    console.log(`handleChange ${target.name}=[${target.value}]`);
    
    this.setState({
      [target.name]: target.value,
    });
  }

  // for menu
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  render() {
    const listItems = this.props.list.map((item) => <li>{item}</li>);
    const user_id = localStorage.getItem('user_id');
    // console.log(`render listing user_id=${user_id}`);
    const user_email = localStorage.getItem('user_email');
    const homeAddress = `http://localhost:3000/`;

    // for menu
    const { activeItem } = this.state
    
    return (
      <Router>
      <Container>
        {/* Listing
        <ul>{listItems}</ul> */}
        <Menu pointing secondary>
          <Link to='/sharing/folders'>
            <Menu.Item name='folders' active={activeItem === 'folders'} onClick={this.handleItemClick} />
          </Link>
          <Link to='/sharing/files'>
            <Menu.Item name='files' active={activeItem === 'files'} onClick={this.handleItemClick} />
          </Link>
        </Menu>

        <Container>
          <Route exact path='/sharing/folders' component={SharingFolders} />
          <Route path='/sharing/files' component={SharingFiles} />
        </Container>


      </Container>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.UserReducer.list,
    files: state.UserReducer.files,
    folders: state.UserReducer.folders,
    shareFiles: state.UserReducer.shareFiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    axiosStarFile: (data) => { dispatch(axiosStarFile(data)); },
    axiosStarFolder: (data) => { dispatch(axiosStarFolder(data)); },
    axiosFetchContentsByFolderId: (data) => { dispatch(axiosFetchContentsByFolderId(data)); },
    axiosFileShareAdd: (users, file_id) => { dispatch(axiosFileShareAdd(users, file_id)); },
    checkAuthentication: () => { dispatch(checkAuthentication()); },
    axiosFetchShareFiles: () => { dispatch(axiosFetchShareFiles()); },
  };
};

const connectedListing = connect(mapStateToProps, mapDispatchToProps)(Listing);

export default connectedListing;
