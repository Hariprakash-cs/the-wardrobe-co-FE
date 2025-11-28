import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Filter1 from "./Filter1";
import "./Navbar.css";

export default function Navbar() {
  const cartreducer = useSelector((state) => state.cartReducer);

  const { cartItems } = cartreducer;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    // <div>
    //   <nav className="navbar navbar-expand-lg">
    //     <a className="navbar-brand" href="/">
    //       PIXEL SHOPS
    //     </a>

    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target="#navbarNav"
    //       aria-controls="navbarNav"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"><i class="fas fa-bars" style={{color:'white'}}></i></span>
    //     </button>

    //     <div className="collapse navbar-collapse" id="navbarNav">
    //       <div className="navbar-nav ">
    //       {/* <Filter1/> */}
    //         {currentUser ? (
    //            <li className="card profile-out">

    //            <Button
    //              id="basic-button"
    //              aria-controls={open ? 'basic-menu' : undefined}
    //              aria-haspopup="true"
    //              aria-expanded={open ? 'true' : undefined}
    //              onClick={handleClick}
    //            >
    //              <AccountCircleIcon className="profile-btn"/>{currentUser.name}
    //              {/* <i style={{color:'white'}} className="fa fa-user" aria-hidden="true"></i>{currentUser.name} */}
    //            </Button>
    //            <Menu
    //              id="basic-menu"
    //              anchorEl={anchorEl}
    //              open={open}
    //              onClose={handleClose}
    //              MenuListProps={{
    //                'aria-labelledby': 'basic-button',
    //              }}
    //            >
    //              <MenuItem  onClick={handleClose}><a href="/profile"><ContactPageIcon className="margin-less-10"/>Profile</a></MenuItem>
    //              <MenuItem onClick={handleClose}><a href="/admin/userslist"><AdminPanelSettingsIcon className="margin-less-10"/>Admin Pannel</a></MenuItem>
    //              <MenuItem onClick={handleClose}><a href="/orders"><GradingIcon className="margin-less-10"/>Orders</a></MenuItem>
    //              <MenuItem onClick={()=>{dispatch(logoutUser())}}><ExitToAppIcon/>Logout</MenuItem>
    //            </Menu>
    //          </li>

    //         ) : (
    //           <li className="nav-item ">
    //             <a className="nav-link" href="/login">
    //               Login
    //             </a>
    //           </li>
    //         )}

    //         <li className="nav-item  ">
    //           <a className="nav-link" href="/cart">
    //             <AddShoppingCartIcon/> {cartItems.length}
    //           </a>
    //         </li>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
    <nav className={`modern-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a className="brand-logo" href="/">
          <Diversity2Icon className="brand-icon" />
          <span className="brand-text">The Wardrobe Co</span>
        </a>

        <div className="navbar-content">
          <div className="nav-search-wrapper">
            <Filter1 />
          </div>

          <div className="nav-actions">
            {currentUser ? (
              <a href="/profile" className="profile-link">
                <AccountCircleIcon className="profile-icon" />
                <span className="user-name">{currentUser.name}</span>
              </a>
            ) : (
              <a href="/login" className="login-button">
                <AccountCircleIcon />
                <span>Login</span>
              </a>
            )}

            <a href="/cart" className="cart-button">
              <AddShoppingCartIcon className="cart-icon" />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
