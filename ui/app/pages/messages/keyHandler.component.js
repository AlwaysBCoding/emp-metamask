import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import { ENVIRONMENT_TYPE_POPUP } from '../../../../app/scripts/lib/enums'
import { getEnvironmentType } from '../../../../app/scripts/lib/util'

const connect = require('react-redux').connect
const actions = require('../../store/actions')
import {
  loadLocalStorageData,
  saveLocalStorageData,
} from '../../../lib/local-storage-helpers'

import ethUtil from 'ethereumjs-util'
import * as API from './api'

import {
  DEFAULT_ROUTE,
  ABOUT_US_ROUTE,
  CONVERSATION_ROUTE,
  MESSAGES_ROUTE
} from '../../helpers/constants/routes'
import Button from '../../components/ui/button'

const mapStateToProps = (state) => state

function mapDispatchToProps (dispatch) {
  return {
    showExportPrivateKeyModal: () => {
      dispatch(actions.showModal({ name: 'EXPORT_PRIVATE_KEY' }))
    },
    hideModal: () => dispatch(actions.hideModal()),
  }
}

class KeyHandler extends PureComponent {
  state = {
    listener: null,
  }

  checkKey = () => {
    const randomMessage = loadLocalStorageData('random-message')
    if (randomMessage) {
      clearInterval(this.state.listener);
      this.props.history.push(MESSAGES_ROUTE + '/check-identity')
      return true;
    }
    return false;
  }

  componentDidMount = () => {
    // waiting for local storage changes.
    // i'm sorry, but this is a hackathon and I don't want to learn redux.
    if(!this.checkKey()) {
      const listener = setInterval(this.checkKey, 500);
      this.setState({listener});
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.state.listener);
  }

  render() {
    return (
      <div>
        To set up messaging, please enter your metamask password.
        <Button onClick={()=> this.props.showExportPrivateKeyModal()}>I understand</Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyHandler)
