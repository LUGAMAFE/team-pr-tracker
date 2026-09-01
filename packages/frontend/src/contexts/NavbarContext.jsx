import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const NavbarContext = createContext({
  open: false,
  setOpen: null,
});

const NavbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

NavbarProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
export { NavbarProvider };
