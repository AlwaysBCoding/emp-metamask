import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import { ENVIRONMENT_TYPE_POPUP } from '../../../../app/scripts/lib/enums'
import { getEnvironmentType } from '../../../../app/scripts/lib/util'

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

class IdentityHandler extends PureComponent {
  checkIdentity = () => {
    API.lookupIdentityPublicKey({address: `0x${ethUtil.privateToAddress(`0x${loadLocalStorageData('random-message')}`).toString('hex')}`})
    .then((data) => {
      if(data.status === 'ok') {
        this.props.history.push(MESSAGES_ROUTE + '/contacts')
      } else {
        API.registerIdentity({
          address: `0x${ethUtil.privateToAddress(`0x${loadLocalStorageData('random-message')}`).toString('hex')}`,
          publicKey: `0x${ethUtil.privateToPublic(`0x${loadLocalStorageData('random-message')}`).toString('hex')}`
        })
        .then((data) => {
          if(data.status === 'ok') {
            this.props.history.push(MESSAGES_ROUTE + '/contacts')
          } else {
            console.log('err register identtiy')
          }
        })
      }
    })
  }

  componentDidMount = () => {
    this.checkIdentity()
  }

  render() {
    return (
      <div>
        on identity handler, loading....
      </div>
    )
  }
}

export default IdentityHandler
