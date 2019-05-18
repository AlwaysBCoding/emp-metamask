import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import { ENVIRONMENT_TYPE_POPUP } from '../../../../app/scripts/lib/enums'
import { getEnvironmentType } from '../../../../app/scripts/lib/util'
import TabBar from '../../components/app/tab-bar'
import c from 'classnames'
import {
  loadLocalStorageData,
  saveLocalStorageData,
} from '../../../lib/local-storage-helpers'

import {
  DEFAULT_ROUTE,
  ABOUT_US_ROUTE,
  CONVERSATION_ROUTE,
  MESSAGES_ROUTE
} from '../../helpers/constants/routes'
import Button from '../../components/ui/button'

const activeContactAddress = '0x7002f1dCa3e8592411E985791128CA7C3c9eE60E'

class Conversation extends PureComponent {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    t: PropTypes.func,
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  componentWillMount = () => {
    // this.props.setPageTitle(activeContactAddress)
    // get active convo address from local storage
    // set convo address to title
    // render all messages for that conversation
  }

  render() {
    const myAddress = '0x7A33615d12A12f58b25c653dc5E44188D44f6898'
    
    const activeContactAddress = this.props.match.params.address
    const contacts = this.props.contacts
    console.log(`contacts: ${contacts}`)
    console.log(`activeContactAddress: ${activeContactAddress}`)
    const activeContact = contacts.find((contact) => contact.address === activeContactAddress)
    console.log(`activeContact: ${activeContact}`)
    const messages = activeContact.messages
    console.log(`messages: ${messages}`)


    return (
      <div>
        { messages.map((message, index) => <div key={index}>
            {message.body}
          </div>)
        }
      </div>
    )
  }
}

export default withRouter(Conversation)
