import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import { ENVIRONMENT_TYPE_POPUP } from '../../../../app/scripts/lib/enums'
import { getEnvironmentType } from '../../../../app/scripts/lib/util'
import TabBar from '../../components/app/tab-bar'
import c from 'classnames'
import Conversation from './conversation.component'
import Contacts from './contacts.component'
import IdentityHandler from './identityHandler.component'
import KeyHandler from './keyHandler.component'

import ethUtil from 'ethereumjs-util'

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
const ecies = require("eth-ecies");

class MessagesPage extends PureComponent {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    t: PropTypes.func,
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  state = {
    pageTitle: 'Messages',
    // randomMessage: null,
    // address: null,
    // publicKey: null,
    contacts: []
  }

  setPageTitle = (pageTitle) => {
    this.setState({ pageTitle })
  }

  isCurrentPath (pathname) {
    return this.props.location.pathname === pathname
  }

  updateContacts = (contacts) => {
    const randomMessage = loadLocalStorageData('random-message')

    contacts.map(contact => {
      contact.messages.map(message => {
        try {
          const bufferEncryptedMessage = Buffer.from(message.body, 'base64');
          var randomMessageBuffer = new Buffer(randomMessage, "hex")
          var body = ecies.decrypt(randomMessageBuffer, bufferEncryptedMessage).toString()
          message.body = body
        } catch(e) {
          message.body = null
        }
      })
      contact.messages = contact.messages.filter(m => m.body != null)
      console.log('contact')
      console.log(contact)
      return contact
    })
    console.log('contacts')
    console.log(contacts)

    this.setState({contacts})
  }

  render () {
    const { t } = this.context
    const { history, location } = this.props

    return (
      <div
        className={c('main-container messages-page', {
          'messages-page--selected': !this.isCurrentPath(MESSAGES_ROUTE),
        })}
      >
        <div className="messages-page__header">
          {
            !this.isCurrentPath(MESSAGES_ROUTE) && !this.isCurrentPath(CONVERSATION_ROUTE) && (
              <div
                className="messages-page__back-button"
                onClick={() => history.push(MESSAGES_ROUTE)}
              />
            )
          }
          <div className="messages-page__header__title">{this.state.pageTitle}</div>
          <div
            className="messages-page__close-button"
            onClick={() => history.push(DEFAULT_ROUTE)}
          />
        </div>
        <div className="messages-page__content">
          { this.renderContent() }
          <div className="messages-page__content__modules">
          </div>
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <Switch>
        <Route
          path={CONVERSATION_ROUTE + '/:address'}
          render={(props) => <Conversation {...props} setPageTitle={this.setPageTitle} contacts={this.state.contacts}/>}
        />
        <Route
          path={MESSAGES_ROUTE + '/contacts'}
          render={(props) => <Contacts {...props} setPageTitle={this.setPageTitle} contacts={this.state.contacts} updateContacts={this.updateContacts} />}
        />
        <Route
          path={MESSAGES_ROUTE + '/check-identity'}
          component={IdentityHandler}
        />
        <Route component={KeyHandler}/>
      </Switch>
    )
  }
}

export default withRouter(MessagesPage)
