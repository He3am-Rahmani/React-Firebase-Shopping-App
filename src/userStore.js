import { createState } from "@hookstate/core";

const userStore = createState({
  displayName: "",
  photoURL: "",
  phoneNumber: "",
  email: "",
});

export default userStore;
