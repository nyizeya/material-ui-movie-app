import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const CustomPagination = ({ setPage, numberOfPages = 10}) => {

    const handlePageChange = (page) => {
        setPage(page)
        window.scroll(0, 0)
    }

    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 10
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Pagination count={numberOfPages} 
            onChange={(e) => handlePageChange(e.target.textContent)}
            color='primary'
          />
        </ThemeProvider>
        
      </div>
    );
}

// 0:58:32
 
export default CustomPagination;