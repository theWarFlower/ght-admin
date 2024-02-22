import {
  Admin,
  Resource,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { ListPosts } from "./components/listPosts";
import { ShowPosts } from "./components/showPosts";
export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="posts"
      list={ListPosts}
      edit={EditGuesser}
      show={ShowPosts}
    />
    <Resource
      name="customers"
      list={ListPosts}
      />
  </Admin>
);
