import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
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
} from 'semantic-ui-react';

import FolderBreadcrumb from './FolderBreadcrumb';

import {
  axiosStarFile,
  axiosStarFolder,
  axiosFetchContentsByFolderId,
  axiosFileShareAdd,
} from '../actions';

class Listing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      shareUsers: '',
      shareFileId: 0,
      shareFileName: '',
    }
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



  render() {
    const listItems = this.props.list.map((item) => <li>{item}</li>);
    const user_id = localStorage.getItem('user_id');
    // console.log(`render listing user_id=${user_id}`);
    const user_email = localStorage.getItem('user_email');
    const homeAddress = `http://localhost:3000/`;

    return (
      <Container>
        {/* Listing
        <ul>{listItems}</ul> */}

        <FolderBreadcrumb />

        {
          (this.props.folders.length === 0 && this.props.files.length === 0 ) ?
          <Header as='h3' content='This folder is empty' subheader="Please upload some files." /> :
          ''
        }

        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Modified</Table.HeaderCell>
              <Table.HeaderCell>Members</Table.HeaderCell>
              <Table.Cell><Icon name='ellipsis horizontal' /></Table.Cell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            { // Folders
              this.props.folders.map( (folder) => {

                return (
                  <Table.Row key={folder.id}>
                    <Table.Cell>
                      <a onClick={() => {this.handleClickFolder(folder)}}>
                        <Icon name='blue folder' />{folder.name} {' '}
                      </a>
                      {folder.is_starred ? <Icon name='blue star' /> : ''}
                    </Table.Cell>
                    <Table.Cell>
                      {Moment(folder.updatedAt).format('L LT')}
                    </Table.Cell>
                    <Table.Cell>
                      { (folder.user_id == user_id) ? 'Only you' : 'Others'}
                    </Table.Cell>

                    {/* Actions */}
                    <Table.HeaderCell>
                      <Button basic color="blue" onClick={() => {this.handleStarFolder(folder)}}>Star</Button>
                      {/* <Button primary content='Share' onClick={() => {this.handleModalShareFileOpen()}} /> */}

                    </Table.HeaderCell>
                  </Table.Row>
                ); // end of return
              })}

            { // Files
              this.props.files.map( (file) => {
                let re = new RegExp('./public/')
                const downloadLink = homeAddress + file.full_path.replace(re, '');
                // console.log(downloadLink);

                const membersMsg = (file.Users && file.Users.length > 0 ) ? `${file.Users.length} ${(file.Users.length > 1 ? 'members' : 'member' )}` : 'Only you';

                const members = file.Users.map( (item) => {
                  return <div>{`${item.firstname} ${item.lastname}`}</div>;
                })
                
                return (
                  <Table.Row key={file.id}>
                    <Table.Cell>
                      <a href={downloadLink} target="_blank" >{file.name}</a>{' '}
                      {file.is_starred ? <Icon name='blue star' /> : ''}

                    </Table.Cell>
                    <Table.Cell>
                      {Moment(file.updatedAt).format('L LT')}
                    </Table.Cell>
                    <Table.Cell>

                      <Popup
                        trigger={<span>{ membersMsg }</span>}
                        content={<span>{ members }</span>}
                        size='tiny'
                        position='bottom center'
                        inverted
                      />
                    </Table.Cell>

                    <Table.HeaderCell>
                      <Button basic color="blue" onClick={() => {this.handleClick(file)}}>Star</Button>
                      <Button primary content='Share' onClick={ () => this.handleModalShareFileOpen(true, file)} />

                    </Table.HeaderCell>
                  </Table.Row>
                ); // end of return
              })}

          </Table.Body>
        </Table>

        <Modal dimmer='inverted' open={this.state.open} onClose={this.close}>
          <Modal.Content>
            <Form onSubmit={(e) => { this.handleFileShareSubmit(e); }} >
              <Form.Field>
                <Container>
                  <Header sub>Share a file</Header>
                  <span>{this.state.shareFileName}</span>
                  <Header size='tiny'>Share with other users, Enter user emails separated by a comma.</Header>
                </Container>
                <Input placeholder="harden@rockets.com, cp3@rockets.com, ..." name="shareUsers" value={this.state.shareUsers} onChange={(e) => { this.handleChange(e); }} />
                
              </Form.Field>
              <Button basic type="submit">Can view</Button>
            </Form>
          </Modal.Content>
        </Modal>


      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.UserReducer.list,
    files: state.UserReducer.files,
    folders: state.UserReducer.folders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    axiosStarFile: (data) => { dispatch(axiosStarFile(data)); },
    axiosStarFolder: (data) => { dispatch(axiosStarFolder(data)); },
    axiosFetchContentsByFolderId: (data) => { dispatch(axiosFetchContentsByFolderId(data)); },
    axiosFileShareAdd: (users, file_id) => { dispatch(axiosFileShareAdd(users, file_id)); },
  };
};

const connectedListing = connect(mapStateToProps, mapDispatchToProps)(Listing);

export default connectedListing;
