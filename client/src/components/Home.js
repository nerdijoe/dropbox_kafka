import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import FileUpload from './FileUpload';
import Listing from './Listing';
import CreateFolder from './CreateFolder';

import { 
  axiosFetchListing,
  axiosFetchUserAbout,
  axiosFetchUserInterest,
  axiosFetchFiles,
  axiosFetchFolders,
  axiosFetchRootFolders,
  axiosFetchRootFiles,
} from '../actions';

class Home extends Component {
  componentDidMount() {
    this.props.axiosFetchListing();
    this.props.axiosFetchUserAbout();
    this.props.axiosFetchUserInterest();
    // this.props.axiosFetchFiles();
    // this.props.axiosFetchFolders();
    this.props.axiosFetchRootFolders();
    this.props.axiosFetchRootFiles();
  }

  render() {
    return (
      <Container>
        Home
        <FileUpload />
        <CreateFolder />

        <Listing />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    axiosFetchListing: () => { dispatch(axiosFetchListing()); },
    axiosFetchUserAbout: () => { dispatch(axiosFetchUserAbout()); },
    axiosFetchUserInterest: () => { dispatch(axiosFetchUserInterest()); },
    axiosFetchFiles: () => { dispatch(axiosFetchFiles()); },
    axiosFetchFolders: () => { dispatch(axiosFetchFolders()); },
    axiosFetchRootFolders: () => { dispatch(axiosFetchRootFolders()); },
    axiosFetchRootFiles: () => { dispatch(axiosFetchRootFiles()); },
  };
};

const connectedHome = connect(null, mapDispatchToProps)(Home);
export default connectedHome;
