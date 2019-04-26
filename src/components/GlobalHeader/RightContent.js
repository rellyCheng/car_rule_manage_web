import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Dropdown, Avatar, Tooltip, Button, message, Modal  } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';
import { connect } from 'dva';
@connect(({global,loading})=>({
  global,
}))

export default class GlobalHeaderRight extends PureComponent {
  state={
  }

  render() {
    const {
      onMenuClick,
      theme,
    } = this.props;
    let currentUser = this.props.currentUser || {};
   
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="default" style={{ backgroundColor: currentUser.bgColor }}>
                 大
                </Avatar>
            </span>
          </Dropdown>
        <SelectLang className={styles.action} />
      </div>
    );
  }
}
