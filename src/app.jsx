import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   var self = this;
   var childrenWithProps = React.Children.map(this.props.children, function (child) {
    return React.cloneElement(child,{})
   })
   return (<div>
    {childrenWithProps}
   </div>);
  }
}

export default App;
