import {
  Admin,
  Resource,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { PostList } from "./posts";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="posts"
      list={PostList}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="customers"
      list={PostList}
      />
  </Admin>
);
