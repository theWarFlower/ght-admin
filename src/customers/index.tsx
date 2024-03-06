import { ContactPage, ContactMail, ContactPhone, Contacts } from "@mui/icons-material";
import { ListCustomer } from "./CustomerList";
import { ShowCustomer } from "./CustomerShow";
import { EditCustomer } from "./CustomerEdit";
import { CreateCustomer } from "./CustomerCreate";

export default {
  list: ListCustomer,
  show: ShowCustomer,
  edit: EditCustomer,
  create: CreateCustomer,
  icon: Contacts,
};
