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

class Contacts extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    contacts: PropTypes.array,
    setPageTitle:  PropTypes.func,
    updateContacts: PropTypes.func.isRequired
  }

  state = {
    loading: true,
  }

  componentWillMount = () => {
    this.props.setPageTitle('Messages')

    const randomMessage = `0x${loadLocalStorageData('random-message')}`
    const address = `0x${ethUtil.privateToAddress(randomMessage).toString('hex')}`
    const publicKey = `0x${ethUtil.privateToPublic(randomMessage).toString('hex')}`

    API.getMessagesForAddress({address}).then((res)=>{
      console.log(res)
      this.props.updateContacts(res)
    })
  }

  _renderContact(contact, index) {
    return (
      <div className='contact' key={`contact-${index}`}
        onClick={() => this.props.history.push(`${CONVERSATION_ROUTE}/${contact.address}`)}
      >
        <div className='identity'>
          <p className='username'>{contact.username}</p>
          <p className='address'>{contact.address}</p>
        </div>
        <div className='timestamp'>
          <p className='timestamp'>{moment(contact.messages[0].createdAt).fromNow()}</p>
        </div>
      </div>
    )
  }

  _renderContacts() {
    return this.props.contacts.map((contact, index) => {
      return this._renderContact(contact, index);
    })
  }

  render() {
    const { loading } = this.state

    return (
      <div className='contacts'>
        {this._renderContacts()}
        {/*loading ? <div>loading...</div> : */}
      </div>
    )
  }
}

export default withRouter(Contacts)
