import { Navigate } from "react-router-dom";

import Dashboard from "pages/Dashboard";

// Orders
import OrdersListView from "pages/Orders/ListView";
import OrdersOverview from "pages/Orders/Overview";

// Calender
import Calendar from "pages/Calendar";

// Sellers
import SellersListView from "pages/Sellers/ListView";
import SellersGridView from "pages/Sellers/GridView";
import SellersOverview from "pages/Sellers/Overview";

// Invoice
import InvoiceList from "pages/Invoices/InvoiceList";
import InvoiceDetails from "pages/Invoices/InvoiceDetails";
import CreateInvoice from "pages/Invoices/CreateInvoice";

// User List
import UsersList from "pages/UsersList";

// Shipping
import Shipments from "pages/Shipping/Shipments";
import ShippingList from "pages/Shipping/ShippingList";

// Coupons
import Coupons from "pages/Coupons";

//Review & Rating
import ReviewRating from "pages/Reviews-Rating";

//Brands
import Brands from "pages/Brands";

//statistics
import Statistics from "pages/Statistics";

// Localization
import Transactions from "pages/Localization/Transactions";
import CurrencyRates from "pages/Localization/CurrencyRates";

// Accounts
import MyAccount from "pages/Accounts/MyAccount";
import Settings from "pages/Accounts/Settings";
import SignUp from "pages/Accounts/AuthenticationInner/SignUp";
import SignIn from "pages/Accounts/AuthenticationInner/SignIn";
import PasswordReset from "pages/Accounts/AuthenticationInner/PasswordReset";
import PasswordCreate from "pages/Accounts/AuthenticationInner/PasswordCreate";
import SuccessMessage from "pages/Accounts/AuthenticationInner/SuccessMessage";
import TwoStepVerify from "pages/Accounts/AuthenticationInner/TwoStepVerify";
import BasicLogout from "pages/Accounts/AuthenticationInner/Logout";
import Error404 from "pages/Accounts/AuthenticationInner/Error404";
import Error500 from "pages/Accounts/AuthenticationInner/Error500";
import ComingSoon from "pages/Accounts/AuthenticationInner/ComingSoon";
import StatEnseignant from "pages/Statistiques/Enseignant/StatEnseignant";
import StatEtudiant from "pages/Statistiques/Etudiant/StatEtudiant";
import StatPersonnel from "pages/Statistiques/Personnel/StatPersonnel";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/statistique/stat-enseignant", component: <StatEnseignant /> },
  { path: "/statistique/stat-etudiant", component: <StatEtudiant /> },
  { path: "/statistique/stat-personnel", component: <StatPersonnel /> },
  // Orders
  { path: "/orders-list-view", component: <OrdersListView /> },
  { path: "/orders-overview", component: <OrdersOverview /> },

  // Sellers
  { path: "/sellers-list-view", component: <SellersListView /> },
  { path: "/seller-grid-view", component: <SellersGridView /> },
  { path: "/seller-overview", component: <SellersOverview /> },

  // Invoice
  { path: "/invoices-list", component: <InvoiceList /> },
  { path: "/invoices-details", component: <InvoiceDetails /> },
  { path: "/invoices-create", component: <CreateInvoice /> },

  // User List
  { path: "/users-list", component: <UsersList /> },

  // Shipping
  { path: "/shipping-list", component: <ShippingList /> },
  { path: "/shipments", component: <Shipments /> },

  // Coupons
  { path: "/coupons", component: <Coupons /> },

  { path: "/calendar", component: <Calendar /> },

  //Review & Rating
  { path: "/reviews-ratings", component: <ReviewRating /> },

  //Review & Rating
  { path: "/brands", component: <Brands /> },

  //statistics
  { path: "/statistics", component: <Statistics /> },

  // Localization
  { path: "/transactions", component: <Transactions /> },
  { path: "/currency-rates", component: <CurrencyRates /> },

  // Accounts
  { path: "/account", component: <MyAccount /> },
  { path: "/settings", component: <Settings /> },

  // this route should be at the end of all other routes
  //eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
  // { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication

  // AuthenticationInner
  { path: "/auth-signup-basic", component: <SignUp /> },
  { path: "/auth-signin-basic", component: <SignIn /> },
  { path: "/auth-pass-reset-basic", component: <PasswordReset /> },
  { path: "/auth-pass-change-basic", component: <PasswordCreate /> },
  { path: "/auth-success-msg-basic", component: <SuccessMessage /> },
  { path: "/auth-twostep-basic", component: <TwoStepVerify /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-404", component: <Error404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/coming-soon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
