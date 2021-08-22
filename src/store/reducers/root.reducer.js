import { combineReducers } from "redux";
import dealReducer from "./deal.reducer";
import freeTimeReducer from "./freeTime.reducer";
import registerReducre from "./register.reducer";
import roundReducer from "./round.reducer";
import userReducer from "./user.reducer";
import loadingReducer from "./loading.reducer";
import organizationReducer from "./organization.reducer";
import investorReducer from "./investor.reducer";
import detailCompanyReducer from "./company.reducer";
import milestoneReducer from "./milestone.reducer";
import mediaReducer from "./media.reducer";
import introduceReducer from "./introduce.reducer";
import articleReducer from "./article.reducer";
import teamMemberReducer from "./team.reducer";
import valueReducer from "./value.reducer";
import interestRuducer from "./interest.reducer";
const rootReducer = combineReducers({
  user: userReducer,
  freeTime: freeTimeReducer,
  register: registerReducre,
  round: roundReducer,
  deal: dealReducer,
  loading: loadingReducer,
  organization: organizationReducer,
  investor: investorReducer,
  detailCompany: detailCompanyReducer,
  milestone: milestoneReducer,
  media: mediaReducer,
  introduce: introduceReducer,
  article: articleReducer,
  teamMember: teamMemberReducer,
  value: valueReducer,
  interest: interestRuducer,
});

export default rootReducer;
