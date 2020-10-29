import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BudgetApp from './BudgetApp'
import CustomApolloProvider from "./providers/customApolloProvider";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <CustomApolloProvider>
      <BudgetApp></BudgetApp>
      </CustomApolloProvider>
    )
  );
};

export default Profile;