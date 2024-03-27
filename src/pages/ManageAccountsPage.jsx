import "./ManageAccountsPage.scss";
import HomePageNavBar from "../components/HomePage/HomePageNavBar.jsx";
import Profile from "../components/ManageAccountsPage/Profile.jsx";

const ManageAccountsPage = () => {
  const handleAddAccount = () => {
    console.log("clicked");
  };
  return (
    <div className="manageAccountsPage">
      <HomePageNavBar />
      <div className="manageAccountsPageContentWrapper">
        <h1 className="manageAccountsHeading">Who's Watching?</h1>
        <div className="profiles">
          <Profile profileName={"Nemissdjhgvhsdvhjhsbjhsh"} />
          <Profile profileName={"Smit"} />
          <Profile profileName={"Prince"} />
          <Profile
            profileName={"Add"}
            isAddAccountDiv={true}
            onClick={handleAddAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageAccountsPage;
