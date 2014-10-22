/** @jsx React.DOM */

var PageView = React.createClass({displayName: 'PageView',
  getInitialState: function() {
    return {
      startLoader: false
    };
  },

  startLoader: function() {
      this.setState({startLoader: true}); 
  },

  render: function () {
    return (
      React.DOM.div(null, 
          PageLoader({show: this.state.startLoader}), 
          React.DOM.input({type: "button", onClick: this.startLoader, value: "Fire Loader"})
      )
    );
  }
});

var PageLoader = React.createClass({displayName: 'PageLoader',
  getInitialState: function() {
    var innerWidth = window.innerWidth;
    return {
      loaderWidth: innerWidth,
      loaderLeft: - innerWidth - 20,
      inAnimation: false,
      animationId: 0, 
      pos: 0
    };
  },

  animate: function() {
      var that = this, animationTimer;
      animationTimer = setTimeout(function() {
          var  newLeft;
          if (!that.state.inAnimation)  {
            return;
          }

          if (that.state.loaderLeft < 0){
              that.state.animationId = window.requestAnimationFrame(that.animate);
          } else {
              that.state.pos = 0;
              that.setState({loaderLeft: -that.state.loaderWidth - 20});
              that.state.inAnimation = false;
              clearTimeout(animationTimer);
              window.cancelAnimationFrame(that.state.animationId);
              return;
          }

          that.state.pos += 1 + that.state.pos / 2;
          newLeft = that.state.loaderLeft + that.state.pos;
          if (newLeft > 0)  {
              newLeft = 0;
          }

          that.setState({loaderLeft: newLeft});
      }, 1000 / 60);
  },

  render: function () {
      if (this.props.show) {
        if (!this.state.inAnimation) {
            this.state.inAnimation = true;
            this.animate();
        }
      }
      var style = {
          width: this.state.loaderWidth,
          height: '2px',
          backgroundColor: '#c0392b',
          display: 'block',
          position: 'fixed',
          top: '0px',
          transform: 'translate3d(' + this.state.loaderLeft + 'px, 0px, 0px)',
          padding: 0,
          margin: 0,
          border: 0
      };

      return (
          React.DOM.span({style: style}, '')
      );
  }
});

React.renderComponent(PageView(null), document.body);
