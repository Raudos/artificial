import React from 'react';

export default (options) => {
  return (PassedComponent) => {
    const Loader = (props) => {
      if (options.isErrored(props)) {
        return (
          <div>
            Error
          </div>
        )
      } else if (options.isLoading(props)) {
        return (
          <div>
            Loading
          </div>
        )
      }
  
      return <PassedComponent {...props} />
    };
    
    return Loader;
  };
};
