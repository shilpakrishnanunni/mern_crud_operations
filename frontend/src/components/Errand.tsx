import ErrandForm from "./ErrandForm";
import ErrandTable from "./ErrandTable";
import "../style.css";
import hooks from "../hooks.tsx";

const HeaderComponent = () => {
    return (
        <div className="header-container">
            <h3>TO-DO LIST</h3>
        </div>
    )
}

const Errand = (props) => {
    const { data, isLoading, isError } = hooks.useErrandTableData();
    console.log("data",data);
    const errands = data?.errands;

    return (
        <div className="main">
            <HeaderComponent/>
            <div className="errand-container">
                <ErrandForm />
                <ErrandTable errands={errands}/>
            </div>
        </div>
    );
};

export default Errand;
