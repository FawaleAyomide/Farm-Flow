import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
    componentDidCatch(error){
      // You can log the error to an error reporting service here if needed
      // console.error(error);
    }
    render() {
      if (this.state.hasError) {
        return (
          <div className='error'>
            <h1> God Damn it!! : Something went wrong..</h1>
          </div>
        );
        
      }
  
      return this.props.children; 
    }
  }