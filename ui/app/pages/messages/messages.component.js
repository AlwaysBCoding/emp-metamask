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
const Messages = (props) => <div>
  Some bloddy messages
  <Button onClick={() => props.history.push(CONVERSATION_ROUTE)}>go to convo</Button>
</div>

// todo: put in my own file
const Conversation = () => <div>hey bb this is a convo</div>

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
    messages: [
      {
        username: 'tom',
        address: '0x744aa',
        publicKey: '12030230ab2',
        messages: [
          { body: 'hey bro', from: '0x744aa', to: '0x222aaa', createdAt: Date.now(), status: 'read' }
        ]
      }
    ]
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
        className={c('main-container settings-page', {
          'settings-page--selected': !this.isCurrentPath(MESSAGES_ROUTE),
        })}
      >
        <div className="settings-page__header">
          {
            !this.isCurrentPath(MESSAGES_ROUTE) && !this.isCurrentPath(CONVERSATION_ROUTE) && (
              <div
                className="settings-page__back-button"
                onClick={() => history.push(MESSAGES_ROUTE)}
              />
            )
          }
          <div className="settings-page__header__title">Messages</div>
          <div
            className="settings-page__close-button"
            onClick={() => history.push(DEFAULT_ROUTE)}
          />
        </div>
        <div className="settings-page__content">
          {/*<div className="settings-page__content__tabs">
            { this.renderTabs() }
          </div>*/}
          { this.renderContent() }
          <div className="settings-page__content__modules">
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
    //   <div className="settings-page__subheader">
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
          component={Conversation}
        />
        <Route
          component={Messages}
        />
      </Switch>
    )
  }
}

export default withRouter(MessagesPage)
