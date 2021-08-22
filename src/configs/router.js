import AdminArticleDetail from "../components/admin/admin-detail-article";
import AdminManagementAccount from "../pages/admin/account-management";
import AdminDetailAccountManagement from "../pages/admin/account-management/account-detail";
import AdminHome from "../pages/admin/home";
import AdminManagementArticle from "../pages/admin/other-management/article-management";
import AdminManagementGenneral from "../pages/admin/other-management/genneral-management";
import AdminManagementRound from "../pages/admin/other-management/round-management";
import Login from "../pages/general/login";
import Register from "../pages/general/register";
import AccountManagement from "../pages/main/account-management";
import DealManagement from "../pages/main/deal-management";
import DetailArticlesManagement from "../pages/main/detail-article-management";
import FundingRound from "../pages/main/funding-round";
import FundraisingManagement from "../pages/main/fundraising-management";
import UserHome from "../pages/main/home";
import InvestorManagement from "../pages/main/investor-management";
import OrganizationManagement from "../pages/main/organization-management";
import RoundDetailManagement from "../pages/main/round-detail-management";
import TimeManagement from "../pages/main/time-management";

export const mainRouter = [
  {
    path: "/",
    exact: true,
    Component: UserHome,
  },
  {
    path: "/quan-ly-tai-khoan",
    exact: false,
    Component: AccountManagement,
  },
  {
    path: "/quan-ly-thoi-gian",
    exact: false,
    Component: TimeManagement,
  },
  {
    path: "/quan-ly-deal",
    exact: false,
    Component: DealManagement,
  },
  {
    path: "/quan-ly-vong-goi-von",
    exact: false,
    Component: FundraisingManagement,
  },
  {
    path: "/vong-goi-von",
    exact: false,
    Component: FundingRound,
  },
  {
    path: "/to-chuc",
    exact: true,
    Component: OrganizationManagement,
  },
  {
    path: "/nha-dau-tu",
    exact: true,
    Component: InvestorManagement,
  },
  {
    path: "/thong-tin-chi-tiet-vong-goi-von",
    exact: false,
    Component: RoundDetailManagement,
  },
  {
    path: "/nha-dau-tu/chi-tiet",
    exact: true,
    Component: AccountManagement,
  },
  {
    path: "/to-chuc/chi-tiet",
    exact: true,
    Component: AccountManagement,
  },
  {
    path: "/tin-tuc/chi-tiet/:id",
    exact: true,
    Component: DetailArticlesManagement,
  },
];

export const adminRouter = [
  {
    path: "/admin",
    exact: true,
    Component: AdminHome,
  },
  {
    path: "/admin/quan-ly-tai-khoan",
    exact: true,
    Component: AdminManagementAccount,
  },
  {
    path: "/admin/quan-ly-tai-khoan/chi-tiet",
    exact: true,
    Component: AdminDetailAccountManagement,
  },
  {
    path: "/admin/quan-ly-vong-goi-von",
    exact: true,
    Component: AdminManagementRound,
  },
  {
    path: "/admin/quan-ly-tin-tuc",
    exact: true,
    Component: AdminManagementArticle,
  },
  {
    path: "/admin/quan-ly-tin-tuc/chi-tiet/:id",
    exact: true,
    Component: AdminArticleDetail,
  },
  {
    path: "/admin/quan-ly-chung",
    exact: true,
    Component: AdminManagementGenneral,
  },
];

export const generalRouter = [
  {
    path: "/dang-nhap",
    exact: false,
    Component: Login,
  },
  {
    path: "/dang-ky",
    exact: false,
    Component: Register,
  },
];
