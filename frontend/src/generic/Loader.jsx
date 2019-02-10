import React from 'react';

export default (options) => {
  return (PassedComponent) => {
    const Loader = (props) => {
      if (options.isErrored(props)) {
        return (
          <div data-testid="loaderError">
            Error
          </div>
        )
      } else if (options.isLoading(props)) {
        return (
          <div data-testid="loader">
            Loading
          </div>
        )
      }
  
      return <PassedComponent {...props} />
    };
    
    return Loader;
  };
};
