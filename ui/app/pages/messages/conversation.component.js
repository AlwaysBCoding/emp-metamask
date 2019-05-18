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

// todo: put in my own file
const Conversation = () => <div>hey bb this is a convo</div>

export default withRouter(Conversation)
