import { combineReducers } from "redux";
import currentStepDataReducer from "./currentStepDataReducer";
import { sendRevieweReducer } from "./sendRevieweReducer";
import { UserReducer } from "./registerReducer";
import { manageUserReducer } from "./manageUserReducer";
import { userClientReducer } from "./userClientReducer";
import { facilitiesReducer } from "./facilitiesReducer";
import { memberReducer } from "./AdminReducer/memberReducer";
import { moduleReducer } from "./moduleReducer";
import { ProductCategoryReducer } from "./ProductCategoryreducer";
import { ExpenceReducer } from "./AdminReducer/ExpenceReducer";
import { SendInvoiceReducer } from "./SendInvoiceReducer";
import { OneExpenceReducer } from "./OneExpenceReducer";
import { imageReducer } from "./ImageReducer";
import { preAuditReducer } from "./PreAuditReducer";
import { AuditorSceduleReducer } from "./AdminReducer/AuditorSceduleReducer";
import { countryReducer } from "./countryReducer";
import { memberRoleReducer } from "./AdminReducer/memberRoleReducer";
import { queryReducer } from "./queryReducer";
import { dashboardReducer } from "./dashboardReducer";

export const rootReducer = combineReducers({
  currentStepDataReducer,
  countryReducer,
  memberRoleReducer,
  UserReducer,
  OneExpenceReducer,
  dashboardReducer,
  queryReducer,
  ExpenceReducer,
  manageUserReducer,
  imageReducer,
  userClientReducer,
  facilitiesReducer,
  memberReducer,
  moduleReducer,
  ProductCategoryReducer,
  preAuditReducer,
  AuditorSceduleReducer,
  sendRevieweReducer,
  SendInvoiceReducer,
});
