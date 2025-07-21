export type NavbarProps = {
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
  redirectToHome: () => void;
  backgroundColor?: string;
  handleSignInClick: () => void;
  handleLogout: () => void;
  userName: string | null;
  showLogout: boolean;
};

export type NavbarContainerProps = {
  backgroundColor?: string;
};
