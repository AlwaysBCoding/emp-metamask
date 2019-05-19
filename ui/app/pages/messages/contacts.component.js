import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import { ENVIRONMENT_TYPE_POPUP } from '../../../../app/scripts/lib/enums'
import { getEnvironmentType } from '../../../../app/scripts/lib/util'
import c from 'classnames'
import moment from 'moment'
import * as API from './api'

// API.getMessagesForAddress({address: '0x7564105e977516c53be337314c7e53838967bdac'})
// .then((data) => {
//   console.log(data)
// })

import ethUtil from 'ethereumjs-util'
import {
  DEFAULT_ROUTE,
  ABOUT_US_ROUTE,
  CONVERSATION_ROUTE,
  MESSAGES_ROUTE
} from '../../helpers/constants/routes'
import {
  loadLocalStorageData,
  saveLocalStorageData,
} from '../../../lib/local-storage-helpers'
import Button from '../../components/ui/button'
import TextField from '../../components/ui/text-field'

class Contacts extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    contacts: PropTypes.array,
    setPageTitle:  PropTypes.func,
    updateContacts: PropTypes.func.isRequired
  }

  state = {
    loading: true,
    contacts: [],
    query: '',
    myAddress: '',
    publicKey: ''
  }

  componentWillMount = () => {
    this.props.setPageTitle('Messages')

    const randomMessage = `0x${loadLocalStorageData('random-message')}`
    const address = `0x${ethUtil.privateToAddress(randomMessage).toString('hex')}`
    const publicKey = `0x${ethUtil.privateToPublic(randomMessage).toString('hex')}`

    this.setState({ myAddress: address, myPublicKey: publicKey })

    API.getMessagesForAddress({address}).then((res)=>{
      console.log('res')
      console.log(res)
      this.props.updateContacts(res)
      console.log('this.props.contacts')
      console.log(this.props.contacts)
      this.setState({contacts: this.props.contacts})
    })
  }

  filterContacts = (s) => {
    this.setState({query: s})
    let contacts = this.props.contacts
    contacts = contacts.filter((c) => c.address.includes(s.toLowerCase()))
    this.setState({contacts})
  }

  _renderContact(contact, index) {
    return (
      <div className='contact' key={`contact-${index}`}
        onClick={() => this.props.history.push(`${CONVERSATION_ROUTE}/${contact.address}`)}
      >
        <div className='identity'>
          <p className='username'>{contact.username}</p>
          <p className='address'>{contact.address.substring(0, 20)}</p>
        </div>
        {/*<div className='timestamp'>
          <p className='timestamp'>{contact.messages.length > 0 ? moment(contact.messages[0].createdAt).fromNow() : ''}</p>
        </div>*/}
      </div>
    )
  }

  onSubmit = (e) => {
    e.preventDefault();

    const query = this.state.query;

    API.sendMessageToAddress({
      from: this.state.myAddress,
      publicKey: this.state.myPublicKey,
      to: query,
      message: ''
    })
    .then((data) => {
      console.log('done!')
      this.props.history.push(`${CONVERSATION_ROUTE}/${query}`)
    })
  }

  _renderContacts() {
    console.log('render contacts')
    console.log(this.state.contacts)
    return this.state.contacts.map((contact, index) => {
      return this._renderContact(contact, index);
    })
  }

  render() {
    const { loading } = this.state

    return (
      <div className='contacts'>
        <form onSubmit={this.onSubmit}>
          <TextField
            className='filter-contacts'
            fullWidth
            placeholder="Who's your fave address"
            onChange={(event) => this.filterContacts(event.target.value)}
            value={this.state.query}
          />
        </form>
        {this._renderContacts()}
      </div>
    )
  }
}

export default withRouter(Contacts)
