import Mock_data from "../../MOCK_DATA.json";
import Table from "../../UI/table/Table";
import classes from "./UserContent.module.css";

const m_columns = [
  {
    Header: "Id",
    accessor: "User Id",
  },
  {
    Header: "Last Name",
    accessor: "Last Name",
  },
  {
    Header: "First Name",
    accessor: "First Name",
  },
  {
    Header: "Username",
    accessor: "Username",
  },
];

const UserContent = () => {
  return (
    <div className={classes.tableContainer}>
      <header className={classes.tableHeader}>
        <h1>User</h1>
        <input className={classes.search} type="text" placeholder="Search..." />
      </header>
      <Table columns={m_columns} data={Mock_data} />
    </div>
  );
};

export default UserContent;
