import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import { ENVIRONMENT_TYPE_POPUP } from '../../../../app/scripts/lib/enums'
import { getEnvironmentType } from '../../../../app/scripts/lib/util'
import TabBar from '../../components/app/tab-bar'
import c from 'classnames'
import moment from 'moment'
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
import TextField from '../../components/ui/text-field'

const myAddress = '0x7A33615d12A12f58b25c653dc5E44188D44f6898'

const Tick = () => <span className="tick"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg></span>

const Message = (props) => <div className={c('message', { received: (props.message.to === myAddress), sent: (props.message.from === myAddress) } )}>
  { props.message.body }
  <span className="metadata">
    <span className="time">{ moment(props.message.createdAt).format('h:mm A') }<Tick /></span>
  </span>
</div>

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
    const activeContactAddress = this.props.match.params.address
    const shortAddress = activeContactAddress.substring(0, 20)
    this.props.setPageTitle(shortAddress)
  }

  render() {
    const activeContactAddress = this.props.match.params.address
    const contacts = this.props.contacts
      // console.log(`contacts: ${contacts}`)
      // console.log(`activeContactAddress: ${activeContactAddress}`)
    const activeContact = contacts.find((contact) => contact.address === activeContactAddress)
      // console.log(`activeContact: ${activeContact}`)
    const messages = activeContact.messages
      // console.log(`messages: ${messages}`)

    return (
      <div className="chat">
        <div className="chat-container">
          <div className="conversation">
            <div className="conversation-container">
              { messages.map((message, index) => <Message message={message} key={message.id} />) }  
            </div>
          </div>
          <div className='send-message'>
            <TextField
              className='send-message-textbox'
              fullWidth
              placeholder="Say something interesting"
            />
          </div>
        </div>
      </div>
    
    )
  }
}

export default withRouter(Conversation)
