import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import { ENVIRONMENT_TYPE_POPUP } from '../../../../app/scripts/lib/enums'
import { getEnvironmentType } from '../../../../app/scripts/lib/util'
import TabBar from '../../components/app/tab-bar'
import c from 'classnames'
import Conversation from './conversation.component'
import Contacts from './contacts.component'

import {
  DEFAULT_ROUTE,
  ABOUT_US_ROUTE,
  CONVERSATION_ROUTE,
  MESSAGES_ROUTE
} from '../../helpers/constants/routes'
import Button from '../../components/ui/button'

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
    contacts: [
      {
        username: 'tom',
        address: '0x744aa',
        publicKey: '12030230ab2',
        messages: [
          { body: 'hey bro', from: '0x744aa', to: '0x222aaa', createdAt: Date.now(), status: 'read' }
        ]
      },
      {
        username: 'alwaysbcoding',
        address: '0x0e17989',
        publicKey: '12030230ab2',
        messages: [
          { body: 'hey bro', from: '0x744aa', to: '0x222aaa', createdAt: 1558191688616, status: 'read' }
        ]
      },
      {
        username: 'freeslugs',
        address: '0x09329823d',
        publicKey: '12030230ab2',
        messages: [
          { body: 'hey bro', from: '0x744aa', to: '0x222aaa', createdAt: 1557191688616, status: 'read' }
        ]
      }
    ]
  }

  setPageTitle = (pageTitle) => {
    this.setState({ pageTitle })
  }

  isCurrentPath (pathname) {
    return this.props.location.pathname === pathname
  }

  render () {
    const { t } = this.context
    const { history, location } = this.props

    // const pathnameI18nKey = ROUTES_TO_I18N_KEYS[location.pathname]
    // const isPopupView = getEnvironmentType(location.href) === ENVIRONMENT_TYPE_POPUP

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
          {/*<div className="messages-page__content__tabs">
            { this.renderTabs() }
          </div>*/}
          { this.renderContent() }
          <div className="messages-page__content__modules">
            {/* this.renderSubHeader() */}

          </div>
        </div>
      </div>
    )
  }

  renderSubHeader () {
    // const { t } = this.context
    // const { location: { pathname } } = this.props

    // return (
    //   <div className="messages-page__subheader">
    //     {t(ROUTES_TO_I18N_KEYS[pathname] || 'general')}
    //   </div>
    // )
  }

  renderTabs () {
    // const { history, location } = this.props
    // const { t } = this.context

    // return (
    //   <TabBar
    //     tabs={[
    //       // { content: t('general'), description: t('generalSettingsDescription'), key: GENERAL_ROUTE },
    //       // { content: t('advanced'), description: t('advancedSettingsDescription'), key: ADVANCED_ROUTE },
    //       // { content: t('securityAndPrivacy'), description: t('securitySettingsDescription'), key: SECURITY_ROUTE },
    //       // { content: t('networks'), description: t('networkSettingsDescription'), key: NETWORKS_ROUTE },
    //       // { content: t('about'), description: t('aboutSettingsDescription'), key: ABOUT_US_ROUTE },
    //     ]}
    //     isActive={key => {
    //       if (key === GENERAL_ROUTE && this.isCurrentPath(MESSAGES_ROUTE)) {
    //         return true
    //       }
    //       return matchPath(location.pathname, { path: key, exact: true })
    //     }}
    //     onSelect={key => history.push(key)}
    //   />
    // )
  }

  renderContent () {
    return (
      <Switch>
        <Route
          exact
          path={CONVERSATION_ROUTE}
          render={(props) => <Conversation {...props} setPageTitle={this.setPageTitle} />}
        />
        <Route
          render={(props) => <Contacts {...props} setPageTitle={this.setPageTitle} contacts={this.state.contacts} />}
        />
      </Switch>
    )
  }
}

export default withRouter(MessagesPage)