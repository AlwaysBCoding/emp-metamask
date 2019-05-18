import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import { ENVIRONMENT_TYPE_POPUP } from '../../../../app/scripts/lib/enums'
import { getEnvironmentType } from '../../../../app/scripts/lib/util'
import TabBar from '../../components/app/tab-bar'
import c from 'classnames'

import {
  DEFAULT_ROUTE,
  ABOUT_US_ROUTE,
  CONVERSATION_ROUTE,
  MESSAGES_ROUTE
} from '../../helpers/constants/routes'
import Button from '../../components/ui/button'

const contact = {
  username: 'tom',
  address: '0x7002f1dCa3e8592411E985791128CA7C3c9eE60E',
  publicKey: '12030230ab2',
  messages: [
    { body: 'hey bro', from: '0x7A33615d12A12f58b25c653dc5E44188D44f6898', to: '0x7002f1dCa3e8592411E985791128CA7C3c9eE60E', createdAt: Date.now(), status: 'read' },
    { body: 'Hows life treating you', from: '0x7002f1dCa3e8592411E985791128CA7C3c9eE60E', to: '0x7A33615d12A12f58b25c653dc5E44188D44f6898', createdAt: Date.now(), status: 'read' }
  ]
}
const address = '0x7002f1dCa3e8592411E985791128CA7C3c9eE60E'

const Contacts = (props) => <div>
  Some bloddy messages
  <Button onClick={() => props.history.push(`${CONVERSATION_ROUTE}/${address}`)}>go to convo</Button>
</div>

export default withRouter(Contacts)