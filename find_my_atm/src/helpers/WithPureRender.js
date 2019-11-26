/**
 * Created by prasoon on 15/11/16.
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default function (ComposedComponent) {
  class WithPureRender extends React.Component {
    constructor(props){
      super(props);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
      return <ComposedComponent {...this.props}/>
    }
  }

  return WithPureRender;
}