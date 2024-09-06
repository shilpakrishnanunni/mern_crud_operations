import ErrandForm from "./ErrandForm";
import ErrandTable from "./ErrandTable";
import "../style.css";

const HeaderComponent = () => {
    return (
        <div className="header-container">
            <h3>TO-DO LIST</h3>
        </div>
    )
}

const Errand = (props) => {
    return (
        <div className="main">
            <div className="errand-container">
                <ErrandForm />
                <ErrandTable />
            </div>
        </div>
    );
};

export default Errand;
