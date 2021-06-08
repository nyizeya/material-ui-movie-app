import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Movie, Search, Tv, Whatshot } from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#2d313a',
    zIndex: 100
  },
});

export default function MainNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory()

  useEffect(() => {
    if (value === 0) history.push('/')
    else if (value === 1) history.push('/movies')
    else if (value === 2) history.push('/series')
    else history.push('/search')
    // eslint-disable-next-line
  }, [value])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Trending" icon={<Whatshot />}  />
      <BottomNavigationAction label="Movies" icon={<Movie />  } />
      <BottomNavigationAction label="TV Series" icon={<Tv /> } />
      <BottomNavigationAction label="Search" icon={<Search /> } />
    </BottomNavigation>
  );
}

