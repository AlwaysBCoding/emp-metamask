import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import { ENVIRONMENT_TYPE_POPUP } from '../../../../app/scripts/lib/enums'
import { getEnvironmentType } from '../../../../app/scripts/lib/util'
import c from 'classnames'
import moment from 'moment'

import {
  DEFAULT_ROUTE,
  ABOUT_US_ROUTE,
  CONVERSATION_ROUTE,
  MESSAGES_ROUTE
} from '../../helpers/constants/routes'
import Button from '../../components/ui/button'

class Contacts extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    contacts: PropTypes.array,
    setPageTitle:  PropTypes.func
  }

  _renderContact(contact, index) {
    return (
      <div className='contact' key={`contact-${index}`}>
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
    return (
      <div className='contacts'>
        {this._renderContacts()}
      </div>
    )
  }
}

export default withRouter(Contacts)
