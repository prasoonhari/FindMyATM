import React, { PropTypes, Component } from 'react';
import { ListView as RNListView, RecyclerViewBackedScrollView, View, ActivityIndicator, RefreshControl } from 'react-native';
import _ from 'lodash';

import styles from './listView.style';

const DefaultListConfig = {
  initialListSize: 4,
  pageSize: 1,
  scrollRenderAheadDistance: 500,
};

class ListView extends Component {

  static defaultProps = {
    shouldShowSeparator: true,
    enableCardView: true,
    showLoaderInFooter: false,
  };

  constructor(props) {
    super(props);

    const { data } = this.props;
    const dataSource = new RNListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (v1, v2) => v1 != v2,
      sectionHeaderHasChanged: (v1, v2) => v1 != v2,
    });
    this.state = {
      dataSource: cloneWithData(dataSource, data),
    };
  }

  componentWillReceiveProps(nextProps) {
    // TODO : uncomment below lines once immutability issues are fixed (i.e , every component using this listview should send new rowData bject , instead mutating same rowData object)
    // if (this.props.data !== nextProps.data) {
    //   this.setState({
    //     dataSource: cloneWithData(this.state.dataSource, nextProps.data),
    //   });
    // }

    const ds = new RNListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.setState({dataSource: cloneWithData(ds, nextProps.data)});
  }

  render() {
    const { props } = this;
    const { renderRow, renderSectionHeader, style, shouldShowSeparator, renderHeader, onEndReached, showMoreLoadingSpinner, isLoadingMore  } = props;
    return (
      <RNListView
        ref="listview"
        style={[styles.listView, style]}
        dataSource={this.state.dataSource}
        renderRow={renderRow}
        renderSectionHeader={renderSectionHeader}
        initialListSize={DefaultListConfig.initialListSize}
        pageSize={DefaultListConfig.pageSize}
        removeClippedSubviews
        scrollRenderAheadDistance={DefaultListConfig.scrollRenderAheadDistance}
        enableEmptySections
        renderSeparator={shouldShowSeparator ? this.renderSeparator : _.noop}
        renderHeader={renderHeader}
        renderScrollComponent={prop => <RecyclerViewBackedScrollView {...prop} />}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps
        onEndReached={onEndReached}
        renderFooter={this._renderFooter}
        {...props}/>
    );
  }

  _renderFooter = () => {
    const {renderFooter, showLoaderInFooter} = this.props;
    return (
      <View>
        {renderFooter && renderFooter()}
        {showLoaderInFooter && <ActivityIndicator size={'small'}/>}
      </View>
    );
  }

  renderSeparator = (sectionID, rowID) => {
    const separatorStyle = this.props.enableCardView ? styles.separatorCard : styles.separatorNormal;
    return (
      <View key={`${sectionID}-${rowID}`} style={separatorStyle}/>
    );
  }
}

ListView.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  renderHeader: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  onEndReached: PropTypes.func,
  renderRow: PropTypes.func.isRequired,
  shouldShowSeparator: PropTypes.bool,
  enableCardView: PropTypes.bool,
  style: PropTypes.object,
  showLoaderInFooter: PropTypes.bool,
};

function cloneWithData(dataSource:RNListView.DataSource, data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

module.exports = ListView;
